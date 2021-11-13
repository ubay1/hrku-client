import React from 'react'

const ListTable = ({ list }: any) => {
  console.log('render child list data')

  return (
    <div className='h-72 overflow-x-auto mt-4 mb-4 rounded-lg shadow-md'>
      <table className='bg-red-300 w-full'>
        <tbody>
          {list.map((item: any) => (
            <tr key={`list ${item.name} - ${item.id}`}>
              <td className='p-3 border-red-600 border-b'>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ListTable);