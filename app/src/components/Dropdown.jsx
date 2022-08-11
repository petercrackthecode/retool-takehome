import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Dragbox from './Dragbox'

export default function Dropdown({
  id,
  component,
  options = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }],
}) {
  return (
    <Dragbox {...{ id, component }}>
      <div className="top-16 w-auto">
        <Menu as="div" className="relative inline-block text-left bg-white">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm border border-black font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Menu
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, id) => (
                <div className="px-1 py-1" key={`dropdown-item-${id}`}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-400 text-white' : 'text-gray-900'
                        } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm`}
                      >
                        {option.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </Dragbox>
  )
}
