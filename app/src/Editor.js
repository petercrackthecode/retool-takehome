import React from 'react'
import './Editor.css'
import Draggable from 'react-draggable'

const COMPONENTS_LIST = [{ name: 'Button' }, { name: 'Text Input' }, { name: 'Dropdown' }, { name: 'Table' }]

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
const EditorCanvas = props => {
  return (
    <div className="editor-canvas">
      <h4> Put the drag and drop interface over here! </h4>
    </div>
  )
}

const EditorPicker = props => {
  return (
    <div className="editor-picker min-w-[400px] shrink-0 flex flex-col space-y-4">
      <div className="create-components grid grid-cols-1 gap-2">
        <h4 className="text-left font-bold"> Clicking these buttons should create new components on the canvas </h4>
        <div className="components-btn grid grid-cols-4 gap-2">
          {COMPONENTS_LIST.map(component => (
            <button className="rounded-lg border-2 border-blue-400 px hover:scale-[1.05]">
              Create a {component.name}
            </button>
          ))}
        </div>
      </div>
      <div className="add-components grid grid-cols-1 gap-2">
        <h4 className="text-left">Dragging a component to the canvas to add it</h4>
        <div className="components-btn grid grid-cols-4 gap-2">
          {COMPONENTS_LIST.map(component => (
            <Draggable>
              <button className="rounded-lg border-2 border-blue-400 px hover:scale-[1.05] cursor-grab active:cursor-grabbing">
                {component.name}
              </button>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  )
}

const Editor = props => {
  return (
    <div className="editor flex flex-row">
      <EditorCanvas />
      <EditorPicker />
    </div>
  )
}

export default Editor
