// This file is a *module* (it exports types).
// It derives types from the value type of 'abs-svg-path'.

export type AbsFn = typeof import('abs-svg-path');

// Array element type of the *input* to abs()
export type AnyCommand = Parameters<AbsFn>[0][number];

// Array element type of the *output* from abs() (absolute commands)
export type AbsAnyCommand = ReturnType<AbsFn>[number];

// Generic helper: pick the command union members whose first tuple entry matches C
type CommandOf<C extends string> = Extract<AnyCommand, [C, ...unknown[]]>;

// Common subtypes you might want:
export type RelMoveCommand = CommandOf<'m'>;
export type AbsMoveCommand = CommandOf<'M'>;
export type RelLineCommand = CommandOf<'l'>;
export type AbsLineCommand = CommandOf<'L'>;
export type RelHorizontalCommand = CommandOf<'h'>;
export type AbsHorizontalCommand = CommandOf<'H'>;
export type RelVerticalCommand = CommandOf<'v'>;
export type AbsVerticalCommand = CommandOf<'V'>;
export type RelClosePathCommand = CommandOf<'z'>;
export type AbsClosePathCommand = CommandOf<'Z'>;
export type RelBezierCurveCommand = CommandOf<'c'>;
export type AbsBezierCurveCommand = CommandOf<'C'>;
export type RelFollowingBezierCurveCommand = CommandOf<'s'>;
export type AbsFollowingBezierCurveCommand = CommandOf<'S'>;
export type RelQuadraticCurveCommand = CommandOf<'q'>;
export type AbsQuadraticCurveCommand = CommandOf<'Q'>;
export type RelFollowingQuadraticCurveCommand = CommandOf<'t'>;
export type AbsFollowingQuadraticCurveCommand = CommandOf<'T'>;
export type RelArcCommand = CommandOf<'a'>;
export type AbsArcCommand = CommandOf<'A'>;

export  type NormalizedCommand = AbsMoveCommand | AbsBezierCurveCommand | AbsClosePathCommand;