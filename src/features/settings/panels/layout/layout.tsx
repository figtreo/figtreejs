import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectLayout, setExpansion, setFisheye, setLayout, setZoom } from './layoutSlice';
import { SettingPanel } from '../PanelHeader';
import './layout.css'
import { RectangularOptions } from './rectangularOptions';
import { PolarOptions } from './polarOptions';
import { RadialOptions } from './radialOptions';
import rectTreeImage from '../../../../figtreeGraphics/rectangularTree.png'
import polarTreeImage from '../../../../figtreeGraphics/polarTree.png'
import radialTreeImage from '../../../../figtreeGraphics/radialTree.png'
export function Layout() {
    const { layout,zoom,expansion,fishEye } = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();
    return (
        <SettingPanel title="Layout" intialOpen={true} >

            <div>
                <div className="layoutImages">
                    <div className="layoutSpacer" />
                    <div className='imageContainer'>
                        <div className={`image  ${layout === "rectangular" ? "selected" : ''}`} onClick={() => dispatch(setLayout("rectangular"))} title="rectangle layout">
                            <img src={rectTreeImage} alt="" />
                        </div>
                        <div className={`image  ${layout === "circular" ? "selected" : ''}`} onClick={() => dispatch(setLayout("circular"))} title="polar layout">
                            <img src={polarTreeImage} alt="" />
                        </div>
                        <div className={`image ${layout === "equalangle" ? "selected" : ''}`} onClick={() => dispatch(setLayout("equalangle"))} title="radial layout">
                            <img src={radialTreeImage} alt="" />
                        </div>
                    </div>
                    <div className="layoutSpacer" />
                </div>
            </div>

            <div className='option range'>


                <label htmlFor="zoom">Zoom: </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="zoom"
                    onChange={(e) => { dispatch(setZoom(parseFloat(e.target.value))) }}
                    value={zoom}
                />
            </div>
            <div  className='option range'>


                <label htmlFor="expansion">Expansion: </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step={0.01}
                    id="expansion"
                    onChange={(e) => { dispatch(setExpansion(parseFloat(e.target.value))) }}
                    value={expansion}
                    disabled={layout!=="rectangular"}
                />
            </div>
            <div className='option range'>
                <label htmlFor="fishEye">Fisheye: </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    id="fishEye" step={0.01}

                    onChange={(e) => dispatch(setFisheye(parseFloat(e.target.value)))}
                    value={fishEye}
                    disabled={layout==="equalangle"}

                />
            </div>
            <div className="layoutOptions">
            {layout === "rectangular" ? <RectangularOptions /> :
                layout === "circular" ? <PolarOptions /> :
                    layout === "equalangle" ? <RadialOptions /> : null}
            </div>

        </SettingPanel>

    )


}