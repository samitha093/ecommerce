import React from 'react';


  interface ProductTableProps {
    products: Product[];
    removeProductById: (id: number) => void; 
    loadDataForUpdate: (product: Product) => void; 
   
  }

  interface Image {
    id: number;
    imageName: string;
    contentType: string;
    imageData: string; 
  }
  
  interface Product {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    stockQTY: number;
    soldQTY: number;
    imageListId: Image[]; 
  }
  
const ProductTable: React.FC<ProductTableProps> = ({ products,removeProductById,loadDataForUpdate }) => {

  return (
    <div className="relative overflow-x-auto">
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#001C30' }}>Store</h4>
      </div>
      <table className="w-full text-sm text-left text-black-900 dark:text-gray-900">
        <thead className="text-xs text-gray-100 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-400">
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
              Item
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
            <tr key={product.id} className="bg-white border-b dark:bg-gray-0 dark:border-gray-0">
              <td className="px-6 py-4">
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
              {product.imageListId.map((image) => (
                <img key={image.id} src={image.imageData} alt={image.imageName} className="w-100 h-10" />
              ))}
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
