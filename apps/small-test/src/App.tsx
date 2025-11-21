import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CircleNodes,ImmutableTree,FigTree,rectangularLayout,polarLayout} from "@figtreejs/core"

const tree = ImmutableTree.fromNewick('((A:1,B:1):1,C:1);')
// const n = CircleNodes({attrs:{r:5}})

function App() {
  const [count, setCount] = useState(0)
  const layout = count%2==0?rectangularLayout:polarLayout
  // const n = CircleNodes({attrs:{r:5*count}})
  const n = CircleNodes({attrs:{r:5}})

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <svg width={400} height={300}>
          <FigTree
            width={400}
            height={300}
            tree={tree}
            baubles={[n]}
            layout={layout}
            animated={true}
          />
        </svg>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
