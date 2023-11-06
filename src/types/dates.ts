import { NumericRange } from './utils';

// inspired by https://blog.logrocket.com/handling-date-strings-typescript/

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | OneToNine;

// scheduled football games can't be in the past
// It should be NumericRange<20, 99> at least, but we get a warning
// "Expression produces a union type that is too complex to represent."
// NumericRange is for exmple here, in case we want to create a range,
// but in our case it's not necessary, because... 2100+ year, really?
type AnyYYYY = `${NumericRange<20, 99>}${ZeroToNine}${ZeroToNine}`;
export type YYYY = `20${ZeroToNine}${ZeroToNine}`;
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`;

type hh = `${0 | 1}${OneToNine}` | `2${0 | 1 | 2 | 3}`;
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${OneToNine}`;
type ss = `${0 | 1 | 2 | 3 | 4 | 5}${OneToNine}`;

export type DateString = `${YYYY}-${MM}-${DD}`;
export type TimeString = `${hh}:${mm}:${string}`;
// -> any
export type DateTimeString = `${string}T${TimeString}Z`;
