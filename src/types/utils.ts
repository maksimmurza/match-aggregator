// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types

// Acc - accumulation - union of possible numbers. We get it recursively until
// we get a union from 0 to N
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

// 0  1  2  3  4  5  6  7  8  9
// +  +  +  +  +  +  +            0 to Max
// -  -  -  -                     0 to Min
//             =  =  =            result
export type NumericRange<Min extends number, Max extends number> = Exclude<
  Enumerate<Max>,
  Enumerate<Min>
>;
