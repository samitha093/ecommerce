import { useEffect, useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";
import axios from "axios";
import Toast from "../components/modules/toast";
import SearchBars from "../components/modules/searchBars";

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

interface SaveProduct {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  stockQTY: number;
  imageIDList: number[]; 
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
  const [productsCopy, setProductsCopy] = useState<Product[]>([]); // Initialize products state as an empty array
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
  const searchProductByKey = (itemName: string) => {
    console.log("Search category by Name: ", itemName);

    if (itemName !== '') {
        // Split the search term into individual words
        const searchWords = itemName.toLowerCase().split(' ');

        // Filter the products array to find products where any part of the name matches
        const filteredProducts = productsCopy.filter((product) => {
            const productName = product.name.toLowerCase();

            // Check if any of the search words are included in the product name
            return searchWords.some((word) => productName.includes(word));
        });
        console.log("searchWords : ",searchWords);
        console.log("filteredProducts : ",filteredProducts);

        if (filteredProducts.length > 0) {
            // You can do something with the filtered products here
            console.log("Filtered products by Name:", filteredProducts);
            setProducts(filteredProducts);
        } else {
            setProducts([]);
            console.log("No products found with the provided name.");
        }
    } else {
        // If the search term is an empty string, set products to the original products array
        setProducts(productsCopy);
    }
};

  
  //get product By item name
  const getProductByUsingItemName = (itemName: String) => {
   
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`/api/v1/product/getproductsbyname/${itemName}`, { headers: headers }) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          setProductsCopy(products);  
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
   
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`/api/v1/product/getproductsbycategory/${itemName}`, { headers: headers })
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          setProductsCopy(products);
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
   
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`/api/v1/product/getproductbyid/${itemName}`, { headers }) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setProducts(products);
          setProductsCopy(products);
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

    console.log("removeProductById : ",id);
    //real code
    removeItemFromStore(id);    
  
    setIsDelete(true);
  }
  //add new item
  const addNewProduct = (product: Product) =>{
    console.log(product);
    //get response of add item to store
    if(product.name == '' || product.description == ''){
      Toast.fire({
        icon: 'error',
        title: 'Please fill all the field'
      })
    } 
    else{
      const idArry:number[] = [];
      product.imageListId.map((item) => {
        idArry.push(item.id);
      });

      const saveNewProduct: SaveProduct = {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price,
        stockQTY: product.stockQTY,
        imageIDList: idArry,
      }

      console.log("saveNewProduct : ",saveNewProduct);
      addItemToStore(saveNewProduct);
  
    }
  }

  const updateDataTemplete = (product: Product) =>{
    console.log("tempplete : ",product);
    const idArry:number[] = [];
    product.imageListId.map((item) => {
      idArry.push(item.id);
    });
    const productId = product.id;
    const saveNewProduct: SaveProduct = {
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price,
      stockQTY: product.stockQTY,
      imageIDList: idArry,
    }

    console.log("updated product : ",saveNewProduct);
      updateStore(saveNewProduct,productId);
     
  }
    //update existing item
  const updateExisingProduct = (product: Product) =>{
    updateDataTemplete(product);

      // //real code

      setIsUpdating(false);
    }
    //update product data load
    const loadDataForUpdate = (product: Product) =>{
        setIsUpdating(true);
        setCurrentProduct(product);
    }

  //get all categories from the store
  function getAllCategory(accessTokens:string) {
   
    const headers = {
      'Authorization': `Bearer ${accessTokens}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`/api/v1/product/categories/getallcategories`,{ headers: headers })
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
   
    const headers = {
      'Authorization': `Bearer ${accessTokens}`,
      'Content-Type': 'application/json', 
    };
    axios
      .get(`/api/v1/product/images/getallimages`,{ headers: headers })
      .then((response) => {
        if (response.status === 200) {
          const imageList = response.data.data;
          setImageList(imageList);


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

    function updateStore(product: SaveProduct,productId: number) {
     
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      };
      axios
      .put(`/api/v1/product/updateproduct/${productId}`, product, { headers: headers })
      .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product updated successfully'
            });
            getAllProductsFromStore();
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
 
  function addItemToStore(product: SaveProduct) {

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
     
      axios
        .post(`/api/v1/product/addnewproduct`, product, { headers: headers })
        .then((response) => {
          if(response.status == 200){
            Toast.fire({
              icon: 'success',
              title: 'New product added successfully'
            })
            getAllProductsFromStore();

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
 
 //received data analysis
  const dataExtract = (receivedData: any) =>{
  console.log("receivedData : ",receivedData);
  const products: Product[] = []; 
  receivedData.map((item: any) => {
    const product: Product = {
      id: item.id,
      name: item.productName,
      description: item.description,
      categoryId: item.category.id,
      price: item.price,
      stockQTY: item.stockQTY,
      soldQTY: item.soldQTY,
      imageListId: item.imageList, 
    };
    products.push(product);
  });
  console.log("Analsized data : ",products);
  setProducts(products);
  setProductsCopy(products);
  }
 

//get all products from the store
  function getAllProductsFromStore() {
 
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json', 
  };
  axios
    .get(`/api/v1/product/getallProducts`, { headers: headers })
    .then((response) => {
      if (response.status === 200) {
        const receivedProducts = response.data.data;
        dataExtract(receivedProducts);
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
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    };
      axios
        .delete(`/api/v1/product/deleteproduct/${id}`,{ headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product deleted successfully'
            });
            getAllProductsFromStore();
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
          getAllProductsFromStore()
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