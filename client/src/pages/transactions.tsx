import React, { useEffect, useState } from 'react';
import CartItemsTable from '../components/trasactions/cartItemsTable';
import UpdateCartItems from '../components/trasactions/updateCartItem';
import DeliveryAddress from '../components/trasactions/deliveryAddress';
import axios from "axios";
import Toast from "../components/modules/toast";
import Loading from '../components/modules/loading';

interface DivStyle {
    backgroundColor: string;
    padding: string;
    marginTop?: string;
  }
  interface DivStyle2 {
   
    marginTop?: string;
    marginLeft?: string;
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

  interface DeliveryAddressInterface{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;

}
interface CheckoutDetails {
  userId: number;
  amount: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  orders: {
    productId: number;
    price: number;
    quantity: number;
  }[];
}
function Transactions () {
    const divStyle1: DivStyle = {
        backgroundColor: 'white', 
        padding: '10px', 
      };
      const divStyle2: DivStyle = {
        backgroundColor: 'white',
        padding: '10px', 
      };
      const divStyle3: DivStyle2 = {
        //margin top
        marginTop: '160px',
        marginLeft: '100px',
      };
    const [selectedProduct, setSelectedProduct] = useState<ProductCart[]>([]);
    const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
    const [currentProduct, setCurrentProduct] = useState<ProductCart>();
    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressInterface>();
    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    //total bill
    const [totalBill, setTotalBill] = useState<number>(0);

    useEffect(() => {
        //get from session storage  
        const selectedProducts = sessionStorage.getItem('selectedProduct');
        console.log("selectedProducts ", selectedProducts);
        setSelectedProduct(JSON.parse(selectedProducts || '[]'));
        
    }   
    , []);

    useEffect(() => {
         getAccessToken();
        //calculate total bill
        let total = 0;
        selectedProduct.forEach((p) => {
            total += p.totalPrice;
        }
        );
        //set last two digits
        total = Math.round(total * 100) / 100;  
        setTotalBill(total);
        console.log("total bill ", totalBill);
      }, [selectedProduct]);

    const loadDataForUpdate = (product: ProductCart) =>{
        setIsUpdating(true);
        setCurrentProduct(product);
        console.log(product);
    }
    function getAccessToken() { 
      let refreshToken = sessionStorage.getItem('refresh_token');
      axios
        .post(
          `/api/v1/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Check if the header exists before accessing it
            const refresh_token = response.headers['refresh-token'];
            const access_token = response.headers['access-token'];
            setAccessToken(access_token);
            // Toast.fire({
            //   icon: 'success',
            //   title: 'Refresh token function run successfully',
            // });
  
            sessionStorage.setItem('refresh_token', refresh_token);
      
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Refresh token function failed',
            });
            console.log('Refresh-Token header not found ');
            
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Please login to your Account',
          });
        });
    }
    const removeProductById = (id: number) => {
        const updatedProductList = selectedProduct.filter((p) => p.id !== id);
        setSelectedProduct(updatedProductList);
        let total = 0;
        selectedProduct.forEach((p) => {
            total += p.totalPrice;
        }
        );
        //set last two digits
        total = Math.round(total * 100) / 100;
        setTotalBill(total);
      };
      
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
        //update the product in the list using id
        const updatedProductList = selectedProduct.map((p) => {
            if(p.id === product.id){
                return product;
            }
            return p;
        });
        setSelectedProduct(updatedProductList);
        let total = 0;
        selectedProduct.forEach((p) => {
            total += p.totalPrice;
        }
        );
        //set last two digits
        total = Math.round(total * 100) / 100;     
        setTotalBill(total);
      }
      const deliveryAddressReturn = (deliveryAddress:DeliveryAddressInterface) =>{
          setDeliveryAddress(deliveryAddress);
          checkoutDataProcess(deliveryAddress);

      }
      //checkout process 
      const checkoutDataProcess = (deliveryAddress: DeliveryAddressInterface) => {
        setIsLoading(true);
        console.log("deliveryAddress ", deliveryAddress);
        const checkoutDetails = {
          userId: 1,
          amount: totalBill,
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          postalCode: deliveryAddress.postalCode,
          country: deliveryAddress.country,
          orders: [] as { productId: number; price: number; quantity: number; }[]
        };
        selectedProduct.forEach((p) => {
          const order = {
            productId: p.id,
            price: p.price,
            quantity: p.selectedQTY
          };
          checkoutDetails.orders.push(order);
        });
        console.log("checkoutDetails ", checkoutDetails);
      
    
        addNewTrasaction(checkoutDetails);
      };

      // trasactions checkout to db
      function addNewTrasaction(checkoutDetails:any) {  
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', 
        };
          axios
            .post(`/api/v1/transactions/addtransaction`, checkoutDetails, { headers: headers })
            .then((response) => {
              if(response.status == 200){
                Toast.fire({
                  icon: 'success',
                  title: 'Checkout successfully'
                })
               
                //remove selected product from session storage  
                sessionStorage.removeItem('selectedProduct');
                //setSelectedProduct set to empty array
                setSelectedProduct([]);
                setIsLoading(false);
                return true;
              }
              else{
                Toast.fire({
                  icon: 'error',
                  title: 'Checkout not successfull'
                })
                setIsLoading(false);
                return false;
              }
      
            })
            .catch(() => {
                Toast.fire({
                  icon: 'error',
                  title: 'Server Error'
                })
                setIsLoading(false);
                return false;
            });
     }

    return (
        <div>
             <Loading isLoading={isLoading} />
       
        <div className="grid grid-cols-8 gap-4">
        <div className="col-span-4" style={divStyle1}>
            <h1 className="text-4xl font-bold text-blue-500 text-center">
          Cart & Transactions  </h1>
          </div>
          <div  className="col-span-4"  style={{ marginRight: '200px' }}>
            </div>
        </div>
          <div className="grid grid-cols-8">
            <div className="col-span-2" style={divStyle1}>
                <UpdateCartItems
                 isUpdating={isUpdating}
                 currentProduct={currentProduct || defaultProduct}
                 updateExisingProduct={updateExisingProduct}
                
                />
            </div>
            <div className="col-span-6" style={divStyle2}>
                <CartItemsTable 
                categorys={selectedProduct} 
                loadDataForUpdate={loadDataForUpdate}
                removeProductById={removeProductById} 
                />
            </div>
          </div>
          <div className="grid grid-cols-8">
            <div className="col-span-2" style={divStyle3}>
              <h3>Total Bill {totalBill}</h3>
              {/* <button  
              style={{ padding: '15px', width: '130px' }}
              className={`text-white font-bold py-2 px-4 rounded ${true ? 'bg-blue-900 hover:bg-green-700' : 'bg-gray-400'}`}  >
                    Checkout
                </button> */}
                <DeliveryAddress 
             deliveryAddressReturn={deliveryAddressReturn}
             />
              </div>
              <div className="col-span-6" style={divStyle3}>
         
             </div>
              
                </div>
      </div>
    );
};

export default Transactions;
