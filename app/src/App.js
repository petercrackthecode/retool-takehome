import React, { useState } from 'react'
import './App.css'

// You can split your components
import Editor from './Editor'

function App() {
  // components will be a map of components, where each component's key is defined by an uuid
  // key: component's id
  // value: component's info
  const [components, setComponents] = useState({})

  return (
    <div className="App">
      {/* Feel free to delete the header */}
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload. (Delete me if you like!)
        </p>
      </header>
      <Editor {...{ components, setComponents }} />
    </div>
  )
}

export default App
