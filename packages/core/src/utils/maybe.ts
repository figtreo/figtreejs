// types to avoid always checking for null values

//https://engineering.dollarshaveclub.com/typescript-maybe-type-and-module-627506ecc5c8#950b
export enum MaybeType {
  Some = "some",
  Nothing = "nothing",
}

export type Some<T> = {
  type: typeof MaybeType.Some;
  value: T;
};

export type Nothing = {
  type: typeof MaybeType.Nothing;
};

export type Maybe<T> = Some<T> | Nothing;

export const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});

export const Some = <T>(value: T): Some<T> => ({
  type: MaybeType.Some,
  value,
});

export const UnwrapErr = <T>(v: Maybe<T>, message: string): T => {
  switch (v.type) {
    case MaybeType.Some:
      return v.value;
    case MaybeType.Nothing:
      throw new Error(message);
  }
};

export const UnwrapOr = <T>(v: Maybe<T>, d: T): T => {
  switch (v.type) {
    case MaybeType.Some:
      return v.value;
    case MaybeType.Nothing:
      return d;
  }
};
// A helper type so we can appease the linters and check some accesses for undefined without having to check them all.
export type Undefinable<T> = T | undefined;

export function panic(message: string): never {
  throw new Error(message);
}

export function u<T>(x: T | undefined): NonNullable<T> {
  if (x === undefined) {
    throw new Error("internal bug! unhandled undefined");
  }
  return x as NonNullable<T>;
}

export function notNull<T>(x: T, message: string): asserts x is NonNullable<T> {
  if (x === undefined) throw new Error(message);
}

export function unNullify<T>(x: T, message: string): NonNullable<T> {
  if (x === null) throw new Error(message);
  return x as NonNullable<T>;
}
