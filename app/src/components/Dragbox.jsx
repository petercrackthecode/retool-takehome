import { useContext } from 'react'
import Draggable from 'react-draggable'
import { DatabaseContext } from '../context'

export default function Dragbox({ id, children, component }) {
  const [components, setComponents] = useContext(DatabaseContext)
  const { type, position } = component

  const onControlDrag = (_, _position) => {
    const { x, y } = _position
    setComponents({ ...components, [id]: { ...component, position: { x, y } } })
  }

  return (
    <Draggable grid={[25, 25]} position={position} handle=".drag-handle" onDrag={onControlDrag}>
      <div className="group relative flex flex-row justify-start w-min px-1 py-0.5 border-2 border-transparent hover:border-blue-400 focus:border-blue-400 focus-within:border-blue-400 active:border-blue-400">
        <div className="drag-handle hidden group-hover:block group-focus:block group-active:block group-focus-within:border-blue-400 bg-blue-400 absolute bottom-full -left-0.5 cursor-move px-1 text-[0.7rem] text-white">
          &#x2800; {type}
        </div>
        {children}
      </div>
    </Draggable>
  )
}
