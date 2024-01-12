import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"
import { TreeduxList, treeSelectorFactory } from "@figtreejs/core"
import { store } from './store'
import { createSelector } from "@reduxjs/toolkit"
import { getScale } from "../features/Settings/panels/colorScales/colourSlice"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//todo update this selector so we cache the tree instance if the tree data is not changed.


// const treeSelector = (state: RootState) => state.treeStatus.present.tree

export const selectTree = treeSelectorFactory(store, (state: any) => state.treeStatus.present.tree);

// export const seletTree = createSelector(
//   [treeSelector],
//   (tree) => new TreeduxList(store,treeSelector)
// )

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

