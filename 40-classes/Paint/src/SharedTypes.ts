/*
  ⚠️ Note something new: Enums

    An enum (short for "enumeration") is a special data type that allows us to define
    a set of named constants. Enums help us organize related values and make our code
    more readable by using meaningful names instead of unrelated constant values.

    In this case, we define an enum called ToolType to represent different types of tools
    that can be used in a drawing application. Each tool type is internally assigned a 
    unique numeric value starting from 0 by default.
*/
export enum ToolType {
  CIRCLE,
  RECT,
  POINTER,
}

export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};
