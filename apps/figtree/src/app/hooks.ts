import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import { createSelector } from "@reduxjs/toolkit"
import { getScale } from "../features/Settings/panels/colorScales/colourSlice"
import { ImmutableTree,  TaxonSet } from "@figtreejs/core"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//todo update this selector so we cache the tree instance if the tree data is not changed.


const selectTreeData = (state: RootState) => state.tree.present.tree
const selectTaxaData = (state: RootState) => state.tree.present.taxa

export const selectTree = createSelector(selectTreeData,selectTaxaData,(treeData,taxaData) => {
  const taxa = new TaxonSet(taxaData);
  return new ImmutableTree({data:treeData,taxonSet:taxa})
})

function selectColorScales(state: RootState) {
  return state.colorScales
}
function selectColorScale(state: RootState,id:string) {
  return id
}
export const getColorScale = createSelector(
    [selectColorScales,selectColorScale],
    (colorScales,id) => {
        const colorData = colorScales.byId[id]
        if(colorData===undefined) return ()=>'#000000' //HARD CODED BLACK
        return getScale(colorData)
        
    }
)
export const getColorData = createSelector(
  [selectColorScales,selectColorScale],
  (colorScales,id) => colorScales.byId[id]
)

