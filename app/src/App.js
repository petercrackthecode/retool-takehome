import React from 'react'
import './App.css'

// You can split your components
import Editor from './Editor'
import { DatabaseProvider, AppStateProvider } from './context'

function App() {
  // components will be a map of components, where each component's key is defined by an uuid
  // key: component's id
  // value: component's info

  return (
    <DatabaseProvider>
      <AppStateProvider>
        <div className="App">
          <Editor />
        </div>
      </AppStateProvider>
    </DatabaseProvider>
  )
}

export default App
