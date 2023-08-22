import React, { useState } from 'react';
import AddProductImageUpload from '../components/productImageUpload/addProductImage';
import Toast from "../components/modules/toast";
import axios from "axios";
import ImageTable from '../components/productImageUpload/imageTable';
import ImageSearchBar from '../components/productImageUpload/imageSearchBar';
import SearchBars from '../components/modules/searchBars';

interface ProductImageUploadProps {
   
}
interface Image {
  id: number;
  imageName: string;
  contentType: string;
  imageData: string; 
}
interface DivStyle {
    backgroundColor: string;
    padding: string;
  }
const ProductImageUpload: React.FC<ProductImageUploadProps> = ({  }) => {
  
  const [images, setImages] = useState<Image[]>([]); // Initialize products state as an empty array
  const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
  const [currentProduct, setCurrentProduct] = useState<Image>();
  const [isDelete, setIsDelete] = useState(false); // State to track whether it's an update or new add

    const divStyle1: DivStyle = {
        backgroundColor: 'white', 
        padding: '10px', 

      };
      const divStyle2: DivStyle = {
        backgroundColor: 'white',
        padding: '10px'
      };
      
  // Define a default product object
  const defaultProduct: Image = {
    id: 0,
    imageName: '',
    contentType: '',
    imageData: ''
  };
      //new image add function
    const onAddProductImage = (image: Image) =>{
        console.log(image);
    
        //check empty
        if (!image.imageName || !image.contentType || !image.imageData) {
          Toast.fire({
            icon: 'error',
            title: 'Please Select a Image'
          })
        }
        else{
          addProductImageToStore(image);
          getAllProductsImagesFromStore();

          //testing
          setImages((prevProducts) => [...prevProducts, image]);
        }
      } 
  //add new image product to store
  function addProductImageToStore(image: Image) {
          console.log("New received item : ", image.imageName);
          console.log("New received item : ", image);
         
          const myHost = sessionStorage.getItem('host');
          const accessToken = sessionStorage.getItem('access-token');           
          const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          };
         axios
              .post(`${myHost}/api/v1/images/addnewimage`, image,{headers})
              .then((response) => {
                if(response.status == 200){
                  Toast.fire({
                    icon: 'success',
                    title: 'New product Image added successfully'
                  })
                  return true;
                }
                else{
                  Toast.fire({
                    icon: 'error',
                    title: 'Can not add new product Image'
                  })
                  return false;
                }
        
              })
              .catch(() => {
                  Toast.fire({
                    icon: 'error',
                    title: 'Can not add new product Image'
                  })
                  return false;
              });     
      }
    //update image data load
    const loadDataForUpdate = (image: Image) =>{
      setIsUpdating(true);
      setCurrentProduct(image);
  }

  //update existing image item
  const updateExisingProductImage = (image: Image) =>{
        //testing
         const updatedIndex = images.findIndex(p => p.id === image.id);
          if (updatedIndex !== -1) {
            // Create a copy of the products array
            const updatedProducts = [...images];
            updatedProducts[updatedIndex] = image;
            setImages(updatedProducts);
          }
    
          //real code
          updateStoreImage(image);
          getAllProductsImagesFromStore();
          setIsUpdating(false);
        }

    //update image in store
    function updateStoreImage(image: Image) {
      const myHost = sessionStorage.getItem('host');
      const accessToken = sessionStorage.getItem('access-token');
      const imageId = image.id; // Assuming that 'id' is the image ID property
      // Define the headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    
      axios
        .put(`${myHost}/api/v1/images/updateimage/${imageId}`, image, { headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product image updated successfully',
            });
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Failed to update product image',
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update product image',
          });
        });
    }
    //remove image  item
  const removeProductImageById = (id: number) =>{
    //for testing
    const updatedProducts = images.filter(image => image.id !== id);
    setImages(updatedProducts); 
    
    //real code
    removeItemImageFromStore(id);    
    getAllProductsImagesFromStore();
    setIsDelete(true);
  }   
  //delete product item from store
  function removeItemImageFromStore(id: number) {
    const myHost = sessionStorage.getItem('host');
    const accessToken = sessionStorage.getItem('access-token');  
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
      axios
        .delete(`${myHost}/api/v1/images/deleteimage/${id}`,{headers})
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product image deleted successfully'
            });
            
            // Perform any necessary updates in your state or UI here after successful deletion
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Can not delete product image'
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Can not delete product image'
          });
        });
    
   }
//get all products images from the store
function getAllProductsImagesFromStore() {
  const myHost = sessionStorage.getItem('host');
  const accessToken = sessionStorage.getItem('access-token');  
  // Define the headers with the access token
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  axios
    .get(`${myHost}/api/v1/images/getallimages`,{headers})
    .then((response) => {
      if (response.status === 200) {
        const products = response.data;
        setImages(products);
        console.log('Retrieved products:', products);
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve products images'
        });
      }
    })
    .catch(() => {
      Toast.fire({
        icon: 'error',
        title: 'Failed to retrieve products images'
      });
    });
  
}
//search image by id
const searchProductImageByKey = (itemKey: string) =>{
  console.log("searchProductImageByKey : ",itemKey);
  const imageID = parseInt(itemKey, 10);
  getProductImageByUsingImageId(imageID);
}
  //get product image By image id
const getProductImageByUsingImageId = (imageId: number) => {
    const myHost = sessionStorage.getItem('host');
    const accessToken = sessionStorage.getItem('access-token');  
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .get(`${myHost}/api/v1/images/getimagebyid/${imageId}`,{headers}) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setImages(products);
          console.log('Retrieved products:', products);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve images'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve images'
        });
      });
  };
    return (
      <div >
        <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
          <h1 className="text-4xl font-bold text-blue-500 text-center">
           Image upload Service  </h1>
          </div>
          <div className="col-span-4" style={{ marginRight: '100px' }}>
         
          <SearchBars
           placeholder="Search Image by ID"
          searchProductByKey={searchProductImageByKey}/>
          </div>
      </div>
         <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
            <AddProductImageUpload 
            updateExisingProductImage={updateExisingProductImage}
              currentProduct={currentProduct || defaultProduct}
              onAddProductImage={onAddProductImage}
               isUpdating={isUpdating}
               isDelete={isDelete}/>
          </div>
          <div className="col-span-4" style={divStyle2}>
         <ImageTable 
         images={images} 
         loadDataForUpdate={loadDataForUpdate}  
         removeProductImageById={removeProductImageById}
         />
          </div>
      </div>
    </div>
    );
};

export default ProductImageUpload;
