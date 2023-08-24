import { useEffect, useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";
import axios from "axios";
import Toast from "../components/modules/toast";
import SearchBars from "../components/modules/searchBars";
import GetAccessToken from "../components/modules/getAccessToken";

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

function Dashboard() {
  const divStyle1: DivStyle = {
    backgroundColor: 'white', 
    padding: '10px', 
  };
  const divStyle2: DivStyle = {
    backgroundColor: 'white',
    padding: '10px', 
  };
  const [products, setProducts] = useState<Product[]>([]); // Initialize products state as an empty array
  const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
  const [isDelete, setIsDelete] = useState(false); // State to track whether it's an update or new add
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleAccessTokenReceived = (token: string) => {
    setAccessToken(token);
    console.log('Access token received in Home component', token);
  };
  // Define a default product object
  const defaultProduct: Product = {
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    price: 0,
    stockQTY: 0,
    soldQTY: 0,
    imageListId: [] // Set it as an empty array
  };
  const searchProductByKey = (itemKey: String) =>{
    console.log("searchProductByKey : ",itemKey);
    getProductByUsingItemName(itemKey);
    getProductByUsingItemCategory(itemKey);
    getProductByUsingItemID(itemKey);
  }
  //get product By item name
  const getProductByUsingItemName = (itemName: String) => {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/api/v1/products/getproductsbyname/${itemName}`, { headers: headers }) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          console.log('Retrieved products:', products);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve products'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products'
        });
      });
  };
  //get product By item category
  const getProductByUsingItemCategory = (itemName: String) => {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/api/v1/products/getproductsbycategory/${itemName}`, { headers: headers })
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          console.log('Retrieved products:', products);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve products'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products'
        });
      });
  };
  //get product By item ID
  const getProductByUsingItemID = (itemName: String) => {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/api/v1/products/getproductbyid/${itemName}`, { headers }) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          console.log('Retrieved products:', products);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve products'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products'
        });
      });
  };
  //remove  item
  const removeProductById = (id: number) =>{
    //for testing
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts); 
    console.log(products);
    
    //real code
    removeItemFromStore(id);    
    getAllProductsFromStore();
    setIsDelete(true);
  }
  //add new item
  const addNewProduct = (product: Product) =>{
    console.log(product);
    //get response of add item to store
    if(product.name == '' || product.description == '' || product.categoryId == 0 || product.price == 0 || product.stockQTY == 0 || product.soldQTY == 0 || product.imageListId.length == 0 ){
      Toast.fire({
        icon: 'error',
        title: 'Please fill all the fields'
      })
    } 
    else{
      addItemToStore(product);
      getAllProductsFromStore();
    
      //for testing
    setProducts((prevProducts) => [...prevProducts, product]);
    }
  }
    //update existing item
  const updateExisingProduct = (product: Product) =>{
    //testing
    const updatedIndex = products.findIndex(p => p.id === product.id);
      if (updatedIndex !== -1) {
        // Create a copy of the products array
        const updatedProducts = [...products];
        updatedProducts[updatedIndex] = product;
        setProducts(updatedProducts);
      }

      //real code
      updateStore(product);
      getAllProductsFromStore(); 
      setIsUpdating(false);
    }
    //update product data load
    const loadDataForUpdate = (product: Product) =>{
        setIsUpdating(true);
        setCurrentProduct(product);
    }
    useEffect(() => {
      console.log("currentProduct", currentProduct);
  }, [currentProduct]);
  
    function updateStore(product: Product) {
      const myHost = sessionStorage.getItem('host');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      };
      axios
        .put(`${myHost}/api/v1/products/updateproduct`, product, { headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product updated successfully'
            });
            
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Failed to update product'
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update product'
          });
        });
      
  
    }

  function addItemToStore(product: Product) {
    console.log("New received item : ", product.name);
    console.log("New received item : ", product);
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
      const myHost = sessionStorage.getItem('host');
      axios
        .post(`${myHost}/api/v1/products/addnewproduct`, product, { headers: headers })
        .then((response) => {
          if(response.status == 200){
            Toast.fire({
              icon: 'success',
              title: 'New product added successfully'
            })
            return true;
          }
          else{
            Toast.fire({
              icon: 'error',
              title: 'Can not add new product'
            })
            return false;
          }
  
        })
        .catch(() => {
            Toast.fire({
              icon: 'error',
              title: 'Can not add new product'
            })
            return false;
        });
    

 }
//get all products from the store
  function getAllProductsFromStore() {
  const myHost = sessionStorage.getItem('host');
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', 
  };
  axios
    .get(`${myHost}/api/v1/getallproducts`)
    .then((response) => {
      if (response.status === 200) {
        const products = response.data;
        setProducts(products);
        console.log('Retrieved products:', products,{ headers: headers });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products'
        });
      }
    })
    .catch(() => {
      Toast.fire({
        icon: 'error',
        title: 'Failed to retrieve products'
      });
    });
  
}
//delete product item from store
  function removeItemFromStore(id: number) {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
      axios
        .delete(`${myHost}/api/v1/products/${id}`,{ headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product deleted successfully'
            });
            
            // Perform any necessary updates in your state or UI here after successful deletion
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Can not delete product'
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Can not delete product'
          });
        });
   }
  return (
    <div>
      <GetAccessToken onAccessTokenReceived={handleAccessTokenReceived} />
      <div className="grid grid-cols-8 gap-4">
      <div className="col-span-4" style={divStyle1}>
          <h1 className="text-4xl font-bold text-blue-500 text-center">
        Product Service  </h1>
        </div>
        <div  className="col-span-4"  style={{ marginRight: '200px' }}>
          <SearchBars
           placeholder="Search Product Name , Category , ID"
          searchProductByKey={searchProductByKey}/>
          </div>
      </div>
  
        <div className="grid grid-cols-8">
          <div className="col-span-2" style={divStyle1}>
              <AddProduct  onAddProduct={addNewProduct} 
               updateExisingProduct={updateExisingProduct}
               isUpdating={isUpdating}
                currentProduct={currentProduct || defaultProduct} 
                isDelete={isDelete}
               />
          </div>
          <div className="col-span-6" style={divStyle2}>
           <ProductTable 
           
            products={products}
            removeProductById={removeProductById} 
            loadDataForUpdate={loadDataForUpdate} />
          </div>
          </div>
    </div>
  )
}
export default  Dashboard;