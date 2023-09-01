import React from 'react';
interface TrasactionsTableProps {
    categorys: ProductCart[];
   
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
  
  interface ProductCart extends Product {
    isSelected: boolean;
    totalPrice : number;
    selectedQTY : number;
  }
 

const CartItemsTable: React.FC<TrasactionsTableProps> = ({ categorys }) => {
    

    return (
        <div className="relative overflow-x-auto">
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: '#001C30' }}>Store</h4>
      </div>
      <table className="w-full text-sm text-left text-black-900 dark:text-gray-900">
        <thead className="text-xs text-gray-100 uppercase bg-gray-100 dark:bg-gray-200 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
              Item Id
            </th>
            <th scope="col" className="px-6 py-3">
              Item name
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Unit pricee
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
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
              {category.imageListId.map((image) => (
                <img key={image.id} src={image.imageData} alt={image.imageName} className="w-100 h-10" />
              ))}

              </td>
              <td className="px-6 py-4">
                {category.selectedQTY}
              </td>
              <td className="px-6 py-4">
                {category.price}
              </td>
              <td className="px-6 py-4">
                {category.totalPrice}
              </td>
              <td className="px-6 py-4">
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg" 
            //    onClick={() => loadDataForUpdate(category)}              
              >
               Edit</button>
              </td>
              <td className="px-6 py-4">
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg" 
                //   onClick={() => removeCategoryById(category.id)}
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

export default CartItemsTable;
