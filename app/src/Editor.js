import React, { useContext, useRef, useEffect } from 'react'
import './Editor.css'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './components/Dropdown'
import Table from './components/Table'
import TextInput from './components/TextInput'
import Button from './components/Button'
import { DatabaseContext, AppState } from './context'

const COMPONENTS_LIST = [
  { name: 'Button', type: 'button' },
  { name: 'Text Input', type: 'text-input' },
  { name: 'Dropdown', type: 'dropdown' },
  { name: 'Table', type: 'table' },
]

export const EDITOR_PICKER_WIDTH = 320

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

function getDefaultComponentSize(_type, canvasWidth, canvasHeight) {
  switch (_type) {
    case 'button':
      return {
        width: (1 / 6) * canvasWidth,
        height: (3 / 48) * canvasHeight,
      }
    case 'text-input':
      return {
        width: (1 / 6) * canvasWidth,
        height: (3 / 48) * canvasHeight,
      }
    case 'dropdown':
      return {
        width: (1 / 6) * canvasWidth,
        height: (3 / 48) * canvasHeight,
      }
    case 'table':
      return {
        width: (2 / 3) * canvasWidth,
        height: (2 / 3) * canvasHeight,
      }
    default:
      return {
        width: (1 / 6) * canvasWidth,
        height: (3 / 48) * canvasHeight,
      }
  }
}

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
function EditorCanvas() {
  const refCanvas = useRef()
  const [components, setComponents] = useContext(DatabaseContext)
  const [appState, setAppState] = useContext(AppState)

  // console.log('components = ', components)
  // console.log('localStorage.getItem("components") = ', localStorage.getItem('components'))

  const updateCanvasSize = () => {
    if (refCanvas.current) {
      setAppState({
        ...appState,
        editorCanvas: {
          ...appState.editorCanvas,
          width: refCanvas.current.offsetWidth,
          height: refCanvas.current.offsetHeight,
        },
      })
    }
  }

  useEffect(() => {
    // get the canvas size on first page load
    updateCanvasSize()

    window.addEventListener('resize', updateCanvasSize)

    // remove the resize listener on unmount for performance
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <div
      className={`editor-canvas relative grid box-border overflow-y-auto ${
        appState.isShowingVisualGuide ? 'editor-canvas-visual-guide' : 'bg-slate-100'
      }`}
      ref={refCanvas}
    >
      {Object.keys(components).map((component_id) => (
        <DisplayComponent component_id={component_id} _component={components[component_id]} key={component_id} />
      ))}
    </div>
  )
}

const EditorPicker = () => {
  const [components, setComponents] = useContext(DatabaseContext)
  const [appState] = useContext(AppState)
  const addNewComponent = (_type, _name, canvasWidth, canvasHeight) => {
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
        size: getDefaultComponentSize(_type, canvasWidth, canvasHeight),
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
              className="rounded-lg border-2 border-blue-400 px hover:scale-[1.05] text-[10px]"
              key={`create-component-btn-${key}`}
              onClick={() =>
                addNewComponent(
                  component.type,
                  component.name,
                  appState.editorCanvas.width || window.innerWidth - EDITOR_PICKER_WIDTH,
                  appState.editorCanvas.height || window.innerHeight
                )
              }
            >
              {component.name}
            </button>
          ))}
        </div>
      </div>
      {/* <div className="add-components grid grid-cols-1 gap-2">
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
      </div> */}
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
