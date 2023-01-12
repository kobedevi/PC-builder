import { Frameloop } from "../Types/Frameloops";

type Frameloops = { ALWAYS: Frameloop; DEMAND: Frameloop; NEVER: Frameloop };

export const FRAMELOOPS: Readonly<Frameloops> = {
  ALWAYS: "always",
  DEMAND: "demand",
  NEVER: "never",
};
