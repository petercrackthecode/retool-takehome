import React, { useContext } from 'react'
import './Editor.css'
import Draggable from 'react-draggable'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './components/Dropdown'
import Table from './components/Table'
import TextInput from './components/TextInput'
import Button from './components/Button'
import { DatabaseContext } from './context'

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
      component = <Button {...{ id: component_id, component: _component }} />
      break
    case 'text-input':
      component = <TextInput {...{ id: component_id, component: _component }} />
      break
    case 'dropdown':
      component = <Dropdown {...{ id: component_id, component: _component }} />
      break
    case 'table':
      component = <Table {...{ id: component_id, component: _component }} />
      break
    default:
      break
  }

  return component
}

function getDefaultComponentSize(_type) {
  switch (_type) {
    case 'button':
      return {
        width: 150,
        height: 40,
      }
    case 'text-input':
      return {
        width: 250,
        height: 50,
      }
    case 'dropdown':
      return {
        width: 150,
        height: 40,
      }
    case 'table':
      return {
        width: 600,
        height: 200,
      }
    default:
      return {
        width: 100,
        height: 50,
      }
  }
}

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
function EditorCanvas() {
  const [components, setComponents] = useContext(DatabaseContext)
  // console.log('components = ', components)
  // console.log('localStorage.getItem("components") = ', localStorage.getItem('components'))

  return (
    <div className="editor-canvas relative grid bg-slate-100 box-border overflow-y-auto">
      {Object.keys(components).map((component_id) => (
        <DisplayComponent component_id={component_id} _component={components[component_id]} />
      ))}
    </div>
  )
}

const EditorPicker = () => {
  const [components, setComponents] = useContext(DatabaseContext)
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
        position: {
          x: 0,
          y: 0,
        },
        size: getDefaultComponentSize(_type),
      },
    })
  }

  return (
    <div className="editor-picker shrink-0 flex flex-col space-y-4 m-0">
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
          {COMPONENTS_LIST.map((_component, key) => (
            <Draggable grid={[25, 25]} key={`drag-component-${key}`}>
              <button className="rounded-lg border-2 border-blue-400 px hover:scale-[1.05] cursor-grab active:cursor-grabbing">
                {_component.name}
              </button>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  )
}

const Editor = () => {
  return (
    <div className="editor flex flex-row">
      <EditorCanvas />
      <EditorPicker />
    </div>
  )
}

export default Editor
