import './panel.css'
import { ReactNode, useState } from 'react'

//modeled after react-collapsible 

/*
The panel header behaviour is modeled after figtree's setting panel.

Clicking on a title of a panel that is not checkable will open the panel.
On a panel that is checkable, clicking to the left of the title will open the panel
to the right of the title will toggle the box. 
*/
// onClick:null,
// checkable: false,
// checked: false,
// intialOpen:false


const defaultProps = {
    onClick:null,
    intialOpen:false
}

export function SettingPanel(props: {
    children: ReactNode, title: string, checkable: boolean, onClick?: () => void, checked: boolean,intialOpen?:boolean
}) {
    const {intialOpen,checked,onClick,checkable,title} = {...defaultProps,...props}

    const [isOpen, setOpen] = useState(intialOpen);

    return (
        <div >
            <div className="PanelHeader">

            <div className="openerContainer" onClick={() => setOpen(!isOpen)}>
            <div className={`opener ${isOpen?'open':''}`}   />

            </div>

            <div className="PanelTitle" onClick={onClick?onClick:()=>setOpen(!isOpen)}>
                {checkable ?
                    <div className="PanelTitle__checkbox" >
                        <input type="checkbox" checked={checked} onChange={()=>null} />
                    </div>
                    : ""}
                <div className="PanelTitle__title"  >
                   {title}
                </div>
            </div>
            </div>
            <div className="Panel__content" style={{ display: isOpen ? "block" : "none" }}>
                {props.children}
            </div>
        </div>

            )
}

            