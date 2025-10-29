import { SpringValue } from "@react-spring/web";
import { numerical } from "./types";

export const isSpringNumber = (v: numerical): v is SpringValue<number> =>  v instanceof SpringValue

