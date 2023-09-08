import './App.css';
import { Tree } from './features/Tree/tree';
import { SideBar } from './features/settings/sideBar';



//TODO make setting panel scroll
//TODO make setting subsection divider
function App() {
  return (
<div className='app'>
  <SideBar/>
  <Tree/>
</div>
  );
}

export default App;
