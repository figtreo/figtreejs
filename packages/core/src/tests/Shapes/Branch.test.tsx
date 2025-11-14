import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BasePath } from "../../components/Baubles/Shapes";

describe("BaseBranch", () => {
  test("renders BaseBranch, SVG path which has the right attributes", () => {
    const d =
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z";
    render(
      <svg>
        <BasePath
          d={d}
          {...{ stroke: "blue", "data-testid": "branch", animated: false }}
        />
      </svg>,
    );

    const branch = screen.getByTestId("branch");
    expect(branch.getAttribute("d")).toBe(d);
    expect(branch.getAttribute("stroke")).toBe("blue");
  });

  test("Renders an animated branch , SVG path which has the right attributes", () => {
    const d =
      "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30Q 90,60 50,90 Q 10,60 10,30 z";
    render(
      <svg>
        <BasePath
          d={d}
          animated={true}
          {...{ stroke: "blue", "data-testid": "branch" }}
        />
      </svg>,
    );

    const branch = screen.getByTestId("branch");
    expect(branch.getAttribute("d")).toBe(d);
    expect(branch.getAttribute("stroke")).toBe("rgba(0, 0, 255, 1)"); // animation used rga
  });
});
