import React from "react";
import { BranchProps, Branches } from "@figtreejs/core";


//TODO update children to be called Baubles
export default function branchesRender(options:BranchProps){
        return React.createElement(Branches, options)
}