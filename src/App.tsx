import './App.css';
import { Tree } from './features/Tree/tree';
import { TreePanel } from './features/Tree/treePanel';
import { SideBar } from './features/settings/sideBar';



//TODO make setting panel scroll
//TODO make setting subsection divider
function App() {
  return (
    <div className="  ">
    <div className="header">Finish header</div>
    <div className='app'>
      <SideBar/>
      <TreePanel/>
    </div>
    </div>

  );
}

export default App;
