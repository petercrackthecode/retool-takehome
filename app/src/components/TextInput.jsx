import Dragbox from './Dragbox'

export default function TextInput() {
  return (
    <Dragbox type="text-input">
      <input className="p-1 w-fit" type="text" placeholder="Text Input" value="👋 Hello Peter!" />
    </Dragbox>
  )
}
