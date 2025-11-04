
import React from "react";

import { describe, expect, test } from "vitest";
import { render,screen} from "@testing-library/react";
import { CenteredRectangle, Rectangle, RectAttrs } from "../../components/rethink/Shapes/Rectangle";
import { WithTestId } from "./types";


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
    expect(rect!.getAttribute('x')).toBe('1');
    expect(rect!.getAttribute('y')).toBe('0.5');
    expect(rect!.getAttribute('width')).toBe('2');
    expect(rect!.getAttribute('height')).toBe('3');
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
      expect(rect!.getAttribute('x')).toBe('1');
      expect(rect!.getAttribute('y')).toBe('0.5');
      expect(rect!.getAttribute('width')).toBe('2');
      expect(rect!.getAttribute('height')).toBe('3');
    });
    test("renders an animated rect which is centered and has the right attributes", () => {
    render(
        <svg>
          <Rectangle x={2} y={2} attrs={{ width: 2, height: 3, 'data-testid': 'rect' } as WithTestId<RectAttrs>} animated={true}  />
        </svg>
      );
      
      const rect = screen.getByTestId('rect')
      expect(rect!.getAttribute('x')).toBe('1');
      expect(rect!.getAttribute('y')).toBe('0.5');
      expect(rect!.getAttribute('width')).toBe('2');
      expect(rect!.getAttribute('height')).toBe('3');
  });
  });