import React from "react";
import { render} from "@testing-library/react";
import { ImmutableTree } from "../../Evo";
import { FigTree } from "../../components";
import { polarLayout, rectangularLayout } from "../../Layouts";
import { Branches } from "../../components/rethink/Baubles/Branches";
import { CladeHighlight } from "../../components/rethink/Clades/makeClade";

 const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);")

describe("Figures", () => {
  test("renders a single highlight", () => {
    
   const fig = render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={rectangularLayout}
        baubles={[
            Branches({attrs:{strokeWidth:2,stroke:"black"}}),
            CladeHighlight({attrs:{fill:"red",opacity:0.5},nodes:[tree.getParent(tree.getNode("A")!)!]})
        ]}
        />
      </svg>
    );
    
    expect(fig).toMatchSnapshot()
      // expect(fig).toBeInTheDocument();

  });
    test("renders a single polar highlight", () => {
    
   const fig = render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={polarLayout}
        baubles={[
            Branches({attrs:{strokeWidth:2,stroke:"black"}}),
            CladeHighlight({attrs:{fill:"red",opacity:0.5},nodes:[tree.getParent(tree.getNode("A")!)!]})
        ]}
        />
        
      </svg>
    );
    
   expect(fig).toMatchSnapshot()
      // expect(fig).toBeInTheDocument();

  });
});