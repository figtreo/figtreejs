import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  BaseRectangle,
  CenteredRectangle,
} from "../../Components/Baubles/Shapes";

describe("BaseRectangle", () => {
  test("renders an SVG rect which is centered and has the right attributes", () => {
    render(
      <svg>
        <CenteredRectangle
          x={2}
          y={2}
          {...{ width: 2, height: 3, "data-testid": "rect" }}
          animated={false}
        />
      </svg>,
    );

    const rect = screen.getByTestId("rect");
    // const circle = container.querySelector("circle");

    // expect(rect).toBeInTheDocument();
    expect(rect.getAttribute("x")).toBe("1");
    expect(rect.getAttribute("y")).toBe("0.5");
    expect(rect.getAttribute("width")).toBe("2");
    expect(rect.getAttribute("height")).toBe("3");
  });

  test("renders a rect which is not centered and has the right attributes", () => {
    render(
      <svg>
        <BaseRectangle
          x={2}
          y={2}
          {...{ width: 2, height: 3, "data-testid": "rect" }}
          animated={false}
        />
      </svg>,
    );

    const rect = screen.getByTestId("rect");
    expect(rect.getAttribute("x")).toBe("2");
    expect(rect.getAttribute("y")).toBe("2");
    expect(rect.getAttribute("width")).toBe("2");
    expect(rect.getAttribute("height")).toBe("3");
  });
  test("renders an animated rect which is centered and has the right attributes", () => {
    render(
      <svg>
        <BaseRectangle
          x={2}
          y={2}
          {...{ width: 2, height: 3, "data-testid": "rect" }}
          animated={true}
        />
      </svg>,
    );

    const rect = screen.getByTestId("rect");
    expect(rect.getAttribute("x")).toBe("2");
    expect(rect.getAttribute("y")).toBe("2");
    expect(rect.getAttribute("width")).toBe("2");
    expect(rect.getAttribute("height")).toBe("3");
  });
});
