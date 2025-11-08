declare module 'normalize-svg-path' {
  // Pull in the derived types (no value import here—types only)

  type NormalizedCommand = import('./svg-path-types').NormalizedCommand;

  // What normalize returns: path must be absolute; segments become curves (plus M/Z)


  // The library exposes a single function; the upstream repo publishes CJS + ESM builds.
  // We'll declare CJS style; with esModuleInterop you can default-import it if you like.
  function normalize(path: AbsAnyCommand[]): NormalizedCommand[];
  export = normalize;
}
