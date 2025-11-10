


import { describe, expect, test } from "vitest";
import { render,screen} from "@testing-library/react";
import type { WithTestId } from "./types";

import { withAnimation } from "../../components/HOC/withAnimation";
import type { StripSprings } from "../../components/Baubles/types";
import type { BaseCircleAttrsType } from "../../components/Baubles/Shapes";
import { BaseCircle } from "../../components/Baubles/Shapes";

const Circle = withAnimation(BaseCircle)
type CircleAttrs = StripSprings<BaseCircleAttrsType>

describe("BaseCircle", () => {
  test("renders an SVG circle with the right attributes", () => {
     render(
      <svg>
        <BaseCircle x={0} y={0} attrs={{ r: 1,fill:"blue", 'data-testid': 'circle'} as WithTestId<BaseCircleAttrsType>}  />
      </svg>
    );
    
    const circle = screen.getByTestId('circle')    // const circle = container.querySelector("circle");

    expect(circle).not.toBeNull();
    expect(circle.getAttribute('cx')).toBe('0');
    expect(circle.getAttribute('cy')).toBe('0');
    expect(circle.getAttribute('r')).toBe('1');
    expect(circle.getAttribute('fill')).toBe('blue');
  });
});

describe("Circle", () => {
  test("renders a circle with the right attributes", () => {
     render(
      <svg>
        <Circle x={0} y={0} attrs={{ r: 1, fill: "blue", 'data-testid': 'circle' } as WithTestId<CircleAttrs>} animated={false}  />
      </svg>
    );
    
    const circle = screen.getByTestId('circle')    // const circle = container.querySelector("circle");

    expect(circle).not.toBeNull();
    expect(circle.getAttribute('cx')).toBe('0');
    expect(circle.getAttribute('cy')).toBe('0');
    expect(circle.getAttribute('r')).toBe('1');
    expect(circle.getAttribute('fill')).toBe('blue');
  });
    test("renders an animated circle with the right attributes", () => {
     render(
      <svg>
        <Circle x={0} y={0} attrs={{ r: 1, fill: "blue", 'data-testid': 'circle' } as WithTestId<CircleAttrs>} animated={true}  />
      </svg>
    );
    
    const circle = screen.getByTestId('circle')    // const circle = container.querySelector("circle");

    expect(circle).not.toBeNull();
    expect(circle.getAttribute('cx')).toBe('0');
    expect(circle.getAttribute('cy')).toBe('0');
    expect(circle.getAttribute('r')).toBe('1');
    expect(circle.getAttribute('fill')).toBe('blue');
  });
});

