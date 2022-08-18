import { useContext } from 'react'
import Draggable from 'react-draggable'
import { DatabaseContext } from '../context'
import { AppState } from '../context'
import { EDITOR_PICKER_WIDTH } from '../Editor'

export default function Dragbox({ id, children, component }) {
  const [components, setComponents] = useContext(DatabaseContext)
  const [appState, setAppState] = useContext(AppState)
  const { type, position } = component

  const onControlDrag = (_, _position) => {
    const { x, y } = _position
    setComponents({ ...components, [id]: { ...component, position: { x, y } } })
  }

  const triggerComponentInspector = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAppState((prevAppState) => ({ ...prevAppState, isShowingComponentInspector: true, inspectedComponentId: id }))
  }

  return (
    <Draggable
      grid={[(window.innerWidth - EDITOR_PICKER_WIDTH) / 12, window.innerHeight / 12]}
      position={position}
      bounds={{ left: 0, right: window.innerWidth - EDITOR_PICKER_WIDTH - component.size.width }}
      onDrag={onControlDrag}
      onStart={() => setAppState({ ...appState, isShowingVisualGuide: true })}
      onStop={() => setAppState({ ...appState, isShowingVisualGuide: false })}
    >
      <div
        className="group relative flex flex-row justify-start w-min h-min px-1 py-2 border-2 border-transparent hover:border-blue-400 focus:border-blue-400 focus-within:border-blue-400 active:border-blue-400"
        onClick={(event) => triggerComponentInspector(event)}
      >
        <div className="drag-handle hidden group-hover:block group-focus:block group-active:block group-focus-within:border-blue-400 bg-blue-400 absolute bottom-full -left-0.5 cursor-move px-1 text-[0.7rem] text-white">
          &#x2800; {type}
        </div>
        {children}
      </div>
    </Draggable>
  )
}
