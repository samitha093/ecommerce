import React from 'react';

  interface CategoryTableProps {
    categorys: Category[];
    removeCategoryById: (id: number) => void; // Correct type for the prop
    loadDataForUpdate: (category: Category) => void; // Correct type for the prop
  }

  interface Category {
    id: number;
    name: string;
    description: string;
  }
const CategoryTable: React.FC<CategoryTableProps> = ({ categorys,removeCategoryById,loadDataForUpdate }) => {

  return (
    <div className="relative overflow-x-auto">
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#001C30' }}>Store</h4>
      </div>
      <table className="w-full text-sm text-left text-black-900 dark:text-gray-900">
        <thead className="text-xs text-gray-100 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
              Category Id
            </th>
            <th scope="col" className="px-6 py-3">
              Category name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>

            <th scope="col" className="px-6 py-3">
             Edit
            </th>
            <th scope="col" className="px-6 py-3">
            Delete
            </th>           
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) => (
            <tr key={category.id} className="bg-white border-b dark:bg-gray-0 dark:border-gray-0">
            <td className="px-6 py-4">
                {category.id}
              </td>
              <td className="px-6 py-4">
                {category.name}
              </td>
              <td className="px-6 py-4">
                {category.description}
              </td>
              
              <td className="px-6 py-4">
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg" 
               onClick={() => loadDataForUpdate(category)}              
              >
               Edit</button>
              </td>
              <td className="px-6 py-4">
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg" 
                  onClick={() => removeCategoryById(category.id)}
              >
                Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
