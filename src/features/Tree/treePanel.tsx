import { useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "./tree";
import './treePanel.css'
export function TreePanel(){
    // a little magic here to make the panel resize and pass the size to the tree
    //min width and height for svg
    const minWidth = 400;
    const minHeight = 400;

    const treePanelRef = useRef<HTMLInputElement>(null);
    const [isResizing, setIsResizing] = useState(false);

    const [treeSize, setTreeSize] = useState({width:600,height:400});

    const startResizing = useCallback((mouseDownEvent: any) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const padding = 50; //svg a little smaller 
    const resize = useCallback(
        (mouseMoveEvent: any) => {
            if (isResizing && treePanelRef.current != null) {
                
                const height = Math.max(minHeight,treePanelRef.current.getBoundingClientRect().height-padding)
                const width = Math.max(minWidth,treePanelRef.current.getBoundingClientRect().width-padding)
                console.log(height,width)
                console.log(treePanelRef.current.getBoundingClientRect())
                setTreeSize(
                    {height,width}
                );
            }
        },
        [isResizing]
    );

    

    useEffect(() => {
        window.addEventListener("resize", resize);
        window.addEventListener("resize", startResizing);
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("resize", stopResizing);
        };
    }, [resize, stopResizing]);



    return(
        <div className="TreePanel" ref={treePanelRef} >
            <Tree suggestedWidth={treeSize.width} baseHeight={treeSize.height} />
        </div>
    )
}