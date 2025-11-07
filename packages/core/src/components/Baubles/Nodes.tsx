import { useAttributeMappers } from './helpers';
import type { LiftToUser } from "./types";


import type { Attrs, UserAttrs } from './types';
import type { NodeRef} from '../../Evo';
import { preOrderIterator } from '../../Evo';
import type { BaubleTypes } from '../FigTree/Figtree.types';
import { BaseCircle, CenteredRectangle } from './Shapes';
import type { NodedProps} from '../HOC';
import { withAnimation, withNode } from '../HOC';



/**
 * User options for designating and styling node shapes in a figure
 */

export type NodeOptionsType<A extends UserAttrs> = {
        filter?:(n:NodeRef)=>boolean,
        keyBy?:(n:NodeRef)=>number|string,
        attrs:A,
        interactions?:Record<string,(n:NodeRef)=>void>
        animated?:boolean
}

// props accepted by this Bauble.
type NodeLabelPropTypes = Omit< BaubleTypes, "dimensions"|"animated"> & {animated?:boolean} // don't need dimensions here and animation is optional

/**
 * A factory generator that returns a component factory to the user.
 * The factory accepts the options above and returns a Bauble to be rendered by the figure.
 */
function makeNodes<
    A extends Attrs
    >(ShapeComponent:React.FC<NodedProps<A>>)
    :(initial: NodeOptionsType<LiftToUser<A>>) => React.FC<NodeLabelPropTypes>  {
    
        return (initial)=>{

        // const Nodes: React.FC<RemainingProps<AResolved>> = ({ tree, scale, layout }) => {
        const Nodes: React.FC<NodeLabelPropTypes> = ({ tree, scale, layout, animated=false }) => {
                const {
                    filter = () => true,
                    keyBy = (n: NodeRef) => n.number, // or whatever your NodeRef key is
                    attrs,
                    interactions,
                } = initial;

                const applyAttrInteractions = useAttributeMappers<A>(attrs,interactions);
                // pass x and y position here so can be animated with react-spring in useAnimation hook
                return (
                    <g className={"node-layer"}>
                        {[...preOrderIterator(tree)]
                        .filter(n=>filter(n))
                        .map((node) => (
                         <ShapeComponent 
                            key={keyBy(node)} 
                            node={node}  
                            applyAttrInteractions={applyAttrInteractions} 
                            scale={scale} 
                            layout={layout} 
                            animated={animated}
                            /> 
                        ))}
                    </g>
                )
            }
        return Nodes;
    }
}
/**
 * Add a Circle node Bauble to the figure.
*/

export const CircleNodes = makeNodes(withNode(withAnimation(BaseCircle)));

/**
 * Add a Rectangular node Bauble to the figure.
*/
export const RectangleNodes = makeNodes(withNode(withAnimation(CenteredRectangle)));
