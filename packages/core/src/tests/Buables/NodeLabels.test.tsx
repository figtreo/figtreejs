import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import { ImmutableTree } from "../../Evo";
import { FigTree } from "../../Components";
import { polarLayout, radialLayout, rectangularLayout } from "../../Layouts";
import { Branches, NodeLabels } from "../../BaubleMakers/Makers";

const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);");

describe("Node labels", () => {
  test("renders a tree node labels", () => {
    const fig = render(
      <svg
        width="400px"
        height="400px"
        data-testid="figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        <FigTree
          width={400}
          height={400}
          tree={tree}
          layout={rectangularLayout}
          baubles={[
            Branches({ attrs: { strokeWidth: 2, stroke: "black" } }),
            NodeLabels({ text: "Label!" }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
  test("renders a tree with aligned Node labels and a function for text", () => {
    const fig = render(
      <svg
        width="400px"
        height="400px"
        data-testid="figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        <FigTree
          width={400}
          height={400}
          tree={tree}
          layout={rectangularLayout}
          baubles={[
            Branches({ attrs: { strokeWidth: 2, stroke: "black" } }),
            NodeLabels({ text: (n) => `${n.number}`, aligned: true }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
  test("renders a tree node labels - polar", () => {
    const fig = render(
      <svg
        width="400px"
        height="400px"
        data-testid="figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        <FigTree
          width={400}
          height={400}
          tree={tree}
          layout={polarLayout}
          baubles={[
            Branches({ attrs: { strokeWidth: 2, stroke: "black" } }),
            NodeLabels({ text: "Label!" }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
  test("renders a tree with aligned Node labels and a function for text - polar", () => {
    const fig = render(
      <svg
        width="400px"
        height="400px"
        data-testid="figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        <FigTree
          width={400}
          height={400}
          tree={tree}
          layout={polarLayout}
          baubles={[
            Branches({ attrs: { strokeWidth: 2, stroke: "black" } }),
            NodeLabels({ text: (n) => `${n.number}`, aligned: true }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
  test("renders a tree node labels in radial layout", () => {
    const fig = render(
      <svg
        width="400px"
        height="400px"
        data-testid="figure"
        xmlns="http://www.w3.org/2000/svg"
      >
        <FigTree
          width={400}
          height={400}
          tree={tree}
          layout={radialLayout}
          baubles={[
            Branches({ attrs: { strokeWidth: 2, stroke: "black" } }),
            NodeLabels({ text: "Label!" }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
});
