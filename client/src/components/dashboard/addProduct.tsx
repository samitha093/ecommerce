import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import Toast from "../modules/toast";

interface AddProductProps {
  onAddProduct: (product: Product) => void;
}

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


const AddProduct: React.FC<AddProductProps> = ({onAddProduct   }) => {
    const [productName, setProductName] = useState(''); // Initialize the product name state as an empty string
    const [id, setId] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [stockQTY, setStockQTY] = useState<number>(0);
    const [soldQTY, setSoldQTY] = useState<number>(0);
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
      const initialProduct: Product = {
        
        id: 0,
        name: '',
        description: '',
        categoryId: 0,
        price: 0,
        stockQTY: 0,
        soldQTY: 0,
        imageListId: '',
      };
      function generateRandomId() {
        const timestamp = Date.now(); // Get current timestamp
        const random = Math.random().toString().substr(2, 5); // Generate random number string
        return parseInt(`${timestamp}${random}`); // Combine timestamp and random number as integer
      }
      
      
      function handleAddNewProduct() {
        setId(generateRandomId());
          const productDetails = {
            id: id,
            name: productName,
            description: description,
            categoryId: categoryId,
            price: price,
            stockQTY: stockQTY,
            soldQTY: soldQTY,
            imageListId:""
          };
          console.log("New product");
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
