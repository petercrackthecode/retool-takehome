import Dragbox from './Dragbox'

export default function Button({ id, component }) {
  const {
    size: { width, height },
  } = component
  const borderRadius = component['Border radius'],
    Text = component.Text

  return (
    <Dragbox {...{ id, component }}>
      <button
        className="rounded-md bg-sky-600 text-white"
        style={{ width: `${width}px`, height: `${height}px`, borderRadius }}
      >
        {Text}
      </button>
    </Dragbox>
  )
}
