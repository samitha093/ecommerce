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
  const [products1, setProducts] = useState<Product[]>([]); // Initialize products state as an empty array

  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      categoryId: 1,
      price: 19.99,
      stockQTY: 100,
      soldQTY: 10,
      imageListId: [
        {
          id: 1,
          imageName: "product1.jpg",
          contentType: "image/jpeg",
          imageData: "data:image/png;base64,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",
        },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      categoryId: 2,
      price: 29.99,
      stockQTY: 50,
      soldQTY: 20,
      imageListId: [
        {
          id: 2,
          imageName: "product2.jpg",
          contentType: "image/jpeg",
          imageData: "base64image2",
        },
      ],
    },
    // Add more dummy products as needed
  ];

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