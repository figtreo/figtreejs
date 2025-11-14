import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseLabel } from "../../components/Baubles/Shapes/Label";
import { unNullify } from "../../utils";

describe("BaseLabel", () => {
  test("renders an SVG text element that uses transform to position", () => {
    render(
      <svg>
        <BaseLabel
          x={2}
          y={2}
          {...{ alignmentBaseline: "central", textAnchor: "end", rotation: 0 }}
          text={"TEST"}
          animated={false}
        />
      </svg>,
    );
    const textEl = screen.getByText("TEST");
    expect(textEl.tagName.toLowerCase()).toBe("text");
    expect(textEl.getAttribute("transform")).toBe("translate(2,2) rotate(0)");
  });
  test("renders an SVG text element an alignment line", () => {
    const d =
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z";
    const { container } = render(
      <svg>
        <BaseLabel
          x={2}
          y={2}
          {...{ alignmentBaseline: "central", textAnchor: "end", rotation: 0 }}
          text={"TEST"}
          animated={false}
          d={d}
        />
      </svg>,
    );

    const path = unNullify(container.querySelector("path"), `path was null`);
    expect(path).not.toBeNull();
    expect(path.getAttribute("d")).toBe(d);
  });

  test("renders a label element an alignment line", () => {
    const d =
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z";
    const { container } = render(
      <svg>
        <BaseLabel
          x={2}
          y={2}
          {...{ alignmentBaseline: "central", textAnchor: "end", rotation: 0 }}
          text={"TEST"}
          animated={false}
          d={d}
        />
      </svg>,
    );

    const path = unNullify(container.querySelector("path"), `path was null`);
    expect(path).not.toBeNull();
    expect(path.getAttribute("d")).toBe(d);
  });

  test("renders an animated label element that uses transform to position", () => {
    render(
      <svg>
        <BaseLabel
          x={2}
          y={2}
          {...{ alignmentBaseline: "central", textAnchor: "end", rotation: 0 }}
          text={"TEST"}
          animated={true}
        />
      </svg>,
    );
    const textEl = screen.getByText("TEST");
    expect(textEl.tagName.toLowerCase()).toBe("text");
    expect(textEl.getAttribute("transform")).toBe("translate(2,2) rotate(0)");
  });
  test("renders an animated label element an alignment line", () => {
    const d =
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z";
    const { container } = render(
      <svg>
        <BaseLabel
          x={2}
          y={2}
          {...{ alignmentBaseline: "central", textAnchor: "end", rotation: 0 }}
          text={"TEST"}
          animated={true}
          d={d}
        />
      </svg>,
    );

    const path = unNullify(container.querySelector("path"), `path was null`);
    expect(path).not.toBeNull();
    expect(path.getAttribute("d")).toBe(d);
  });
});
