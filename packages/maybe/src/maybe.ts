
// types to avoid always checking for null values

//https://engineering.dollarshaveclub.com/typescript-maybe-type-and-module-627506ecc5c8#950b
export enum MaybeType{
    Some = 'some',
    Nothing = 'nothing'
}

export type Some<T> ={
    type:typeof MaybeType.Some
    value:T
}

export type Nothing = {
    type: typeof MaybeType.Nothing
}

export type Maybe<T> = Some<T> | Nothing

export const Nothing = ():Nothing =>({
    type:MaybeType.Nothing
})

export const Some= <T> (value:T):Some<T> =>({
    type:MaybeType.Some,
    value
})

export const UnwrapErr = <T>(v:Maybe<T>,message:string):T=>{
    switch(v.type){
        case MaybeType.Some:
            return v.value;
        case MaybeType.Nothing:
            throw new Error(message)
    }
}

export const UnwrapOr = <T>(v:Maybe<T>,d:T):T=>{
    switch(v.type){
        case MaybeType.Some:
            return v.value;
        case MaybeType.Nothing:
            return d;
    }
}