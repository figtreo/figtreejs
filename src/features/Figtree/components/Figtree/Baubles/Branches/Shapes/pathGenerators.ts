import { Vertex } from "../../../layoutFunctions"

interface Edge{
    source:Vertex,
    target:Vertex
}

export interface BranchPathGenerator{
    (e:Edge,curvature?:number):string
}
//TODO remove need for curvature
export function PolarBranchPath(e:Edge,curvature:number=0){
    const {source,target} = e;
    return `M${source.x},${source.y}A${source.r},${source.r} 0 0 ${source.r!>target.r! ?1:0} ${target.x},${target.y} L${target.x},${target.y}`;
}

export  function RectangularBranchPath(e:Edge,curvature:number=0){
    const {source,target} = e;

    if (curvature === 0) { // no curve
        var x1 = source.x + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
        return `M${x1},${source.y}L${x1},${target.y}L${target.x},${target.y+0.001}`;
      } else if (curvature < 1) {
        // curve
        return `M${source.x},${source.y}C${source.x}${target.y}, ${source.x+ Math.abs(curvature * (source.x - target.x))},${target.y} ${target.x},${target.y}`;
      } else  { //(curvature == 1)
        return `M${source.x},${source.y}L${target.x},${target.y}`;

      }
    }

