import React, { useContext, useRef, useEffect } from 'react'
import './Editor.css'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './components/Dropdown'
import Table from './components/Table'
import TextInput from './components/TextInput'
import Button from './components/Button'
import { DatabaseContext, AppState } from './context'

// Beside name and type, all other props are component's default props values.
const COMPONENTS_LIST = {
  button: { name: 'Button', type: 'button', Text: 'Button', 'Border radius': '4px' },
  'text-input': {
    name: 'Text Input',
    type: 'text-input',
    Label: 'Name',
    'Border radius': '4px',
    Placeholder: 'Search here',
  },
  dropdown: { name: 'Dropdown', type: 'dropdown', Text: 'Name', 'Border radius': '4px' },
  table: { name: 'Table', type: 'table', 'Border radius': '4px' },
}

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

function getComponentImage(component_type) {
  let imageUrl = ''
  switch (component_type) {
    case 'button':
      imageUrl =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNi41IiB5PSIxNS41IiB3aWR0aD0iMzYiIGhlaWdodD0iMTciIHJ4PSIzLjUiIGZpbGw9IiM0QUExRUQiIHN0cm9rZT0iIzRBQTFFRCIvPjxwYXRoIGQ9Im0xMi42ODQgMjcgLjQzMi0xLjMyN2gyLjFMMTUuNjQ3IDI3aDEuMzE5bC0yLjAwNi01LjgxOGgtMS41ODVMMTEuMzY2IDI3aDEuMzE4Wm0uNzQ1LTIuMjg3LjcxNi0yLjIwMmguMDQ1bC43MTYgMi4yMDJoLTEuNDc3Wm01Ljk4MyAyLjM3MmMxLjE2MiAwIDEuODkyLS42ODIgMS45NDgtMS42ODRoLTEuMTQyYy0uMDcuNDY1LS4zNzcuNzI3LS43OTIuNzI3LS41NjYgMC0uOTMyLS40NzUtLjkzMi0xLjMxIDAtLjgyNC4zNy0xLjI5NS45MzItMS4yOTUuNDQzIDAgLjcyNy4yOTIuNzkyLjcyN2gxLjE0MmMtLjA1LTEuMDA5LS44MTUtMS42Ny0xLjk1NC0xLjY3LTEuMzI0IDAtMi4xNDIuOTE3LTIuMTQyIDIuMjU1IDAgMS4zMjcuODA0IDIuMjUgMi4xNDggMi4yNVptNS4wNDQtNC40NDloLS44MnYtMS4wNDVoLTEuMjF2MS4wNDVoLS41OTh2LjkxaC41OTd2Mi4yNzJjLS4wMDYuODU1LjU3NyAxLjI3OSAxLjQ1NSAxLjI0Mi4zMTItLjAxMi41MzQtLjA3NC42NTYtLjExNGwtLjE5LS45Yy0uMDYuMDEtLjE4OC4wNC0uMzAyLjA0LS4yNDEgMC0uNDA5LS4wOTItLjQwOS0uNDI3di0yLjExM2guODIxdi0uOTFaTTI1LjI0NSAyN2gxLjIxdi00LjM2NGgtMS4yMVYyN1ptLjYwOC00LjkyNmMuMzYgMCAuNjU2LS4yNzYuNjU2LS42MTQgMC0uMzM1LS4yOTYtLjYxLS42NTYtLjYxLS4zNTggMC0uNjU0LjI3NS0uNjU0LjYxIDAgLjMzOC4yOTYuNjE0LjY1NC42MTRabTMuNTQzIDUuMDExYzEuMzI0IDAgMi4xNDgtLjkwNiAyLjE0OC0yLjI1IDAtMS4zNTItLjgyNC0yLjI1Ni0yLjE0OC0yLjI1Ni0xLjMyNCAwLTIuMTQ4LjkwNC0yLjE0OCAyLjI1NiAwIDEuMzQ0LjgyNCAyLjI1IDIuMTQ4IDIuMjVabS4wMDYtLjkzN2MtLjYxMSAwLS45MjQtLjU2LS45MjQtMS4zMjEgMC0uNzYyLjMxMy0xLjMyNC45MjQtMS4zMjQuNiAwIC45MTIuNTYyLjkxMiAxLjMyNCAwIC43NjEtLjMxMyAxLjMyLS45MTIgMS4zMlptNC4xMzktMS42N2MuMDAzLS41NjMuMzM4LS44OTMuODI3LS44OTMuNDg1IDAgLjc3OC4zMTguNzc1Ljg1MlYyN2gxLjIxdi0yLjc3OGMwLTEuMDE4LS41OTYtMS42NDMtMS41MDUtMS42NDMtLjY0OCAwLTEuMTE3LjMxOS0xLjMxMy44MjdoLS4wNTF2LS43N2gtMS4xNTNWMjdoMS4yMXYtMi41MjNaIiBmaWxsPSIjZmZmIi8+PC9zdmc+Cg=='
      break
    case 'text-input':
      imageUrl =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDExSDZhMiAyIDAgMCAwLTIgMnY0TTM4IDM4aDRhMiAyIDAgMCAwIDItMnYtNE00NCAxN3YtNGEyIDIgMCAwIDAtMi0yaC00TTQgMzJ2NGEyIDIgMCAwIDAgMiAyaDQiIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIHN0cm9rZT0iI0Q4RDhEOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yOCAxN2gxMU0yOCAyMmgxMU05IDI4aDMwTTkgMzNoMjQiLz48cGF0aCBkPSJNOC42MjIgMTUuODQ0VjIzaDEuNDY4di00LjY3NWguMDU5bDEuODUyIDQuNjRoMWwxLjg1MS00LjYyM2guMDZWMjNoMS40Njd2LTcuMTU2aC0xLjg2NmwtMS45NyA0LjgwOGgtLjA4NGwtMS45NzEtNC44MDhIOC42MjJaIiBmaWxsPSIjOEU4RThFIi8+PHBhdGggZD0iTTIxLjAwNiAxNnY3bTAgMEwyNCAyMG0tMi45OTQgM0wxOCAyMCIgc3Ryb2tlPSIjOEU4RThFIiBzdHJva2Utd2lkdGg9IjEuNCIvPjwvc3ZnPgo='
      break
    case 'dropdown':
      imageUrl =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMTMuOCIgeT0iMTUuOCIgd2lkdGg9IjE4LjQiIGhlaWdodD0iMTcuNCIgcng9IjMuMiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIGQ9Ik0xOS4yODkgMjUuOTMyYTEuMjUgMS4yNSAwIDEgMCAwLTIuNSAxLjI1IDEuMjUgMCAwIDAgMCAyLjVaTTIzIDI1LjkzMmExLjI1IDEuMjUgMCAxIDAgMC0yLjUgMS4yNSAxLjI1IDAgMCAwIDAgMi41Wk0yNi43MSAyNS45MzJhMS4yNSAxLjI1IDAgMSAwIDAtMi41IDEuMjUgMS4yNSAwIDAgMCAwIDIuNVoiIGZpbGw9IiNCMkIyQjIiLz48L3N2Zz4K'
      break
    case 'table':
      imageUrl =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQzIDM4SDVWMTdhMSAxIDAgMCAxIDEtMWgzNmExIDEgMCAwIDEgMSAxdjIxWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01IDM1aDM4djFhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJ2LTFaIiBmaWxsPSIjREVERURFIi8+PHBhdGggZD0iTTEyIDM4VjExTTI4IDM4VjExTTUgMjJoMzhNNSAyOWgzOE0yMCAzOFYxMU0zNiAzOFYxMSIgc3Ryb2tlPSIjREVERURFIiBzdHJva2Utd2lkdGg9IjEuNiIvPjxwYXRoIGQ9Ik00MyAxNkg1di01YTEgMSAwIDAgMSAxLTFoMzZhMSAxIDAgMCAxIDEgMXY1WiIgZmlsbD0iI0RFREVERSIvPjxyZWN0IHg9IjQuOCIgeT0iMTAuOCIgd2lkdGg9IjM4LjQiIGhlaWdodD0iMjcuNCIgcng9IjIuMiIgc3Ryb2tlPSIjNzU3NTc1IiBzdHJva2Utd2lkdGg9IjEuNiIvPjwvc3ZnPgo='
      break
    default:
      break
  }

  return imageUrl
}

function getComponentRelatedProps(component_type, _component) {
  // filter out the props that are commonly shared by every component
  let filteredUnrelatedPropsComponents = {}
  const componentEntries = Object.entries(_component ? _component : COMPONENTS_LIST[component_type])
  const commonlySharedProps = new Set(['type', 'name', 'size', 'position'])

  for (let [key, value] of componentEntries) {
    if (!commonlySharedProps.has(key)) {
      filteredUnrelatedPropsComponents[key] = value
    }
  }

  return filteredUnrelatedPropsComponents
}

// This is a functional component, which is an alternative to the class based syntax found in the App.js file
function EditorCanvas() {
  const refCanvas = useRef()
  const [components, setComponents] = useContext(DatabaseContext)
  const [appState, setAppState] = useContext(AppState)

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

  const updateComponentsSize = () => {
    if (components) {
      function getNewComponentsSize(prevComponents) {
        let newComponents = {}
        Object.keys(prevComponents).forEach((key) => {
          newComponents[key] = {
            ...prevComponents[key],
            size: getDefaultComponentSize(
              prevComponents[key].type,
              appState?.editorCanvas?.width || window.innerWidth - EDITOR_PICKER_WIDTH,
              appState?.editorCanvas?.height || window.innerHeight
            ),
          }
        })
        return newComponents
      }

      setComponents((prevComponents) => getNewComponentsSize(prevComponents))
    }
  }

  useEffect(() => {
    // get the canvas size on first page load
    updateCanvasSize()

    window.addEventListener('resize', updateCanvasSize)
    window.addEventListener('resize', updateComponentsSize)

    // remove the resize listener on unmount for performance
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      window.removeEventListener('resize', updateComponentsSize)
    }
  }, [])

  return (
    <div
      className={`editor-canvas relative grid p-2 box-border overflow-y-auto ${
        appState.isShowingVisualGuide ? 'editor-canvas-visual-guide' : 'bg-slate-100'
      }`}
      ref={refCanvas}
      onClick={(_) =>
        setAppState((prevAppState) => ({
          ...prevAppState,
          isShowingComponentInspector: false,
          inspectedComponentId: null,
        }))
      }
    >
      {Object.keys(components).map((component_id) => (
        <DisplayComponent component_id={component_id} _component={components[component_id]} key={component_id} />
      ))}
    </div>
  )
}

const EditorPicker = () => {
  const [components, setComponents] = useContext(DatabaseContext)
  const [appState, setAppState] = useContext(AppState)

  const addNewComponent = (_type, _name, canvasWidth, canvasHeight) => {
    let component_id = null
    while (!component_id) {
      const new_id = uuidv4()
      component_id = components.hasOwnProperty(new_id) ? null : new_id
    }
    setComponents({
      ...components,
      [component_id]: {
        ...getComponentRelatedProps(_type),
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

  const handleComponentPropsChange = ({ event, component_id, field }) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [component_id]: {
        ...prevComponents[component_id],
        [field]: event.target.value,
      },
    }))
  }

  const getInspectionList = () => {
    if (!appState.inspectedComponentId)
      return (
        <div className="border-dashed border-2 border-gray-100 text-gray-400">
          No components selected. Click on a component to select it.
        </div>
      )

    const selectedComponent = components[appState.inspectedComponentId]

    return (
      <div className="w-full flex flex-col divide-y border border-gray-300 rounded-md">
        {Object.entries(getComponentRelatedProps(selectedComponent.type, selectedComponent)).map(
          ([_key, _value], id) => (
            <div key={id} className="w-full p-2 flex flex-row justify-between space-x-4">
              <label className="w-1/2 text-left">{_key}</label>
              <input
                className="w-1/2 text-left"
                type="text"
                value={_value}
                onChange={(event) =>
                  handleComponentPropsChange({ event, component_id: appState.inspectedComponentId, field: _key })
                }
              />
            </div>
          )
        )}
      </div>
    )
  }

  return (
    <div className="editor-picker shrink-0 flex flex-col space-y-4 m-0">
      <div className="editor-picker-header w-full h-[40px] bg-gray-100 flex flex-row items-center justify-center space-x-4">
        <button
          className={`${
            appState.isShowingComponentInspector ? 'text-black' : 'text-slate-400 hover:text-slate-700'
          } text-sm h-full relative`}
          onClick={() => setAppState((prevAppState) => ({ ...prevAppState, isShowingComponentInspector: true }))}
        >
          Inspect
          <span
            className={`absolute inset-x-0 bottom-0 h-[2px] bg-black ${
              appState.isShowingComponentInspector ? 'block' : 'hidden'
            }`}
          />
        </button>
        <button
          className={`${
            !appState.isShowingComponentInspector ? 'text-black' : 'text-slate-400 hover:text-slate-700'
          } text-sm h-full relative`}
          onClick={() => setAppState((prevAppState) => ({ ...prevAppState, isShowingComponentInspector: false }))}
        >
          Create
          <span
            className={`absolute inset-x-0 bottom-0 h-[2px] bg-black ${
              !appState.isShowingComponentInspector ? 'block' : 'hidden'
            }`}
          />
        </button>
      </div>
      {appState.isShowingComponentInspector ? (
        <div className="px-4">{getInspectionList()}</div>
      ) : (
        <div className="create-components grid grid-cols-1 gap-2 px-4">
          <div className="components-btn grid grid-cols-4 gap-2">
            {Object.keys(COMPONENTS_LIST).map((_type, key) => (
              <div key={`create-component-btn-${key}`} className="flex flex-col space-y-2">
                <button
                  className="rounded-lg border bg-gray-100 p-2 hover:scale-[1.05] text-[10px]"
                  onClick={() =>
                    addNewComponent(
                      _type,
                      COMPONENTS_LIST[_type].name,
                      appState.editorCanvas.width || window.innerWidth - EDITOR_PICKER_WIDTH,
                      appState.editorCanvas.height || window.innerHeight
                    )
                  }
                >
                  <img src={getComponentImage(_type)} alt={`${_type} button`} />
                </button>
                <p className="text-[12px]">{COMPONENTS_LIST[_type].name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
