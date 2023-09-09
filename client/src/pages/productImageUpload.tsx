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
  const [imagesCopy, setImagesCopy] = useState<Image[]>([]); 
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
          
          console.log("image");
          console.log(image);
          addProductImageToStore(image);

          //testing
          // setImages((prevProducts) => [...prevProducts, image]);
        }
      } 
  //add new image product to store
  function addProductImageToStore(image: Image) {

    
  
          const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
          };
         axios
              .post(`/api/v1/product/images/addnewimage`, image,{headers})
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
    

          updateStoreImage(image);
      
          setIsUpdating(false);
        }

    //update image in store
    function updateStoreImage(image: Image) {
      
    
 
      const imageId = image.id; // Assuming that 'id' is the image ID property
      // Define the headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    
      axios
        .put(`/api/v1/product/images/updateimage/${imageId}`, image, { headers: headers })
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

    //real code
    removeItemImageFromStore(id);    
    
    setIsDelete(true);
  }   
  //delete product item from store
  function removeItemImageFromStore(id: number) {
    
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
      axios
        .delete(`/api/v1/product/images/deleteimage/${id}`,{ headers: headers })
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
  

  // Define the headers with the access token
  const headers = {
    'Authorization': `Bearer ${accessToken1}`,
    'Content-Type': 'application/json',
  };
  axios
    .get(`/api/v1/product/images/getallimages`, { headers: headers })
    .then((response) => {
      if (response.status === 200) {
        const products = response.data.data;

        setImages(products);
        setImagesCopy(products);
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

const searchProductImageByKey = (itemName: string) => {
  console.log("Search category by Name: ", itemName);

  if (itemName !== '') {
    // Filter the categorys array to find categories with names that contain the search term (case-insensitive)
    const filteredCategorys = imagesCopy.filter((image) =>
      image.imageName.toLowerCase().includes(itemName.toLowerCase())
    );

    if (filteredCategorys.length > 0) {
      // You can do something with the filtered categories here
      console.log("Filtered categories by Name:", filteredCategorys);
      setImages(filteredCategorys);


    } else {
      setImages([]);
      console.log("No categories found with the provided name.");
    }
  }
  else {
    // If the search term is an empty string, set categorys to the original categorys array
    setImages(imagesCopy);

    console.log("Image copy ")
  }
}

  //get product image By image id
const getProductImageByUsingImageId = (imageId: number) => {
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .get(`/api/v1/images/getimagebyid/${imageId}`, { headers: headers }) 
      .then((response) => {
        if (response.status === 200) {
          const products = response.data;
          setImages(products);
          setImagesCopy(products);
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
          title: 'Please login to your Account',
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
           placeholder="Search Image by Name"
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
