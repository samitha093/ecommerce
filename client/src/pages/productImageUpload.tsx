import React, { useEffect, useState } from 'react';
import AddProductImageUpload from '../components/productImageUpload/addProductImage';
import Toast from "../components/modules/toast";
import axios from "axios";
import ImageTable from '../components/productImageUpload/imageTable';
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
  const [accessToken, setAccessToken] = useState<string >('');
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
          // //convert image to base64
          // const base64String = btoa(image.imageData);
          // image.imageData = base64String;
          console.log("image");
          console.log(image);
          addProductImageToStore(image);

          //testing
          // setImages((prevProducts) => [...prevProducts, image]);
        }
      } 
  //add new image product to store
  function addProductImageToStore(image: Image) {
          console.log("New add image data : ", image.imageData);
          console.log("New add image item : ", image);
         
          const myHost = sessionStorage.getItem('host');
          const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          };
         axios
              .post(`${myHost}/v1/images/addnewimage`, image,{headers})
              .then((response) => {
                if(response.status == 200){
                  Toast.fire({
                    icon: 'success',
                    title: 'New product Image added successfully'
                  })
                  getAllProductsImagesFromStore(accessToken);
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
        // //testing
        //  const updatedIndex = images.findIndex(p => p.id === image.id);
        //   if (updatedIndex !== -1) {
        //     // Create a copy of the products array
        //     const updatedProducts = [...images];
        //     updatedProducts[updatedIndex] = image;
        //     setImages(updatedProducts);
        //   }
    
          //real code
            //convert image to base64
          const base64String = btoa(image.imageData);
          image.imageData = base64String;
          updateStoreImage(image);
      
          setIsUpdating(false);
        }

    //update image in store
    function updateStoreImage(image: Image) {
      const myHost = sessionStorage.getItem('host');
      const imageId = image.id; // Assuming that 'id' is the image ID property
      // Define the headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    
      axios
        .put(`${myHost}/v1/images/updateimage/${imageId}`, image, { headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product image updated successfully',
            });
            getAllProductsImagesFromStore(accessToken);
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
    
    setIsDelete(true);
  }   
  //delete product item from store
  function removeItemImageFromStore(id: number) {
    const myHost = sessionStorage.getItem('host');
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
      axios
        .delete(`${myHost}/v1/images/deleteimage/${id}`,{ headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Product image deleted successfully'
            });
            getAllProductsImagesFromStore(accessToken);
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
function getAllProductsImagesFromStore(accessToken1:string) {
  const myHost = sessionStorage.getItem('host');
  // Define the headers with the access token
  const headers = {
    'Authorization': `Bearer ${accessToken1}`,
    'Content-Type': 'application/json',
  };
  axios
    .get(`${myHost}/v1/images/getallimages`, { headers: headers })
    .then((response) => {
      if (response.status === 200) {
        const products = response.data.data;
        //response all images imagedata convert from base64 to string
        products.forEach((element: any) => {
          element.imageData = atob(element.imageData);
        });
        setImages(products);
        console.log('Retrieved images list:', products);
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
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .get(`${myHost}/v1/images/getimagebyid/${imageId}`, { headers: headers }) 
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
          getAllProductsImagesFromStore(access_token);
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
  useEffect(() => {
    getAccessToken();
  }
  , []);

    return (
      <div >
        <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
          <h1 className="text-4xl font-bold text-blue-500 text-center">
           Image upload Service  </h1>
          </div>
          <div className="col-span-4" style={{ marginRight: '200px' }}>       
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
