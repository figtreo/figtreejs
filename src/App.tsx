import './App.css';
import { Tree } from './features/Tree/tree';
import { SideBar } from './features/settings/sideBar';



//TODO make setting panel scroll
//TODO make setting subsection divider
function App() {
  return (
    <div className="  ">
    <div className="header">Finish header</div>
    <div className='app'>
      <SideBar/>
      <Tree/>
    </div>
    </div>

  );
}

export default App;
