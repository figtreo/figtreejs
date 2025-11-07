


import { describe, expect, test } from "vitest";
import { render,screen} from "@testing-library/react";
import type { WithTestId } from "./types";
import type { BaseRectAttrsType} from "../../components/Baubles/Shapes";
import { BaseRectangle, CenteredRectangle } from "../../components/Baubles/Shapes";
import type { StripSprings } from "../../components/Baubles/types";

import { withAnimation } from "../../components/HOC/withAnimation";

export  type RectAttrs= StripSprings<BaseRectAttrsType>


const Rectangle = withAnimation(BaseRectangle)

describe("BaseRectangle", () => {
  test("renders an SVG rect which is centered and has the right attributes", () => {
   render(
      <svg>
        <CenteredRectangle x={2} y={2} attrs={{ width:2, height:3, 'data-testid': 'rect'} as WithTestId<RectAttrs>}  />
      </svg>
    );
    
    const rect = screen.getByTestId('rect')
    // const circle = container.querySelector("circle");

    // expect(rect).toBeInTheDocument();
    expect(rect.getAttribute('x')).toBe('1');
    expect(rect.getAttribute('y')).toBe('0.5');
    expect(rect.getAttribute('width')).toBe('2');
    expect(rect.getAttribute('height')).toBe('3');
  });
});
describe("Rectangle", () => {
  test("renders a rect which is centered and has the right attributes", () => {
    render(
        <svg>
          <Rectangle x={2} y={2} attrs={{ width: 2, height: 3, 'data-testid': 'rect' } as WithTestId<RectAttrs>} animated={false}  />
        </svg>
      );
      
      const rect = screen.getByTestId('rect')
      expect(rect.getAttribute('x')).toBe('2');
      expect(rect.getAttribute('y')).toBe('2');
      expect(rect.getAttribute('width')).toBe('2');
      expect(rect.getAttribute('height')).toBe('3');
    });
    test("renders an animated rect which is centered and has the right attributes", () => {
    render(
        <svg>
          <Rectangle x={2} y={2} attrs={{ width: 2, height: 3, 'data-testid': 'rect' } as WithTestId<RectAttrs>} animated={true}  />
        </svg>
      );
      
      const rect = screen.getByTestId('rect')
      expect(rect.getAttribute('x')).toBe('2');
      expect(rect.getAttribute('y')).toBe('2');
      expect(rect.getAttribute('width')).toBe('2');
      expect(rect.getAttribute('height')).toBe('3');
  });
  });