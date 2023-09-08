import './panelHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useState } from 'react'
//modeled after react-collapsible 

// this need some state to allow it to open and close
export function SettingPanel(props: {
    children: ReactNode; title: string, checkable: boolean, onClick: () => void, checked: boolean
}) {
    const [isOpen, setOpen] = useState(false);


    return (
        <div className="PanelHeader">
            <div className="opener" onClick={() => setOpen(!isOpen)} >
                <FontAwesomeIcon icon={faCoffee} />
            </div>

            <div className="PanelTitle" onClick={props.onClick}>
                {props.checkable ?
                    <div className="PanelHeader__checkbox" >
                        <input type="checkbox" checked={props.checked} onChange={()=>null} />
                    </div>
                    : ""}
                <div className="PanelHeader__title"  >
                    <p>{props.title}</p>
                </div>
            </div>
            <div className="PanelHeader__content" style={{ display: isOpen ? "block" : "none" }}>
                {props.children}
            </div>
        </div>

            )
}

            SettingPanel.defaultProps = {
                onClick: ()=>true,
                checkable: false,
                checked: false
}