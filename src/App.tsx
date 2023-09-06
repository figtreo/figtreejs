import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';

import './App.css';
import { Tree } from './features/Tree/tree';
import { Layout } from './features/settings/layout/layout';
import { Branches, FigTree, Nodes } from './features/Figtree';
import {  parseNewick } from './features/Tree/parsing/TreeParser';
import { Appearance } from './features/settings/appearance/appearance';
const margins={top:10,bottom:10,left:10,right:10};
const newickString =	
    '((((((virus1:0.1,virus2:0.12)0.95:0.08,(virus3:0.011,virus4:0.0087)1.0:0.15)0.65:0.03,virus5:0.21)1.0:0.2,(virus6:0.45,virus7:0.4)0.51:0.02)1.0:0.1,virus8:0.4)1.0:0.1,(virus9:0.04,virus10:0.03)1.0:0.6);';
const tree = parseNewick(newickString);	



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tree/>
        <Layout/>
        <Appearance/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
        </span>
      </header>
    </div>
  );
}

export default App;
