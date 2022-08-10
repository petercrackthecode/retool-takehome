import React from 'react'
import './Editor.css'
import Draggable from 'react-draggable'
import { v4 as uuidv4 } from 'uuid'

const COMPONENTS_LIST = [
  { name: 'Button', type: 'btn' },
  { name: 'Text Input', type: 'text-input' },
  { name: 'Dropdown', type: 'dropdown' },
  { name: 'Table', type: 'table' },
]

function Dropdown() {
  return <div />
}

function DisplayComponent({ component_id, _component }) {
  let component = null
  switch (_component.type) {
    case 'btn':
      component = <button className="rounded-md bg-sky-600 text-white p-2 w-[100px]">Button</button>
      break
    case 'text-input':
      component = <input type="text" placeholder="👋 Hello Peter!" />
      break
    case 'dropdown':
      component = <Dropdown />
      break
    case 'table':
      component = (
        <div className="overflow-auto">
          <table>
            <tr className="odd:bg-white even:bg-slate-50">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Points</th>
            </tr>
            <tr className="odd:bg-white even:bg-slate-50">
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr className="odd:bg-white even:bg-slate-50">
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
            <tr className="odd:bg-white even:bg-slate-50">
              <td>Adam</td>
              <td>Johnson</td>
              <td>67</td>
            </tr>
          </table>
        </div>
      )
      break
    default:
      break
  }
  return <Draggable>{component}</Draggable>
}

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
function EditorCanvas({ components, setComponents }) {
  return (
    <div className="editor-canvas">
      <h4> Put the drag and drop interface over here! </h4>
      <section className="p-5 flex gap-2">
        {Object.keys(components).map((component_id) => (
          <Draggable key={component_id}>
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
        <h4 className="text-left font-bold"> Clicking these buttons should create new components on the canvas </h4>
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
        <h4 className="text-left">Dragging a component to the canvas to add it</h4>
        <div className="components-btn grid grid-cols-4 gap-2">
          {COMPONENTS_LIST.map((component, key) => (
            <Draggable key={`drag-component-${key}`}>
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
