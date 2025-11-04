import React from "react";

import { describe, test } from "vitest";
import { render,screen} from "@testing-library/react";
import { ImmutableTree } from "../../Evo";
import { FigTree } from "../../components";
import { rectangularLayout } from "../../Layouts";
import { Branches } from "../../components/rethink/Baubles/Branches";
import { CircleNodes, RectangleNodes } from "../../components/rethink/Baubles/Nodes";

 const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);")

describe("Figures", () => {
  test("renders a simple figure", () => {
    
   const fig = render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={rectangularLayout}
        />
      </svg>
    );
    
     expect(fig).toMatchSnapshot()

      // expect(fig).toBeInTheDocument();

  });
  test("renders a tree with branch baubles", () => {
     const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);")
   const fig =render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={rectangularLayout}
        baubles={[Branches({attrs:{strokeWidth:2,stroke:"black"}})]}
        />
      </svg>
    );
    
     expect(fig).toMatchSnapshot()
    // screen.debug()
      // expect(fig).toBeInTheDocument();

  });

    test("renders a tree with branch baubles and nodes", () => {
     const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);")
    const fig =render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={rectangularLayout}
        baubles={[
          Branches({attrs:{strokeWidth:2,stroke:"black"}}),
          CircleNodes({filter:(n)=>tree.isExternal(n),attrs:{fill:"black",r:10}}),
          RectangleNodes({filter:(n)=>!tree.isExternal(n),attrs:{fill:"black",width:10,height:4}}),

        ]}
        />
      </svg>
    );
    
     expect(fig).toMatchSnapshot()
    // screen.debug()
      // expect(fig).toBeInTheDocument();

  });

      test("renders a tree with branch baubles and and functions", () => {
     const tree = ImmutableTree.fromNewick("((A:1,B:1):2,C:1);")
    const fig = render(
      <svg width="400px" height="400px" data-testid="figure" xmlns="http://www.w3.org/2000/svg">
        <FigTree 
        width={400} 
        height={400} 
        tree={tree}
        layout={rectangularLayout}
        baubles={[
          Branches({attrs:{strokeWidth:2,stroke:(n)=>"black"}}),
          CircleNodes({filter:(n)=>tree.isExternal(n),attrs:{fill:"black",r:n=>n.number}}),
          RectangleNodes({filter:(n)=>!tree.isExternal(n),attrs:{fill:"black",width:10,height:4}}),

        ]}
        />
      </svg>
    );
    
   expect(fig).toMatchSnapshot()
      // expect(fig).toBeInTheDocument();

  });
 
});

