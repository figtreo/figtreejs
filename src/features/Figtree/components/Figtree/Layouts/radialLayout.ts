/* borrows heavily from Andrew Rambaut's radial layout in Figtree
 *
 * RadialTreeLayout.java
 *
 * Copyright (C) 2006-2014 Andrew Rambaut
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */


import { max, mean } from "d3-array";
import { scaleLinear } from "d3-scale";
import { AbstractLayout, ArbitraryVertex, ArbitraryVertices, internalLayoutOptions, Vertices } from "./LayoutInterface";
import { NormalizedTree, NodeRef } from "../../../../Tree/normalizedTree";
import { degrees } from "./polarLayout";

type data = {
    angleStart: number,
    angleEnd: number,
    xpos: number,
    ypos: number,
    level: number,
    id: string
}

export class RadialLayout extends AbstractLayout {


    static getArbitraryLayout(tree: NormalizedTree, { rootLength = 0, tipSpace = (tip1: NodeRef, tip2: NodeRef) => 1, spread = 0 }): ArbitraryVertices {
        const vertices: ArbitraryVertices = { byId: {}, allIds: [], extent: { x: [0, 0], y: [0, 0] } };
        let maxY = Number.NEGATIVE_INFINITY
        let maxX = Number.NEGATIVE_INFINITY;

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;


        //visits parents first and passes data to children through a stack to avoid recursion (but mostly for fun)
        const dataStack: data[] = [{ angleStart: 0, angleEnd: 2 * Math.PI, xpos: 0, ypos: 0, level: 0, id: tree.root!.id }]
        for (const node of tree.getPreorderNodes()) {

            const { angleStart, angleEnd, xpos, ypos, level, id } = dataStack.pop()!

            if (id !== node.id) {
                throw new Error("something went wrong with the stack") //todo remove this and the id in the stack. 
            }
            const branchAngle = (angleStart + angleEnd) / 2.0;

            const length = tree.getLength(node) ? tree.getLength(node) : 0;

            const directionX = Math.cos(branchAngle);
            const directionY = Math.sin(branchAngle);
            const x = xpos + (length * directionX);
            const y = ypos + (length * directionY);


            const theta = Math.tan((x - xpos) / (y - ypos))

            const leftLabel = tree.getChildCount(node) > 0;
            const labelBelow = (tree.getChildCount(node) > 0 && (tree.getParent(node) === null || tree.getChild(tree.getParent(node)!, 0) !== node));

            

            vertices.byId[node.id] = {
                x,
                y,
                id: node.id, level,
                theta: theta,
                pathPoints: [{ x: xpos, y: ypos },{ x, y }],
                nodeLabel:{
                    dx: leftLabel ? -6 : 12,
                    dy: leftLabel ? (labelBelow ? -8 : 8) : 0,
                    alignmentBaseline: leftLabel ? (labelBelow ? "bottom" : "hanging") : "middle",
                    textAnchor: leftLabel ? "end" : "start",
                    rotation:branchAngle
                }
            }; // i think xpos and ypos come from parent.
            vertices.allIds.push(node.id);

            // The rest of the work is to set the data that is passed to the children


            //internal node
            if (tree.getChildCount(node) > 0) {
                const childLeafs: number[] = [];
                let totalLeafs = 0;
                for (let i = 0; i < tree.getChildCount(node); i++) {
                    const leafCount = [...tree.getTips(tree.getChild(node, i))].length;
                    childLeafs[i] = leafCount;
                    totalLeafs += leafCount;
                }

                let span = angleEnd - angleStart;
                let updatedAngleStart = angleStart;
                let updatedAngleEnd = angleEnd;
                if (tree.root !== node) {
                    span *= 1.0 + ((spread * Math.PI / 180) / 10.0);
                    updatedAngleStart = branchAngle - (span / 2.0);
                    updatedAngleEnd = branchAngle + (span / 2.0);
                }

                let a2 = updatedAngleStart;

                for (let i = tree.getChildCount(node) - 1; i > -1; i--) { // i think we need to go in reverse order here 
                    let a1 = a2;
                    a2 = a1 + (span * childLeafs[i] / totalLeafs);
                    dataStack.push({ angleStart: a1, angleEnd: a2, xpos: x, ypos: y, level: level + 1, id: tree.getChild(node, i).id })
                }
            } else {
                //tip
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);

                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                //assumes tips more divergent than internal nodes
            }
        }

        vertices.extent = { x: [minX, maxX], y: [minY, maxY] }
        return vertices;
    }

    static finalizeArbitraryLayout(arbitraryLayout: ArbitraryVertices, treeStats: { tipCount: number }, opts: internalLayoutOptions): Vertices {
        const x = scaleLinear()
            .domain(arbitraryLayout.extent.x)
            .range([this.padding, opts.width - this.padding]);

        const y = scaleLinear()
            .domain(arbitraryLayout.extent.y)
            .range([opts.height - this.padding, this.padding]); //flipped to match figtree

        const scaledVertices: Vertices = {
            byId: {},
            allIds: []
        };
        for (const id of arbitraryLayout.allIds) {
            const vertex = arbitraryLayout.byId[id];
            const xpos = x(vertex.x);
            const ypos = y(vertex.y);
            scaledVertices.byId[vertex.id] = {
                id: vertex.id,
                x: x(vertex.x),
                y: y(vertex.y),
                level: vertex.level,
                theta: vertex.theta,
                nodeLabel: {
                    x: xpos+vertex.nodeLabel.dx,
                    y: ypos+vertex.nodeLabel.dy,
                    alignmentBaseline: vertex.nodeLabel.alignmentBaseline,
                    textAnchor: vertex.nodeLabel.rotation!>Math.PI/2 && vertex.nodeLabel.rotation!<3*Math.PI/2?"end":"start",
                    rotation:degrees(vertex.nodeLabel.rotation!),
                },
                branch:{
                d: this.pathGenerator(vertex.pathPoints.map(d => ({ x: x(d.x), y: y(d.y) })), opts), // scale the points
                    label:{
                        x:mean([xpos,x(vertex.pathPoints[1].x)])!, //parent is at the end of the array
                        y:mean([ypos,y(vertex.pathPoints[1].y)])!,
                        alignmentBaseline:vertex.nodeLabel.alignmentBaseline,
                        textAnchor:vertex.nodeLabel.textAnchor,
                        rotation:degrees(vertex.nodeLabel.rotation!),
                    }
            }
            };
            scaledVertices.allIds.push(vertex.id);
        }
        return scaledVertices;
    }


    static pathGenerator(points: { x: number, y: number }[], opts: internalLayoutOptions): string {
        const positions = points.length;

        switch (positions) {
            case 2: {
                const [source, target] = points; //parent is source and gets pushed to end of array
                return `M${source.x},${source.y}L${target.x},${target.y}`;
            }
            case 3: {
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