import {  max, mean } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, defaultInternalLayoutOptions, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { NodeRef, Tree } from "../Evo/Tree";
import { ImmutableTree, postOrderIterator } from "../Evo/Tree/NormalizedTree/ImmutableTree";

/*
export class RectangularLayout extends AbstractLayout {

    static getArbitraryLayout(tree: Tree, opts?: internalLayoutOptions): ArbitraryVertices {
        const safeOpts = { ...defaultInternalLayoutOptions, ...opts };
        const { rootLength, tipSpace } = safeOpts;
        if(safeOpts.pollard>1 || safeOpts.pollard<0) throw new Error("Pollard must be between 0 and 1");
        const cartoonedNodes     = safeOpts.cartoonedNodes;
        let currentY = 0;
        const vertices: ArbitraryVertices = { vertices:[], extent: { x: [0, 0], y: [0, 0] } };
        let maxY = 0;
        let maxX = 0;
        const adjustedRootLength = rootLength * max(tree.getExternalNodes().map((tip: NodeRef) => tree.getDivergence(tip)!))!

        let lastTip: null | NodeRef = null;
        //visits children first so we can get the y position of the parents. 
        // when visiting the parent we also update the path of the children. 
        // paths are stored on the parent


        for (const node of postOrderIterator(tree)) {

            maxY = currentY;

            const leftLabel = tree.getChildCount(node) > 0;
            const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === undefined || tree.getChild(tree.getParent(node)!, 0) !== node));

            //internal node
            if (tree.getChildCount(node) > 0) {
                const children: ArbitraryVertex[] = tree.getChildren(node).map((child: NodeRef) => vertices.vertices[child.number]);
                const x = tree.getDivergence(node)! + adjustedRootLength;
                const y = children.reduce((acc, child) => acc + child.y, 0) / children.length;

                vertices.vertices[node.number] = {
                    hidden:false,
                    labelHidden:false,
                    x,
                    y,
                    level: tree.getLevel(node), //max(children, (child: ArbitraryVertex) => child.level)! + 1,
                    number: node.number,
                    pathPoints: [{ x, y }],
                    nodeLabel:
                    {
                        dx: leftLabel ? -6 : 12,
                        dy: leftLabel ? (labelBelow ? -8 : 8) : 0,
                        alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                        textAnchor: leftLabel ? "end" : "start"
                    }
                }

                if (cartoonedNodes.has(node) && cartoonedNodes.get(node).cartooned) {
                    let i = 0;
                    // need max x for labels
                    let maxX = x;
                    let maxY = -Infinity;
                    let minY = Infinity;
                    for (const descendent of postOrderIterator(tree,node)) {
                        if (node === descendent) continue;

                        if (tree.isExternal(descendent)) {
                            const descendentVertex = vertices.vertices[descendent.number];
                            if (descendentVertex.x > maxX) maxX = descendentVertex.x;
                            const y = descendentVertex.y - i * cartoonedNodes.get(node).collapseFactor;
                            descendentVertex.y = y; // update for labeling etc
                            if (y > maxY) maxY = y;
                            if (y < minY) minY = y;
                            i++;
                        }
                        vertices.vertices[descendent.number].hidden=true;
                        vertices.vertices[descendent.number].labelHidden= cartoonedNodes.get(node).collapseFactor===0;
                    }

                    const newy = (maxY + minY) / 2;
                    vertices.vertices[node.number].y = newy;;

                    vertices.vertices[node.number].pathPoints = [{ x: maxX, y: minY }, { x: maxX, y: maxY }, { x, y: newy }]

                    currentY = maxY + 1

                }
                else {
                    for (const child of children) {
                        vertices.vertices[child.number].pathPoints.push({ x, y })
                    }
                }
                //update children paths

            } else {
                //tip
                const x = tree.getDivergence(node)! + adjustedRootLength
                const y = currentY;
                vertices.vertices[node.number] = {
                    hidden:false,
                    labelHidden:false,
                    x,
                    y,
                    number: node.number,
                    level: 0,
                    pathPoints: [{ x, y }],
                    nodeLabel: {
                        dx: leftLabel ? -6 : 12,
                        dy: leftLabel ? (labelBelow ? -8 : 8) : 0,
                        alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                        textAnchor: leftLabel ? "end" : "start"
                    }
                }

                if (lastTip !== null) {
                    currentY += tipSpace(lastTip, node);
                } else {
                    currentY++;
                }
                lastTip = node;

                if (x > maxX) maxX = x; //assumes tips more divergent than internal nodes
            }
        }

        vertices.extent = { x: [maxX*safeOpts.pollard, maxX], y: [0, currentY-1] }

        if (tree.getRoot() !== undefined) {
            const rootVertex = vertices.vertices[tree.getRoot()!.number];
            vertices.vertices[tree.getRoot()!.number].pathPoints.push({ x: 0, y: rootVertex.y })
        }
        return vertices;
    }


    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: { tipCount: number }, opts: internalLayoutOptions): Vertices {
        const safeOpts = { ...defaultInternalLayoutOptions, ...opts };
        const padding = safeOpts.padding;
        const xRange = safeOpts.invert ? [padding, safeOpts.width - padding].reverse() : [padding, safeOpts.width - padding];
        const x = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range(xRange);

        const y_og = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([padding, safeOpts.height - padding]);

        const pointOfInterestY = y_og.invert(safeOpts.pointOfInterest.y)

        const transform = fishEyeTransform(safeOpts.fishEye, pointOfInterestY); //1000 to match figtree

        const y = scaleLinear()
            .domain(arbitraryLayout.extent.y.map(transform))
            .range([padding, safeOpts.height - padding]);

        const scaledVertices: Vertices = {
            vertices:[],
            type:"Rectangular"
        };
        for (const vertex of arbitraryLayout.vertices) {

            const xpos = x(vertex.x);
            const ypos = y(transform(vertex.y));

            if (vertex.pathPoints.length == 1) {
                console.log(vertex)
            }


            scaledVertices.vertices[vertex.number] = {
                number: vertex.number,
                x: xpos,
                y: ypos,
                level: vertex.level,
                hidden:vertex.hidden,
                labelHidden:vertex.labelHidden,
                nodeLabel: {
                    x: xpos + vertex.nodeLabel.dx,
                    y: ypos + vertex.nodeLabel.dy,
                    alignmentBaseline: vertex.nodeLabel.alignmentBaseline,
                    textAnchor: vertex.nodeLabel.textAnchor,
                    rotation: 0,
                    alignedPos: { x: x.range()[1] + 24, y: ypos + vertex.nodeLabel.dy }
                },
                branch: vertex.pathPoints.length > 1 ? {
                    d: this.pathGenerator(vertex.pathPoints.map(d => ({ x: x(d.x), y: y(transform(d.y)) })), safeOpts),
                    label: {
                        x: mean([xpos, x(vertex.pathPoints[vertex.pathPoints.length-1].x)])!, //parent is at the end of the array
                        y: ypos - 6,
                        alignmentBaseline: "bottom",
                        textAnchor: "middle",
                        rotation: 0
                    }
                } : undefined
            };
        }
        scaledVertices.axisLength = x.range()[1] - x.range()[0];
        return scaledVertices;
    }


    static pathGenerator(points: { x: number, y: number }[], { curvature = 0, }): string {
        const positions = points.length;

        switch (positions) {
            case 0: {
                return '';
            }
            case 2: {
                const [target, source] = points; //parent is source and gets pushed to end of array
                if (curvature === 0) { // no curve
                    var x1 = source.x + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
                    return `M${x1},${source.y}L${source.x},${target.y}L${target.x},${target.y + 0.001}`;
                } else if (curvature < 1) {
                    // curve
                    return `M${source.x},${source.y}C${source.x},${target.y}, ${source.x + Math.abs(curvature * (source.x - target.x))},${target.y} ${target.x},${target.y}`;


                } else { //(curvature == 1)
                    return `M${source.x},${source.y}L${(source.x + target.x) / 2},${(source.y + target.y) / 2}L${target.x},${target.y}`;

                }
            } case 4: {
                const baseLine = this.pathGenerator(points.slice(2), { curvature })//[top,bottom,target,source]
                const triangleBit = `M${points[2].x},${points[2].y}L${points[0].x},${points[0].y}L${points[1].x},${points[1].y}Z`
                return `${baseLine}${triangleBit}`
            } default: {
                throw new Error(`path generator not implemented for this ${positions} of points`)
            }
        }
    }
    // cartoonGenerator(tree: NormalizedTree, vertices: Vertices): string {
    //     throw new Error("Method not implemented.")
    // }

}
*/
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
export const fishEyeTransform = (fishEye: number, pointOfInterestY: number) => (y: number) => { // point of interest is in layout scale.

    if (fishEye === 0.0) {
        return y;
    }

    const scale = 1.0 / (fishEye ); 
    const dist = pointOfInterestY - y;
    const min = 1.0 - (pointOfInterestY / (scale + pointOfInterestY));
    const max = 1.0 - ((pointOfInterestY - 1.0) / (scale - (pointOfInterestY - 1.0)));

    const c = 1.0 - (dist < 0 ? (dist / (scale - dist)) : (dist / (scale + dist)));

    return (c - min) / (max - min);
}