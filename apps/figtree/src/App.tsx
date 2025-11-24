import './App.css';
import { Header } from './features/header/header';
import { TreePanel } from './features/tree/tree-panel';
import { SideBar } from './features/settings/sideBar';



//TODO make setting panel scroll
//TODO make setting subsection divider
function App() {
  return (
    <div className="  ">
      <Header/>
    <div className='app'>
      <SideBar/>
      <TreePanel/>
    </div>
    </div>

  );
}

export default App;
