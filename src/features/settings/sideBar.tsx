import { useState, useEffect, useRef, useCallback } from "react";
import { Settings } from "./settings";
//https://codesandbox.io/s/react-resizable-sidebar-kz9de?file=/src/App.js:0-1430
export function SideBar() {
    const sidebarRef = useRef<HTMLInputElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(268);

    const startResizing = useCallback((mouseDownEvent: any) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: any) => {
            if (isResizing && sidebarRef.current != null) {
                setSidebarWidth(
                    mouseMoveEvent.clientX -
                    sidebarRef.current.getBoundingClientRect().left
                );
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div className="sidebar">

            <div
                ref={sidebarRef}
                style={{ width: sidebarWidth }}
                
            >
                <div className="sidebar-content">
                    <Settings />
                </div>
                <div className="sidebar-resizer" onMouseDown={startResizing} />
            </div>
            <div className="sidebar-frame" />
            </div>

    );
}
