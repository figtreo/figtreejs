import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { flipTangle, flipAnimate, selectLayout, setExpansion, setFisheye, setLayout, setPollard, setZoom } from './layoutSlice';
import { SettingPanel } from '../PanelHeader';
import './layout.css'
import { RectangularOptions } from './rectangularOptions';
import { PolarOptions } from './polarOptions';
import { RadialOptions } from './radialOptions';
import rectTreeImage from '../../../../figtreeGraphics/rectangularTree.png'
import polarTreeImage from '../../../../figtreeGraphics/polarTree.png'
import radialTreeImage from '../../../../figtreeGraphics/radialTree.png'
export function Layout() {
    const { layout,zoom,expansion,fishEye,animate,pollard} = useAppSelector(selectLayout);
    const dispatch = useAppDispatch();


    return (
        <SettingPanel title="Layout" intialOpen={true} >

            <div>
                <div className="layoutImages">
                    <div className="layoutSpacer" />
                    <div className='imageContainer'>
                        <div className={`image  ${layout === "Rectangular" ? "selected" : ''}`} onClick={() => dispatch(setLayout("Rectangular"))} title="rectangle layout">
                            <img src={rectTreeImage} alt="" />
                        </div>
                        <div className={`image  ${layout === "Polar" ? "selected" : ''}`} onClick={() => dispatch(setLayout("Polar"))} title="polar layout">
                            <img src={polarTreeImage} alt="" />
                        </div>
                        <div className={`image ${layout === "Equalangle" ? "selected" : ''}`} onClick={() => dispatch(setLayout("Equalangle"))} title="radial layout">
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
                    disabled={layout!=="Rectangular"}
                />
            </div>
            <div className='option range'>
                <label htmlFor="fishEye">Fisheye: </label>

                <input
                    type="range"
                    min="0"
                    max="0.1"
                    id="fishEye" step={0.01}

                    onChange={(e) => dispatch(setFisheye(parseFloat(e.target.value)))}
                    value={fishEye}
                    disabled={layout==="Equalangle"}

                />
            </div>
            <div  className='option range'>


            <label htmlFor="pollard">Pollard: </label>

            <input
                type="range"
                min="0"
                max="0.99"
                step={0.01}
                id="pollard"
                onChange={(e) => { dispatch(setPollard(parseFloat(e.target.value))) }}
                value={pollard}
                disabled={layout!=="Rectangular"}
            />
            </div>
            <div>
            <input
                    type="checkbox"
                    checked={animate}
                    onChange={() => dispatch(flipAnimate())}
                    id="animate"
                />
                <label htmlFor='animate'>Animate</label>
            </div>
            <div className="layoutOptions">
            {layout === "Rectangular" ? <RectangularOptions /> :
                layout === "Polar" ? <PolarOptions /> :
                    layout === "Equalangle" ? <RadialOptions /> : null}
            </div>

        </SettingPanel>

    )


}