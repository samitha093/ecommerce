import { useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";
import axios, { AxiosResponse } from "axios";
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
  const addProductToList = (product: Product) => {
    setProducts([...products, product]); // Add the new product to the products array
    console.log(products);
  };
  function removeProductById(id: number) {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts); 
    console.log(products);
    removeItemFromStore(id);    
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
              <AddProduct  onAddProduct={addProductToList}/>
          </div>
          <div className="col-span-6" style={divStyle2}>
           <ProductTable products={products} removeProductById={removeProductById}/>
          </div>
          </div>
    
    </div>
  )
}
export default  Dashboard;