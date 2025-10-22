# Figtreejs
Figtreejs aims to bring phylogenetic visualization to the browser. 
The goal is to support small and large applications alike and make the power and fun of playing with tree visualizations accessible to researchers with little to no experience in web design. 


## Organization
Figtreejs is packaged into two separate packages. 

The core package provides all the infrastructure to manipulate phylogenetic trees and build visualizations in a react framework. 
The package is intended for large react based projects or small projects that want to use the tree classes and layouts, but want to use separate methods for building visualizations.
We have built a reimplementation of the original figtree to show the utility of this package. 
To see it inaction run `npm install` followed by `npm run dev` from the main directory.



The browser package wraps the core package and provides non jsx apis for use outside of a react project. 
This package is useful in stand alone html pages or can be used in an observable notebook/framework.




## Acknowledgements 
This repo is based on [https://github.com/rambaut/figtree.js/](https://github.com/rambaut/figtree.js/) and lessons learned from [https://github.com/jtmccr1/figtreejs-react](https://github.com/jtmccr1/figtreejs-react). But most of all it is inspired by the original [figtree](https://github.com/rambaut/figtree).

