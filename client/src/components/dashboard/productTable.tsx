import React from 'react';



interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  stockQTY: number;
  soldQTY: number;
  imageListId:string
}
  
  interface ProductTableProps {
    products: Product[];
    removeProductById: (id: number) => void; // Correct type for the prop
    loadDataForUpdate: (product: Product) => void; // Correct type for the prop
   
  }

const ProductTable: React.FC<ProductTableProps> = ({ products,removeProductById,loadDataForUpdate }) => {

  return (
    <div className="relative overflow-x-auto">
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#001C30' }}>All Product</h4>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category Id
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Stock Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Sold Quantity
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
          {products.map((product) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4">
                {product.description}
              </td>
              <td className="px-6 py-4">
                {product.categoryId}
              </td>
              <td className="px-6 py-4">
                ${product.price}
              </td>
              <td className="px-6 py-4">
                {product.stockQTY}
              </td>
              <td className="px-6 py-4">
                {product.soldQTY}
              </td>
              <td className="px-6 py-4">
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg" 
               onClick={() => loadDataForUpdate(product)}
              
              >
                        Edit</button>
              </td>
              <td className="px-6 py-4">
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg" 
                  onClick={() => removeProductById(product.id)}

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

export default ProductTable;
