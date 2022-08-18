import Dragbox from './Dragbox'

export default function TextInput({ id, component }) {
  const {
    Label = 'Name',
    Placeholder = 'Search here',
    size: { width, height },
  } = component
  const borderRadius = component['Border radius']
  return (
    <Dragbox {...{ id, component }}>
      <div
        className="flex flex-row items-center justify-between space-x-4"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <label htmlFor={`text-input-${id}`} style={{ width: width * 0.3 }}>
          {Label}
        </label>
        <input
          id={`text-input-${id}`}
          className="p-1"
          type="text"
          placeholder={Placeholder}
          name="text-input"
          style={{ width: width * 0.6, borderRadius }}
        />
      </div>
    </Dragbox>
  )
}
