import { render } from "@testing-library/react";
import { ImmutableTree } from "../../evo";
import { FigTree } from "../../components";
import { polarLayout, rectangularLayout } from "../../layouts";
import { u } from "../../utils/maybe";
import { Branches, CartoonClades } from "../../bauble-makers/makers";

const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);");

describe("Figures", () => {
  test("renders a single highlight", () => {
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
            CartoonClades({
              attrs: { fill: "red", opacity: 0.5 },
              nodes: [u(tree.getParent(u(tree.getNode("A"))))],
            }),
          ]}
        />
      </svg>,
    );

    //fig.debug();
    expect(fig).toMatchSnapshot();
  });
  test("renders a single polar highlight", () => {
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
            CartoonClades({
              attrs: { fill: "red", opacity: 0.5 },
              nodes: [u(tree.getParent(u(tree.getNode("A"))))],
            }),
          ]}
        />
      </svg>,
    );
    //fig.debug();
    expect(fig).toMatchSnapshot();
    // expect(fig).toBeInTheDocument();
  });
});
