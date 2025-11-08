// import type {AnyCommand} from 'abs-svg-path'
declare module 'parse-svg-path'{

  // Derive the *input* element type of abs() commands:
    type AnyCommand = import('./svg-path-types').AnyCommand;
    const parse:(n:string)=>AnyCommand[],
    export default parse;
}