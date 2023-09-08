import React, { useEffect, useState ,ChangeEvent} from 'react';
import axios from "axios";
import Toast from "../../components/modules/toast";

interface AddProductImageUploadProps {
    onAddProductImage: (image: Image) => void;
    updateExisingProductImage: (image: Image) => void; // Correct type for the prop
    isDelete: boolean;
    isUpdating: boolean;
    currentProduct: Image;
    
}
interface Image {
    id: number;
    imageName: string;
    contentType: string;
    imageData: string; 
  }
const AddProductImageUpload: React.FC<AddProductImageUploadProps> = ({onAddProductImage,isUpdating,currentProduct,updateExisingProductImage,isDelete}) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [imageUri, setImageUri] = useState<string | undefined>(undefined); // Correct type for the state
    const [productImage, setProductImage] = useState<Image | null>(null);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      };

      const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("file", file);
        
       
        if (file) {
          const newImage: Image = {
            id: Date.now(),
            imageName: file.name,
            contentType: file.type,
            imageData: '',
          };
          
        
          setSelectedImage(file);

          uploadNewImageAndGetUrl(file,newImage);

        }
      };
      // upload new image and get url
  function uploadNewImageAndGetUrl(file: File,newImage: Image)  {  

        const formData = new FormData();
        formData.append('file', file);

        const headers = {
          'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
        };
      

        axios
          .post(`/api/v1/product/images/uploadImage`, formData, { headers: headers })
          .then((response) => {
            if(response.status == 200){
              Toast.fire({
                icon: 'success',
                title: 'Image url get successfull'
              })
              var url = response.data;
              setImageUri(url);
              setPreviewUrl(url);
                newImage.imageData = url;
                // Update 'productImage' state with the modified 'loadImage'
                setProductImage(newImage);
              
              return true;
            }
            else{
              Toast.fire({
                icon: 'error',
                title: 'Image url get failed'
              })
              return false;
            }
    
          })
          .catch(() => {
              Toast.fire({
                icon: 'error',
                title: 'Server Error'
              })
              return false;
          });
    }


      const handleSubmit = () => {
        if (productImage) {
            if (isUpdating) {
                console.log("Updating product....");
                console.log("Cureent product", currentProduct );
                productImage.id =currentProduct.id;
                console.log("Updated product", productImage);
                updateExisingProductImage(productImage);  
                clearProductDetails();   
              } else {
                console.log("Adding new product....");
                
                onAddProductImage(productImage);

                clearProductDetails();
              }
        } else {
          console.error("No image selected");
        }
      };
      useEffect(() => {
        console.log("current Product image add file ", currentProduct);
        if (currentProduct && currentProduct.imageData.length > 0) {
          setPreviewUrl(currentProduct.imageData);
        } else {
          setPreviewUrl(undefined);
        }
      }, [currentProduct]);

      function clearProductDetails() {
        setPreviewUrl(undefined);
      }

      useEffect(() => {
        clearProductDetails();
    }, [isDelete]);
    return (
        <div className="grid grid-cols-2 gap-0 content-center ..." >
        <div style={containerStyle}>
          <div className="h-56 grid grid-cols-1 gap-0 mt-0">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '25px', fontWeight: 'bold',textAlign:'center', color: '#001C30' }}>New Image Product</h3>
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

export default AddProductImageUpload;
