import { useRef, useState } from "react";
import { Tree } from "./tree";
import './treePanel.css'
import { selectTree } from '../../app/hooks';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addScaleFromAnnotation } from "../Settings/panels/colorScales/colourSlice";
import { AnnotationType } from "@figtreejs/core";
export function TreePanel(){
  const tree = useAppSelector(selectTree);
  const dispatch = useAppDispatch();


    const treePanelRef = useRef<HTMLInputElement>(null);
    const [drag,setDrag] = useState(false);
//https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    function dropHandler(ev:any):void  {
        setDrag(false);
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      
        if (ev.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          [...ev.dataTransfer.items].forEach((item) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                const reader = new FileReader();
                   reader.onload = function(e) {
                    tree.addFromString(e.target!.result as string);
                    for(const annotation of tree.getAnnotationKeys()){
                      const data = tree.getAnnotationData(annotation)
                      const type = tree.getAnnotationType(annotation);
                      if(type===AnnotationType.DISCRETE||type===AnnotationType.CONTINUOUS){
                        dispatch(addScaleFromAnnotation(data));

                      }
                  }
            }
            reader.readAsText(file);
            }
          });
        } else {
          // Use DataTransfer interface to access the file(s)
          [...ev.dataTransfer.files].forEach((file) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                tree.addFromString(e.target!.result as string);
                for(const annotation of tree.getAnnotationKeys()){
                  const data = tree.getAnnotationData(annotation)
                  const type = tree.getAnnotationType(annotation);
                  if(type===AnnotationType.DISCRETE||type===AnnotationType.CONTINUOUS){
                    dispatch(addScaleFromAnnotation(data));

                  }
              }
            }
            reader.readAsText(file);
        });
      }
    }
      
      function dragOverHandler(ev:any) :void {      
        setDrag(true);
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      }
      

      function dragLeaveHandler(ev:any):void {
        setDrag(false);
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      }


      

    return(
        <div id="treePanel" className={`TreePanel ${drag?'dragged':''}`} ref={treePanelRef} onDrop= {dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler}>
            <Tree panelRef={treePanelRef} style={"cursor:crosshair"} />
        </div>
    )
}