import React from 'react'
import './Editor.css'
import Draggable from 'react-draggable'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './components/Dropdown'
import Table from './components/Table'
import TextInput from './components/TextInput'
import Button from './components/Button'

const COMPONENTS_LIST = [
  { name: 'Button', type: 'button' },
  { name: 'Text Input', type: 'text-input' },
  { name: 'Dropdown', type: 'dropdown' },
  { name: 'Table', type: 'table' },
]

function DisplayComponent({ component_id, _component }) {
  let component = null
  switch (_component.type) {
    case 'button':
      component = <Button />
      break
    case 'text-input':
      component = <TextInput />
      break
    case 'dropdown':
      component = <Dropdown />
      break
    case 'table':
      component = <Table />
      break
    default:
      break
  }

  if (_component.type !== 'dropdown') return <Draggable grid={[25, 25]}>{component}</Draggable>
  else return component
}

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
function EditorCanvas({ components, setComponents }) {
  return (
    <div className="editor-canvas scroll-auto">
      <h4> Put the drag and drop interface over here! </h4>
      <section className="p-5 grid gap-2 relative">
        {Object.keys(components).map((component_id) => (
          <Draggable grid={[25, 25]} key={component_id}>
            <DisplayComponent component_id={component_id} _component={components[component_id]} />
          </Draggable>
        ))}
      </section>
    </div>
  )
}

const EditorPicker = ({ components, setComponents }) => {
  const addNewComponent = (_type, _name) => {
    let component_id = null
    while (!component_id) {
      const new_id = uuidv4()
      component_id = components.hasOwnProperty(new_id) ? null : new_id
    }
    setComponents({
      ...components,
      [component_id]: {
        type: _type,
        name: _name,
      },
    })
  }

  return (
    <div className="editor-picker min-w-[400px] shrink-0 flex flex-col space-y-4">
      <div className="create-components grid grid-cols-1 gap-2">
        <h4 className="text-left font-bold">Clicking these buttons should create new components on the canvas </h4>
        <div className="components-btn grid grid-cols-4 gap-2">
          {COMPONENTS_LIST.map((component, key) => (
            <button
              className="rounded-lg border-2 border-blue-400 px hover:scale-[1.05]"
              key={`create-component-btn-${key}`}
              onClick={() => addNewComponent(component.type, component.name)}
            >
              Create a {component.name}
            </button>
          ))}
        </div>
      </div>
      <div className="add-components grid grid-cols-1 gap-2">
        <h4 className="text-left font-bold">Dragging a component to the canvas to add it</h4>
        <div className="components-btn grid grid-cols-4 gap-2">
          {COMPONENTS_LIST.map((component, key) => (
            <Draggable grid={[25, 25]} key={`drag-component-${key}`}>
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

const Editor = (props) => {
  return (
    <div className="editor flex flex-row">
      <EditorCanvas {...props} />
      <EditorPicker {...props} />
    </div>
  )
}

export default Editor
