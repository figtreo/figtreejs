import layoutReducer, { LayoutState} from "./layoutSlice"

describe('layoutSlice',()=>{
    const initialState: LayoutState = {
        layout: 'rectangular',
        expansion: 0,
        fishEye: 0,
        rootLength: 0,
        curvature: 0,
        alignTipLabels: false,
        zoom: 0,
        rootAngle: 0,
        angleRange: 0,
        showRoot: false,
        spread: 0,
        pointOfInterest: null,
    };
    it('should handle initial state', () => {
        expect(layoutReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
    it('should handle setLayout', () => {
        const actual = layoutReducer(initialState, {type:'layout/setLayout',payload:'circular'});
        expect(actual.layout).toEqual('circular');
    });
    it('should handle setExpansion', () => {
        const actual = layoutReducer(initialState, {type:'layout/setExpansion',payload:1});
        expect(actual.expansion).toEqual(1);
    });
    it('should handle setFisheye', () => {
        const actual = layoutReducer(initialState, {type:'layout/setFisheye',payload:1});
        expect(actual.fishEye).toEqual(1);
    });
    it('should handle setRootLength', () => {
        const actual = layoutReducer(initialState, {type:'layout/setRootLength',payload:1});
        expect(actual.rootLength).toEqual(1);
    });
    it('should handle setCurvature', () => {
        const actual = layoutReducer(initialState, {type:'layout/setCurvature',payload:1});
        expect(actual.curvature).toEqual(1);
    });
    it('should handle flipAlignTipLabels', () => {
        const actual = layoutReducer(initialState, {type:'layout/flipAlignTipLabels'});
        expect(actual.alignTipLabels).toEqual(true);
    });


});