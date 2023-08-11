import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import Toast from "../modules/toast";

interface AddProductProps {
  onAddProduct: (product: Product) => void;
}

interface Product {

  name: string;
  description: string;
  categoryId: number;
  price: number;
  stockQuantity: number;
  soldQuantity: number;
}


const AddProduct: React.FC<AddProductProps> = ({onAddProduct   }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [stockQTY, setStockQTY] = useState('');
    const [soldQTY, setSoldQTY] = useState('');
    const [imageListId, setImageListId] = useState('');

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      };
      const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
      };
      const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
      };
      const handlePriceChange = (event: any) => {
        setPrice(event.target.value);
      };
      const handleCategoryIdChange = (event: any) => {
        setCategoryId(event.target.value);
      };
      const handlesetStockQTYChange = (event: any) => {
        setStockQTY(event.target.value);
      };
      const handlesetSoldQTYChange = (event: any) => {
        setSoldQTY(event.target.value);
      };
      function handleAddNewProduct() {
  
  
          const productDetails = {
            name: productName,
            description: description,
            categoryId: categoryId,
            price: price,
            stockQuantity: stockQTY,
            soldQuantity: soldQTY,
          };
          console.log(productDetails);
          onAddProduct(productDetails); // Call the onAddProduct function with the new product details

          const myHost = sessionStorage.getItem('host');
          axios
            .post(`${myHost}/api/v1/products/addnewproduct`, productDetails)
            .then((response) => {
              if(response.status == 200){
                Toast.fire({
                  icon: 'success',
                  title: 'New product added successfully'
                })
                
              }
              else{
                Toast.fire({
                  icon: 'error',
                  title: 'Can not add new product'
                })
              }
    
            })
            .catch(() => {
                Toast.fire({
                  icon: 'error',
                  title: 'Can not add new product'
                })
            });
      }

    return (
        <div className="grid grid-cols-2 gap-0 content-center ..." >
        <div style={containerStyle}>
          <div className="h-56 grid grid-cols-1 gap-0 mt-0">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '25px', fontWeight: 'bold',textAlign:'center', color: '#001C30' }}>Add Product</h3>
            </div>
  
            <div className="mt-1 ">
              <input
                placeholder="Product Name"
                type="text"
                value={productName}
                onChange={handleProductNameChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Description"
                type="text"
                value={description}
                onChange={handleDescriptionChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Category Id"
                type="text"
                value={categoryId}
                onChange={handleCategoryIdChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Price"
                type="text"
                value={price}
                onChange={handlePriceChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Stock Quantity"
                type="text"
                value={stockQTY}
                onChange={handlesetStockQTYChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>
            <div className="mt-1">
              <input
                placeholder="Sold Quantity"
                type="text"
                value={soldQTY}
                onChange={handlesetSoldQTYChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>
    
            <div style={{ textAlign: 'center' }} className="mt-8">
            <button
            onClick={handleAddNewProduct}
              style={{ padding: '15px', width: '130px' }}
              className={`text-white font-bold py-2 px-4 rounded ${true ? 'bg-blue-900 hover:bg-green-700' : 'bg-gray-400'}`}   
            >
              Add
            </button>
          </div>
          </div>
        </div>
      </div>
                    
    );
};

export default AddProduct;
