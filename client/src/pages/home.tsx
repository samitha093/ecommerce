import Background from "../components/home/background";
import Card from "../components/home/card";
import { useEffect, useState } from "react";
import Toast from "../components/modules/toast";
import axios from "axios";

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
 function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Initialize products state as an empty array

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

  useEffect(() => {
    getAllProductsFromStore();
  }, []);

  return (
    <div>
      <Background/>
       <div className="grid grid-cols-4 gap-4 mt-5">
        {products.map((product) => (
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
  </div>
  )
}
export default Home;