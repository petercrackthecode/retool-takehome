import Dragbox from './Dragbox'

export default function TextInput({ id, component }) {
  const { label = 'Name', placeholder = 'Search here' } = component
  return (
    <Dragbox {...{ id, component }}>
      <form className="flex flex-row items-center space-x-4">
        <label htmlFor={`text-input-${id}`}>{label}</label>
        <input id={`text-input-${id}`} className="p-1 w-fit" type="text" placeholder={placeholder} name="text-input" />
      </form>
    </Dragbox>
  )
}