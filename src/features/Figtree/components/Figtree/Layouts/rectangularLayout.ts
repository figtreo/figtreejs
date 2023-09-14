import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, layoutOptions,Vertices} from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";


export class RectangularLayout extends AbstractLayout {

    static getArbitraryLayout(tree: NormalizedTree, {rootLength = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1}): ArbitraryVertices {
        let currentY = 0;
        const vertices: ArbitraryVertices = { byId: {}, allIds: [], extent: { x: [0, 0], y: [0, 0] } };
        let maxY = 0;
        let maxX = 0;

        const adjustedRootLength = rootLength * max([...tree.getTips()].map((tip: NodeRef) => tree.getNodeDivergence(tip)!))!

        let lastTip: null | NodeRef = null;
        //visits children first so we can get the y position of the parents. 
        // when visiting the parent we also update the path of the children. 
        // paths are stored on the parent
        // todo neet to think about cartoons in this context
        for (const node of tree.getPostorderNodes()) {

            maxY = currentY;

            //internal node
            if (tree.getChildCount(node) > 0) {
                const children: ArbitraryVertex[] = tree.getChildren(node).map((child: NodeRef) => vertices.byId[child.id]);
                const x = tree.getNodeDivergence(node)! + adjustedRootLength;
                const y = children.reduce((acc, child) => acc + child.y, 0) / children.length;
                vertices.byId[node.id] = {
                    x,
                    y,
                    level: max(children, (child: ArbitraryVertex) => child.level)! + 1,
                    id: node.id,
                    pathPoints: [{ x, y }]
                }
                //update children paths
                for (const child of children) {
                    vertices.byId[child.id].pathPoints.push({ x, y })
                }
                vertices.allIds.push(node.id);
            } else {
                //tip
                const x = tree.getNodeDivergence(node)! + adjustedRootLength
                const y = currentY;
                vertices.byId[node.id] = {
                    x,
                    y,
                    id: node.id,
                    level: 0,
                    pathPoints: [{ x, y }]
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

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, opts: layoutOptions):Vertices {
        const x = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([this.padding, opts.width - this.padding]);

        const y = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([this.padding, opts.height - this.padding]);

        const scaledVertices: Vertices = {
            byId: {},
            allIds: []
        };
        for (const id of arbitraryLayout.allIds) {
            const vertex = arbitraryLayout.byId[id];
            scaledVertices.byId[vertex.id] = {
                id: vertex.id,
                x: x(vertex.x),
                y: y(vertex.y),
                level: vertex.level,
                d: this.pathGenerator(vertex.pathPoints.map(d=>({x:x(d.x),y:y(d.y)})), opts) // scale the points
            };
            scaledVertices.allIds.push(vertex.id);
        }
        return scaledVertices;
    }


    static pathGenerator(points: { x: number, y: number }[], opts: layoutOptions): string {
        const positions = points.length;

        switch (positions) {
            case 2: {
                const [ target,source] = points; //parent is source and gets pushed to end of array
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