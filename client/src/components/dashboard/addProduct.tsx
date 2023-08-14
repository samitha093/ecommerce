import React, { useEffect, useState ,ChangeEvent} from 'react';
import axios, { AxiosResponse } from "axios";
import Toast from "../modules/toast";

interface AddProductProps {
  onAddProduct: (product: Product) => void;
  updateExisingProduct: (products: Product) => void; // Correct type for the prop
  isUpdating: boolean;
  currentProduct: Product;
  isDelete: boolean;
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

const AddProduct: React.FC<AddProductProps> = ({onAddProduct,updateExisingProduct ,isUpdating ,currentProduct,isDelete  }) => {
  const [productName, setProductName] = useState(currentProduct.name || ''); // Set initial value using currentProduct data
  const [id, setId] = useState<number>(currentProduct.id || 0);
  const [description, setDescription] = useState(currentProduct.description || '');
  const [categoryId, setCategoryId] = useState<number>(currentProduct.categoryId || 0);
  const [price, setPrice] = useState<number>(currentProduct.price || 0);
  const [stockQTY, setStockQTY] = useState<number>(currentProduct.stockQTY || 0);
  const [soldQTY, setSoldQTY] = useState<number>(currentProduct.soldQTY || 0);
  const [imageListId, setImageListId] = useState<Image[]>(currentProduct.imageListId || []);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      const newImage: Image = {
        id: Date.now(),
        imageName: file.name,
        contentType: file.type,
        imageData: URL.createObjectURL(file)
      };
  
      setImageListId(() => [newImage]);
      setSelectedImage(file);
      setPreviewUrl(newImage.imageData);
    }
  };
  useEffect(() => {
    console.log("currentProduct add file ", currentProduct);
    setProductName(currentProduct.name || '');
    setId(currentProduct.id || 0);
    setDescription(currentProduct.description || '');
    setCategoryId(currentProduct.categoryId || 0);
    setPrice(currentProduct.price || 0);
    setStockQTY(currentProduct.stockQTY || 0);
    setSoldQTY(currentProduct.soldQTY || 0);
    setImageListId(currentProduct.imageListId || []);
  
    if (currentProduct.imageListId && currentProduct.imageListId.length > 0) {
      setPreviewUrl(currentProduct.imageListId[0].imageData);
    } else {
      setPreviewUrl(undefined);
    }
  }, [currentProduct]);
  
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      };
      const handleProductNameChange = (event: any) => {
        setProductName(event.target.value);
      };
      const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
      };
      const handlePriceChange = (event: any) => {
        setPrice(event.target.value);
      };
      const handleCategoryIdChange = (event: any) => {
        setCategoryId(event.target.value);
      };
      const handlesetStockQTYChange = (event: any) => {
        setStockQTY(event.target.value);
      };
      const handlesetSoldQTYChange = (event: any) => {
        setSoldQTY(event.target.value);
      };
      function clearProductDetails() {
        setId(0);
        setProductName("");
        setDescription("");
        setCategoryId(0);
        setPrice(0);
        setStockQTY(0);
        setSoldQTY(0);
        setImageListId([]); 
        setPreviewUrl(undefined);
      }
      

      function generateRandomId() {
        const timestamp = Date.now(); // Get current timestamp
        const random = Math.random().toString().substr(2, 5); // Generate random number string
        return parseInt(`${timestamp}${random}`); // Combine timestamp and random number as integer
      }
      const handleSubmit = () => {
        if (isUpdating) {
          console.log("Updating product....");
          handleUpdateExistingProduct();             
        } else {
          console.log("Adding new product....");
          handleAddNewProduct(); 
        }
      };    
      function handleUpdateExistingProduct() {
         setId(generateRandomId());
         console.log("image id ",imageListId);
          const productDetails = {
            id: id,
            name: productName,
            description: description,
            categoryId: categoryId,
            price: price,
            stockQTY: stockQTY,
            soldQTY: soldQTY,
            imageListId:imageListId
          };

          console.log("Updated product");
          console.log(productDetails);
          updateExisingProduct(productDetails);
          clearProductDetails();    
      }
      function handleAddNewProduct() {
            
            const genId =generateRandomId();
            const productDetails = {
            id: genId,
            name: productName,
            description: description,
            categoryId: categoryId,
            price: price,
            stockQTY: stockQTY,
            soldQTY: soldQTY,
            imageListId:imageListId
          };
          console.log("New product");
          console.log(productDetails);
          onAddProduct(productDetails); // Call the onAddProduct function with the new product details    
          clearProductDetails();    
      }
      useEffect(() => {
        clearProductDetails();
    }, [isDelete]);
    
    return (
        <div className="grid grid-cols-2 gap-0 content-center ..." >
        <div style={containerStyle}>
          <div className="h-56 grid grid-cols-1 gap-0 mt-0">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '25px', fontWeight: 'bold',textAlign:'center', color: '#001C30' }}>Add Product</h3>
            </div>
  
            <div className="mt-1 ">
              <input
                placeholder="Product Name"
                type="text"
                value={productName}
                onChange={handleProductNameChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Description"
                type="text"
                value={description}
                onChange={handleDescriptionChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Category Id"
                type="text"
                value={categoryId}
                onChange={handleCategoryIdChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Price"
                type="text"
                value={price}
                onChange={handlePriceChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Stock Quantity"
                type="text"
                value={stockQTY}
                onChange={handlesetStockQTYChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>
            <div className="mt-1">
              <input
                placeholder="Sold Quantity"
                type="text"
                value={soldQTY}
                onChange={handlesetSoldQTYChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>
          <div className="mt-1">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '100px' }}
                    />
                    <p>Selected Image: {selectedImage.name}</p>
                  </div>
                )}
              </div>


            <div style={{ textAlign: 'center' }} className="mt-8">
            <button
            onClick={handleSubmit}
              style={{ padding: '15px', width: '130px' }}
              className={`text-white font-bold py-2 px-4 rounded ${true ? 'bg-blue-900 hover:bg-green-700' : 'bg-gray-400'}`}   
            >
              {isUpdating ? 'Update' : 'Add'}
            </button>
          </div>
          </div>
        </div>
      </div>
                    
    );
};

export default AddProduct;

