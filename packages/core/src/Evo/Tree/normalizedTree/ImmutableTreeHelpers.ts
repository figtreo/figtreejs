

/**
 * These function help access tree data while
 * handling missing data.
 * 
 * They cannot be private functions on the method because 
 * those can't be called by immer proxies.
 */

import { Maybe, MaybeType, Nothing, Some } from "@figtree/maybe/maybe"
import { Annotation, NodeRef } from "../Tree.types"
import { ImmutableTree, ImmutableTreeData, nodeIndex,Node } from "./ImmutableTree"
import { Taxon, TaxonSet } from "../Taxa"

  /**
   * 
   * A private getting for retrieving a NodeRef from a number
   */
export  function maybeGetNodeFromNumber(tree:ImmutableTree,i:number):Maybe<NodeRef>{
    const n =tree._data.nodes.allNodes[i]
    if(n===undefined){
      return Nothing()
    }else{
      return Some(n)
    }
  }

export function maybeGetNode(tree:ImmutableTree,i:nodeIndex):Maybe<NodeRef>{
        if (typeof i === "number") {
            return  maybeGetNodeFromNumber(tree, i as number)
        } else if (i instanceof Object) {
            return maybeGetNodeByTaxon(tree,i as Taxon)
        } else if (typeof i === "string") {
            const taxon = maybeGetTaxonByName(tree,i as string)
            if (taxon.type===MaybeType.Some) {
            return maybeGetNodeByTaxon(tree,taxon.value)
            } else {
            return maybeGetNodeByLabel(tree,i as string)
            }
    }
    return Nothing();
}

export function maybeGetNodeByTaxon(tree:ImmutableTree, taxon:Taxon):Maybe<NodeRef>{
    const n = tree._data.nodes.byTaxon[taxon.number]
    if(n===undefined){
      return Nothing()
    }else{
       return maybeGetNode(tree,n)
    }
  }

export function maybeGetTaxonByName(tree:ImmutableTree, name:string):Maybe<Taxon>{
      const t =  tree.taxonSet.getTaxonByName(name)
      if(t===undefined){
        return Nothing()
      }else{
        return Some(t)
      }
  }

export function maybeGetNodeByLabel(tree:ImmutableTree,label: string):Maybe<NodeRef>  {
   const index = tree._data.nodes.byLabel[label];
   if(index===undefined){
    return Nothing();
   }
    return maybeGetNodeFromNumber(tree,index);
  }

export function maybeGetAnnotation(tree:ImmutableTree,node:NodeRef,name:string):Maybe<Annotation>{
        const a = (tree.getNode(node.number) as Node).annotations[name]
        if(a===undefined){
        return Nothing()
        }else{
        return Some(a)
        }
    }

export function maybeGetTaxonFromNode(tree:ImmutableTree,node:NodeRef):Maybe<Taxon>{
      const taxaIndex = tree._data.nodeToTaxon[node.number]
      if (taxaIndex===undefined){
        return Nothing()
      }
     const taxon =  tree.taxonSet.getTaxon(taxaIndex)
     if(taxon===undefined){
      return Nothing()
     }
     return Some(taxon)

  }

export function maybeGetTaxon(tree:ImmutableTree,id:number|NodeRef|string):Maybe<Taxon>{
    if (typeof id === "number") {
          const i = tree.taxonSet.getTaxon(id)
          if(i){
            return Some(i)
          }
          return Nothing()
        } else if(typeof id === "string") {
          return maybeGetTaxonByName(tree,id)
        }else {
          return maybeGetTaxonFromNode(tree,id)
        }
  }

export function maybeGetParent(tree:ImmutableTree,node:NodeRef):Maybe<NodeRef>{
    const parentId = tree._data.nodes.allNodes[node.number].parent
    return parentId===undefined?Nothing():maybeGetNode(tree,parentId)
  }