import React from 'react';
import AddProductImageUpload from '../components/productImageUpload/addProductImage';
import Toast from "../components/modules/toast";
import axios from "axios";

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
  
  


    const divStyle1: DivStyle = {
        backgroundColor: 'white', 
        padding: '10px', 
      };
      const divStyle2: DivStyle = {
        backgroundColor: 'white',
        padding: '10px', 
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

    return (
      <div className="grid grid-cols-2 gap-4">
        <div>    
          <h1 className="text-4xl font-bold text-blue-500 text-center">
           Image upload Service  </h1>
        </div>
        <div style={{ marginRight: '100px' }}>
         
      </div>
  
        <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
            <AddProductImageUpload onAddProductImage={onAddProductImage}/>
          </div>
          <div className="col-span-4" style={divStyle2}>
         
          </div>
          </div>
    </div>
    );
};

export default ProductImageUpload;
