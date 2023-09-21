import { max, mean } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";


export class RectangularLayout extends AbstractLayout {

    static getArbitraryLayout(tree: NormalizedTree, { rootLength = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1 }): ArbitraryVertices {
        let currentY = 0;
        const vertices: ArbitraryVertices = { byId: {}, allIds: [], extent: { x: [0, 0], y: [0, 0] } };
        let maxY = 0;
        let maxX = 0;

        const adjustedRootLength = rootLength * max([...tree.getTips()].map((tip: NodeRef) => tree.getDivergence(tip)!))!

        let lastTip: null | NodeRef = null;
        //visits children first so we can get the y position of the parents. 
        // when visiting the parent we also update the path of the children. 
        // paths are stored on the parent
        // todo neet to think about cartoons in this context
        for (const node of tree.getPostorderNodes()) {

            maxY = currentY;

            const leftLabel = tree.getChildCount(node) > 0;
            const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === null || tree.getChild(tree.getParent(node)!, 0) !== node));

            //internal node
            if (tree.getChildCount(node) > 0) {
                const children: ArbitraryVertex[] = tree.getChildren(node).map((child: NodeRef) => vertices.byId[child.id]);
                const x = tree.getDivergence(node)! + adjustedRootLength;
                const y = children.reduce((acc, child) => acc + child.y, 0) / children.length;



                vertices.byId[node.id] = {
                    x,
                    y,
                    level: max(children, (child: ArbitraryVertex) => child.level)! + 1,
                    id: node.id,
                    pathPoints: [{ x, y }],
                    nodeLabel:
                    {
                        dx: leftLabel ? -6 : 12,
                        dy: leftLabel ? (labelBelow ? -8 : 8) : 0,
                        alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                        textAnchor: leftLabel ? "end" : "start"
                    }
                }
                //update children paths
                for (const child of children) {
                    vertices.byId[child.id].pathPoints.push({ x, y })
                }
                vertices.allIds.push(node.id);
            } else {
                //tip
                const x = tree.getDivergence(node)! + adjustedRootLength
                const y = currentY;
                vertices.byId[node.id] = {
                    x,
                    y,
                    id: node.id,
                    level: 0,
                    pathPoints: [{ x, y }],
                    nodeLabel:{
                        dx: leftLabel ? -6 : 12,
                        dy: leftLabel ? (labelBelow ? -8 : 8) : 0,
                        alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                        textAnchor: leftLabel ? "end" : "start"
                    }
                }
                vertices.allIds.push(node.id);

                if (lastTip !== null) {
                    currentY += tipSpace(lastTip, node);
                } else {
                    currentY++;
                }
                lastTip = node;

                if (x > maxX) maxX = x; //assumes tips more divergent than internal nodes
            }
        }

        vertices.extent = { x: [0, maxX], y: [0, maxY] }

        if (tree.root) {
            const rootVertex = vertices.byId[tree.root.id];
            vertices.byId[tree.root.id].pathPoints.push({ x: 0, y: rootVertex.y })
        }

        return vertices;
    }


    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: { tipCount: number }, opts: internalLayoutOptions): Vertices {
        const x = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([this.padding, opts.width - this.padding]);

        const y_og = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([this.padding, opts.height - this.padding]);

        const pointOfInterestY = y_og.invert(opts.pointOfInterest.y)

        const transform = fishEyeTransform(opts.fishEye, treeStats.tipCount, pointOfInterestY); //1000 to match figtree

        const y = scaleLinear()
            .domain(arbitraryLayout.extent.y.map(transform))
            .range([this.padding, opts.height - this.padding]);

        const scaledVertices: Vertices = {
            byId: {},
            allIds: []
        };

        for (const id of arbitraryLayout.allIds) {
            const vertex = arbitraryLayout.byId[id];

            const xpos = x(vertex.x);
            const ypos = y(transform(vertex.y));

            scaledVertices.byId[vertex.id] = {
                id: vertex.id,
                x: xpos,
                y: ypos,
                level: vertex.level,
                nodeLabel: {
                    x: xpos+vertex.nodeLabel.dx,
                    y: ypos+vertex.nodeLabel.dy,
                    alignmentBaseline: vertex.nodeLabel.alignmentBaseline,
                    textAnchor: vertex.nodeLabel.textAnchor,
                    rotation:0,
                    alignedPos:{x:x.range()[1]+24,y:ypos+vertex.nodeLabel.dy}
                },
                branch: { d: this.pathGenerator(vertex.pathPoints.map(d => ({ x: x(d.x), y: y(transform(d.y)) })), opts),
                        label:{
                            x:mean([xpos,x(vertex.pathPoints[1].x)])!, //parent is at the end of the array
                            y: ypos-6,
                            alignmentBaseline: "bottom",
                            textAnchor:"middle",
                            rotation:0
                        } } 
            };
            scaledVertices.allIds.push(vertex.id);
        }





        return scaledVertices;
    }


    static pathGenerator(points: { x: number, y: number }[], opts: internalLayoutOptions): string {
        const positions = points.length;

        switch (positions) {
            case 2: {
                const [target, source] = points; //parent is source and gets pushed to end of array
                if (opts.curvature === 0) { // no curve
                    var x1 = source.x + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
                    return `M${x1},${source.y}L${source.x},${target.y}L${target.x},${target.y + 0.001}`;
                } else if (opts.curvature < 1) {
                    // curve
                    return `M${source.x},${source.y}C${source.x},${target.y}, ${source.x + Math.abs(opts.curvature * (source.x - target.x))},${target.y} ${target.x},${target.y}`;


                } else { //(curvature == 1)
                    return `M${source.x},${source.y}L${target.x},${target.y}`;

                }
            } case 3: {
                console.log("cartoon implemented")
                throw new Error("path generator not implemented for this number of points")
            } default: {
                throw new Error("path generator not implemented for this number of points")
            }
        }
    }
    // cartoonGenerator(tree: NormalizedTree, vertices: Vertices): string {
    //     throw new Error("Method not implemented.")
    // }

}

// figtree 
// const fishEyeTransform=(fishEye:number,tipCount:number,pointOfInterestY:number)=>(y:number)=>{ // point of interest is in layout scale.

//     const dist = pointOfInterestY - y;
//     const fromEdge = dist>0? y: tipCount-y;
//     const maxD = Math.max(pointOfInterestY,Math.abs(tipCount-pointOfInterestY))

//     const availableBump = Math.min(fromEdge,fishEye);
//     const bump = (availableBump - Math.abs((dist/maxD)))
//     const newY = dist>0? y-bump: y+bump;

//     return newY;


// }
// Figtree cc Andrew Rambaut
export const fishEyeTransform = (fishEye: number, tipCount: number, pointOfInterestY: number) => (y: number) => { // point of interest is in layout scale.

    if (fishEye === 0.0) {
        return y;
    }

    const scale = 1.0 / (fishEye * tipCount);
    const dist = pointOfInterestY - y;
    const min = 1.0 - (pointOfInterestY / (scale + pointOfInterestY));
    const max = 1.0 - ((pointOfInterestY - 1.0) / (scale - (pointOfInterestY - 1.0)));

    const c = 1.0 - (dist < 0 ? (dist / (scale - dist)) : (dist / (scale + dist)));

    return (c - min) / (max - min);
}