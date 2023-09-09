import React, { useEffect, useState } from 'react';
interface ProductCartProps {
    updateExisingProduct: (products: ProductCart) => void; 
    isUpdating: boolean;
    currentProduct: ProductCart;

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
  const UpdateCartItems: React.FC<ProductCartProps> = ({updateExisingProduct,isUpdating,currentProduct}) => {
    const [productName, setProductName] = useState(currentProduct.name || ''); // Set initial value using currentProduct data
    const [price, setPrice] = useState<number>(currentProduct.price || 0);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [productQty, SetProductQty] = useState<number>(currentProduct.selectedQTY || 0);
    const [totalPrice, setTotalPrice] = useState<number>(currentProduct.totalPrice || 0);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      };
      useEffect(() => {
        setProductName(currentProduct.name || '');
        setTotalPrice(currentProduct.totalPrice || 0);
        setPrice(currentProduct.price || 0);
        SetProductQty(currentProduct.selectedQTY || 0);

      
        if (currentProduct.imageListId && currentProduct.imageListId.length > 0) {
          setPreviewUrl(currentProduct.imageListId[0].imageData);
        } else {
          setPreviewUrl(undefined);
        }
 
      }, [currentProduct]);


    const handleItemQTYChange = (event: any) => {
      var productQty = event.target.value;
      var productQtyAsInteger = parseInt(productQty, 10);
      
        //productQty convert to integer

        SetProductQty(productQtyAsInteger);
        setTotalPrice(event.target.value * price);
      };
      const handleSubmit = () => {
        //productQty convert to integer
        
        currentProduct.selectedQTY = productQty;
        currentProduct.totalPrice = totalPrice;
        updateExisingProduct(currentProduct);
        console.log("currentProduct test ", currentProduct);
        //clear the form
        setProductName('');
        setPrice(0);
        SetProductQty(0);
        setTotalPrice(0);
        setPreviewUrl(undefined);
        
      }
    return (
        <div className="grid grid-cols-2 gap-0 content-center ..." >
        <div style={containerStyle}>
          <div className="h-56 grid grid-cols-1 gap-0 mt-0">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '25px', fontWeight: 'bold',textAlign:'center', color: '#001C30' }}>Update </h3>
            </div>
            <div className="mt-1 ">
              <input
                placeholder="Product Name"
                type="text"
                value={productName}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
                readOnly = {true}
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="Unit Prices"
                type="text"
                value={price}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
                readOnly = {true}
              />
            </div>

            <div className="mt-1 ">
            <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '100px' }}
            />
              </div>
              <div className="mt-1 ">
              <input
                placeholder="Product Quantity"
                type="text"
                value={productQty}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
                onChange={handleItemQTYChange} 
              />
            </div>
            <div className="mt-1 ">
              <input
                placeholder="Total Price"
                type="text"
                value={totalPrice}
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
                // onChange={(e) => SetProductQty(Number(e.target.value))}
              />
            </div>
            <div style={{ textAlign: 'center' }} className="mt-8">
            <button
              onClick={handleSubmit}
              
              className={`text-white font-bold py-2 px-4 rounded ${true ? 'bg-blue-600 hover:bg-red-500' : 'bg-gray-400'}`}   
            >
                Update
            </button>
          </div>

                 </div>
              </div>

            </div>
    );
};

export default UpdateCartItems;
