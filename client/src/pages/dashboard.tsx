import { useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";
import axios from "axios";
import Toast from "../components/modules/toast";

interface DivStyle {
  backgroundColor: string;
  padding: string;
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

function Dashboard() {
  const divStyle1: DivStyle = {
    backgroundColor: 'white', // Replace with your desired color
    padding: '10px', // Add some padding for better visibility
  };
  const divStyle2: DivStyle = {
    backgroundColor: 'white', // Replace with your desired color
    padding: '10px', // Add some padding for better visibility
  };
  const [products, setProducts] = useState<Product[]>([]); // Initialize products state as an empty array


  const removeProductById = (id: number) =>{
    //for testing
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts); 
    console.log(products);
    
    //real code
    removeItemFromStore(id);    
    getAllProductsFromStore();
  }
  const addNewProduct = (product: Product) =>{
    //for testing
    setProducts([...products, product]); 
    console.log(products);

    //real code
    addItemToStore(product);
    getAllProductsFromStore();

  }
  function addItemToStore(product: Product) {
    const myHost = sessionStorage.getItem('host');
    axios
      .post(`${myHost}/api/v1/products/addnewproduct`, product)
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
  function getAllProductsFromStore() {
  const myHost = sessionStorage.getItem('host');
  axios
    .get(`${myHost}/api/v1/getallproducts`)
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
  
}
  function removeItemFromStore(id: number) {
    const myHost = sessionStorage.getItem('host');
      axios
        .delete(`${myHost}/api/v1/products/${id}`)
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
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        Product Service  </h1>
        <div className="grid grid-cols-8">
          <div className="col-span-2" style={divStyle1}>
              <AddProduct  onAddProduct={addNewProduct}/>
          </div>
          <div className="col-span-6" style={divStyle2}>
           <ProductTable products={products} removeProductById={removeProductById}/>
          </div>
          </div>
    
    </div>
  )
}
export default  Dashboard;