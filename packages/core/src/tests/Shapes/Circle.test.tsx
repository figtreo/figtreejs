import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseCircle } from "../../components/Baubles/Shapes";

describe("BaseCircle", () => {
  test("renders an SVG circle with the right attributes", () => {
    render(
      <svg>
        <BaseCircle
          x={0}
          y={0}
          {...{ r: 1, fill: "blue", "data-testid": "circle" }}
          animated={false}
        />
      </svg>,
    );

    const circle = screen.getByTestId("circle"); // const circle = container.querySelector("circle");

    expect(circle).not.toBeNull();
    expect(circle.getAttribute("cx")).toBe("0");
    expect(circle.getAttribute("cy")).toBe("0");
    expect(circle.getAttribute("r")).toBe("1");
    expect(circle.getAttribute("fill")).toBe("blue");
  });

  test("renders an animated circle with the right attributes", () => {
    render(
      <svg>
        <BaseCircle
          x={0}
          y={0}
          {...{ r: 1, fill: "blue", "data-testid": "circle" }}
          animated={true}
        />
      </svg>,
    );

    const circle = screen.getByTestId("circle"); // const circle = container.querySelector("circle");

    expect(circle).not.toBeNull();
    expect(circle.getAttribute("cx")).toBe("0");
    expect(circle.getAttribute("cy")).toBe("0");
    expect(circle.getAttribute("r")).toBe("1");
    expect(circle.getAttribute("fill")).toBe("rgba(0, 0, 255, 1)");
  });
});
