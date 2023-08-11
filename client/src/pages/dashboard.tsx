import { useState } from "react";
import AddProduct from "../components/dashboard/addProduct";
import ProductTable from "../components/dashboard/productTable";

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
  stockQuantity: number;
  soldQuantity: number;
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
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-500 text-center">
        Product Service  </h1>
        <div className="grid grid-cols-8">
          <div className="col-span-2" style={divStyle1}>
              <AddProduct  onAddProduct={addProductToList}/>
          </div>
          <div className="col-span-6" style={divStyle2}>
           <ProductTable products={products}/>
          </div>
          </div>
    
    </div>
  )
}
export default  Dashboard;