import { useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "./tree";
import './treePanel.css'
export function TreePanel(){

    const treePanelRef = useRef<HTMLInputElement>(null);
   



    return(
        <div className="TreePanel" ref={treePanelRef} >
            <Tree panelRef={treePanelRef}  />
        </div>
    )
}