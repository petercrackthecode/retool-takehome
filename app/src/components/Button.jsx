import Dragbox from './Dragbox'

export default function Button({ id, component }) {
  const {
    size: { width, height },
  } = component

  return (
    <Dragbox {...{ id, component }}>
      <button className="rounded-md bg-sky-600 text-white" style={{ width: `${width}px`, height: `${height}px` }}>
        Button
      </button>
    </Dragbox>
  )
}
