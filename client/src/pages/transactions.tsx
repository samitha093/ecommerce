import React, { useEffect, useState } from 'react';
import CartItemsTable from '../components/trasactions/cartItemsTable';
import UpdateCartItems from '../components/trasactions/updateCartItem';

interface DivStyle {
    backgroundColor: string;
    padding: string;
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
const Transactions = () => {
    const divStyle1: DivStyle = {
        backgroundColor: 'white', 
        padding: '10px', 
      };
      const divStyle2: DivStyle = {
        backgroundColor: 'white',
        padding: '10px', 
      };
    const [selectedProduct, setSelectedProduct] = useState<ProductCart[]>([]);
    const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
    const [currentProduct, setCurrentProduct] = useState<ProductCart>();

    useEffect(() => {
        //get from session storage  
        const selectedProducts = sessionStorage.getItem('selectedProduct');
        console.log(selectedProducts);
        setSelectedProduct(JSON.parse(selectedProducts || '[]'));
        
    }   
    , []);
    const loadDataForUpdate = (product: ProductCart) =>{
        setIsUpdating(true);
        setCurrentProduct(product);
        console.log(product);
    }
    const defaultProduct: ProductCart = {
        id: 0,
        name: '',
        description: '',
        categoryId: 0,
        price: 0,
        stockQTY: 0,
        soldQTY: 0,
        imageListId: [],
        isSelected: false,
        totalPrice : 0,
        selectedQTY : 0,
      };

      const updateExisingProduct = (product: ProductCart) =>{
        console.log(product);
      }
    return (
        <div>
        <div className="grid grid-cols-8 gap-4">
        <div className="col-span-4" style={divStyle1}>
            <h1 className="text-4xl font-bold text-blue-500 text-center">
          Cart & Transactions  </h1>
          </div>
          <div  className="col-span-4"  style={{ marginRight: '200px' }}>
            {/* <SearchBars
             placeholder="Search Product Name , Category , ID"
            searchProductByKey={searchProductByKey}/> */}
            </div>
        </div>
    
          <div className="grid grid-cols-8">
            <div className="col-span-2" style={divStyle1}>
                <UpdateCartItems
                 isUpdating={isUpdating}
                 currentProduct={currentProduct || defaultProduct}
                 updateExisingProduct={updateExisingProduct}
                
                />
                {/* <AddProduct  onAddProduct={addNewProduct} 
                 updateExisingProduct={updateExisingProduct}
                 isUpdating={isUpdating}
                  currentProduct={currentProduct || defaultProduct} 
                  isDelete={isDelete}
                  categoryList={categoryList}
                  imageList={imageList}
                 /> */}
            </div>
            <div className="col-span-6" style={divStyle2}>
                <CartItemsTable 
                categorys={selectedProduct} 
                loadDataForUpdate={loadDataForUpdate}
                />
             {/* <ProductTable 
             
              products={products}
              removeProductById={removeProductById} 
              loadDataForUpdate={loadDataForUpdate} /> */}
            </div>
            </div>
      </div>
    );
};

export default Transactions;
