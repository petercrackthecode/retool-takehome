import Dragbox from './Dragbox'

export default function Button({ id, component }) {
  return (
    <Dragbox {...{ id, component }}>
      <button className="rounded-md bg-sky-600 text-white p-2 w-[100px]">Button</button>
    </Dragbox>
  )
}
