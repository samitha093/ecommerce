import { useEffect, useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";
import axios from "axios";
import Toast from "../components/modules/toast";
import SearchBars from "../components/modules/searchBars";
import GetAccessToken from "../components/modules/getAccessToken";
import getAccessToken from "../components/modules/getAccessToken";

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
interface Category {
  id: number;
  name: string;
  description: string | null;
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
  const [accessToken, setAccessToken] = useState<string>('');
  const [categoryList, setCateogryList] = useState<Category[]>([]);
  const [imageList, setImageList] = useState<Image[]>([]);



const testCategory=[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Category for electronic products"
  },
  {
    "id": 2,
    "name": "Clothing",
    "description": "Category for clothing items"
  },
  {
    "id": 3,
    "name": "Books",
    "description": "Category for books and reading materials"
  }
]

const imageListData= [{
      id: 1693196011602,
      imageName: "Screenshot (22).png",
      contentType: "image/png",
      imageData: "blob:http://localhost:5173/a3343de4-cdd6-4651-b99e-482c468c0868"
    },
    {id: 1693196249071,
    imageName: "Screenshot (28).png",
    contentType: "image/png",
    imageData: "blob:http://localhost:5173/33b515fa-1f1b-4233-b143-d002826e5dae"
    },
]
//set image list and category list
useEffect(() => {
  // //test
  // setCateogryList(testCategory);
  // setImageList(imageListData);

  //original
  getAccessToken();


}, []);
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
      .get(`${myHost}/v1/products/getproductsbyname/${itemName}`, { headers: headers }) 
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
      .get(`${myHost}/v1/products/getproductsbycategory/${itemName}`, { headers: headers })
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
      .get(`${myHost}/v1/products/getproductbyid/${itemName}`, { headers }) 
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

  //get all categories from the store
  function getAllCategory(accessTokens:string) {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessTokens}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/v1/categories/getallcategories`,{ headers: headers })
      .then((response) => {
        if (response.status === 200) {
          const categoryList = response.data.data;
          setCateogryList(categoryList);
          console.log('Retrieved categoryList:', categoryList);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve categoryList'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve categoryList'
        });
      });
    
  }
  //get all images from the store
  function getAllImageList(accessTokens:string) {
    const myHost = sessionStorage.getItem('host');
    const headers = {
      'Authorization': `Bearer ${accessTokens}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`${myHost}/v1/images/getallimages`,{ headers: headers })
      .then((response) => {
        if (response.status === 200) {
          const imageList = response.data.data;
          //response all images imagedata convert from base64 to string
          imageList.forEach((element: any) => {
          element.imageData = atob(element.imageData);
          setImageList(imageList);
          console.log('Retrieved imageList:', imageList);
        });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve imageList'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve imageList'
        });
      });
    
  }

    function updateStore(product: Product) {
      const myHost = sessionStorage.getItem('host');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      };
      axios
        .put(`${myHost}/v1/products/updateproduct`, product, { headers: headers })
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
        .post(`${myHost}/v1/products/addnewproduct`, product, { headers: headers })
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
    .get(`${myHost}/v1/getallproducts`)
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
        .delete(`${myHost}/v1/products/${id}`,{ headers: headers })
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

   function getAccessToken() { 
    let refreshToken = sessionStorage.getItem('refresh_token');
    var myHost = sessionStorage.getItem('host');
    //test
    myHost = "http://localhost:8081";
    axios
      .post(
        `${myHost}/api/v1/auth/refresh-token`,
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
          getAllCategory(access_token);
          getAllImageList(access_token);
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
          title: 'Refresh token function error',
        });
      });
  }

  return (
    <div>
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
                categoryList={categoryList}
                imageList={imageList}
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