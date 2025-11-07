

import { describe, expect, test } from "vitest";
import { render,screen} from "@testing-library/react";
import type { WithTestId } from "./types";
import { withAnimation } from "../../components/HOC/withAnimation";
import type { StripSprings } from "../../components/Baubles/types";
import type { BaseBranchAttrsType} from "../../components/Baubles/Shapes";
import { BasePath } from "../../components/Baubles/Shapes";

export type BranchAttrs =StripSprings<BaseBranchAttrsType>

const Path = withAnimation(BasePath)

describe("BaseBranch", () => {
  test("renders BaseBranch, SVG path which has the right attributes", () => {
     const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
   render(
      <svg>
        <BasePath d={d} attrs={{ stroke:"blue",'data-testid': 'branch'} as WithTestId<BaseBranchAttrsType>}  />
      </svg>
    );
    
    const branch = screen.getByTestId('branch')
    expect(branch.getAttribute('d')).toBe(d);
    expect(branch.getAttribute('stroke')).toBe('blue');
  });
 
});
describe("Branch", () => {
  test("Renders a branch , SVG path which has the right attributes",()=>{
    const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
    render(
        <svg>
          <Path d={d} attrs={{ stroke:"blue",'data-testid': 'branch'} as WithTestId<BranchAttrs>}  />
        </svg>
      );
      
      const branch = screen.getByTestId('branch')
      expect(branch.getAttribute('d')).toBe(d);
      expect(branch.getAttribute('stroke')).toBe('blue');
  });
    test("Renders an animated branch , SVG path which has the right attributes",()=>{
    const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
    render(
        <svg>
          <Path d={d} animated={true} attrs={{ stroke:"blue",'data-testid': 'branch'} as WithTestId<BranchAttrs>}  />
        </svg>
      );
      
      const branch = screen.getByTestId('branch')
      expect(branch.getAttribute('d')).toBe(d);
      expect(branch.getAttribute('stroke')).toBe('rgba(0, 0, 255, 1)'); // animation used rga
  })
});