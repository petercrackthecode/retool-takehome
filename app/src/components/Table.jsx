import Dragbox from './Dragbox'

export default function Table({ id, component }) {
  return (
    <Dragbox {...{ id, component }}>
      <div className="w-fit">
        <table className="table-auto overflow-auto border rounded-lg border-slate-300 border-spacing-2 w-full">
          <thead className="border">
            <tr className="odd:bg-white even:bg-gray-100 p-4">
              <th className="text-left py-2 px-4">id</th>
              <th className="text-left py-2 px-4">email</th>
              <th className="text-left py-2 px-4">first_name</th>
              <th className="text-left py-2 px-4">last_name</th>
              <th className="text-left py-2 px-4">created_at</th>
              <th className="text-left py-2 px-4">updated_at</th>
              <th className="text-left py-2 px-4">active</th>
              <th className="text-left py-2 px-4">feature_flags</th>
              <th className="text-left py-2 px-4">trial_expiry_date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">10</td>
              <td className="py-2 px-4">rosemary@tryretool.com</td>
              <td className="py-2 px-4">Rosemary</td>
              <td className="py-2 px-4">Rogers</td>
              <td className="py-2 px-4">Dec 10, 2018 9:13 AM</td>
              <td className="py-2 px-4">August 6, 2022 5:08 AM</td>
              <td className="py-2 px-4">true</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">Mar 20, 2019</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">4</td>
              <td className="py-2 px-4">louis@competitor.com</td>
              <td className="py-2 px-4">Louis</td>
              <td className="py-2 px-4">Reasoner</td>
              <td className="py-2 px-4">Dec 4, 2018 3:13 AM</td>
              <td className="py-2 px-4">August 6, 2022 5:08 AM</td>
              <td className="py-2 px-4">false</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">Mar 10, 2019</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">12</td>
              <td className="py-2 px-4">eva.noyce@tryretool.com</td>
              <td className="py-2 px-4">Eva</td>
              <td className="py-2 px-4">Noyce</td>
              <td className="py-2 px-4">Dec 12, 2018 11:13 AM</td>
              <td className="py-2 px-4">August 6, 2022 5:08 AM</td>
              <td className="py-2 px-4">true</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">Mar 12, 2019</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">8</td>
              <td className="py-2 px-4">roger@tryretool.com</td>
              <td className="py-2 px-4">Roger</td>
              <td className="py-2 px-4">Moore</td>
              <td className="py-2 px-4">Dec 08, 2018 7:13 AM</td>
              <td className="py-2 px-4">August 6, 2022 5:08 AM</td>
              <td className="py-2 px-4">true</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">Mar 20, 2019</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dragbox>
  )
}
