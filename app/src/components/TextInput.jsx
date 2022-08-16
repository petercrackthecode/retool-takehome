import Dragbox from './Dragbox'

export default function TextInput({ id, component }) {
  const {
    label = 'Name',
    placeholder = 'Search here',
    size: { width, height },
  } = component
  return (
    <Dragbox {...{ id, component }}>
      <div
        className="flex flex-row items-center justify-between space-x-4"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <label htmlFor={`text-input-${id}`} style={{ width: width * 0.3 }}>
          {label}
        </label>
        <input
          id={`text-input-${id}`}
          className="p-1"
          type="text"
          placeholder={placeholder}
          name="text-input"
          style={{ width: width * 0.6 }}
        />
      </div>
    </Dragbox>
  )
}
