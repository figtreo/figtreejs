
import React from "react";

import { describe, expect, test } from "vitest";
import { render,screen} from "@testing-library/react";

import { StripSprings } from "../../components/Baubles/types";
import  { BaseLabelAttrsType,BaseLabel } from "../../components/Baubles/Shapes/Label";
import { withAnimation } from "../../components/HOC/withAnimation";

export type LabelAttrs=StripSprings<BaseLabelAttrsType>


export const Label = withAnimation(BaseLabel)

describe("BaseLabel", () => {
  test("renders an SVG text element that uses transform to position", () => {
   render(
      <svg>
        <BaseLabel x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"}  />
      </svg>
    );
        const textEl = screen.getByText("TEST");
        expect(textEl.tagName.toLowerCase()).toBe("text");
        expect(textEl!.getAttribute('transform')).toBe('translate(2,2) rotate(0)');
  });
    test("renders an SVG text element an alignment line", () => {
        const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
    const { container } = render(
      <svg>
        <BaseLabel x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"} 
        d={d} />
      </svg>
    );

        const path = container.querySelector("path");
        expect(path).not.toBeNull();
        expect(path!.getAttribute('d')).toBe(d);
  });
});

describe("Label", () => {
  test("renders a label element that uses transform to position", () => {
   render(
      <svg>
        <Label x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"}  />
      </svg>
    );
        const textEl = screen.getByText("TEST");
        expect(textEl.tagName.toLowerCase()).toBe("text");
        expect(textEl!.getAttribute('transform')).toBe('translate(2,2) rotate(0)');
  });
    test("renders a label element an alignment line", () => {
        const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
    const { container } = render(
      <svg>
        <Label x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"} 
        d={d} />
      </svg>
    );

        const path = container.querySelector("path");
        expect(path).not.toBeNull();
        expect(path!.getAttribute('d')).toBe(d);
  });

    test("renders an animated label element that uses transform to position", () => {
   render(
      <svg>
        <Label x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"}  animated={true} />
      </svg>
    );
        const textEl = screen.getByText("TEST");
        expect(textEl.tagName.toLowerCase()).toBe("text");
        expect(textEl!.getAttribute('transform')).toBe('translate(2,2) rotate(0)');
  });
    test("renders an animated label element an alignment line", () => {
        const d = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z"
    const { container } = render(
      <svg>
        <Label x={2} y={2} attrs={{alignmentBaseline:"central",textAnchor:"end",rotation:0}} text={"TEST"}  animated={true}
        d={d} />
      </svg>
    );

        const path = container.querySelector("path");
        expect(path).not.toBeNull();
        expect(path!.getAttribute('d')).toBe(d);
  });
});