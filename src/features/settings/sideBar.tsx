import { useState, useEffect, useRef, useCallback } from "react";
import { Settings } from "./settings";
import './settings.css';
//https://codesandbox.io/s/react-resizable-sidebar-kz9de?file=/src/App.js:0-1430
const minWidth = 200;
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
                    Math.max(
                    mouseMoveEvent.clientX -
                    sidebarRef.current.getBoundingClientRect().left,
                    minWidth)
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

    // <div className="sidebar-resizer" onMouseDown={startResizing}>
    // {/* <span className="dot"></span> */}
    //     </div>
    return (
        <div className="sidebar">

            <div
                ref={sidebarRef}
                style={{ width: sidebarWidth }}

            >
                <div className="sidebar-content">
                    <Settings />
                </div>

            </div>
            <div className="sidebar-spacer" />

            <div className="sidebar-resizer" onMouseDown={startResizing}>
                <div className="dot"></div>
            </div>            
        </div>

    );
}
