import React, { useEffect, useState ,ChangeEvent} from 'react';

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

    const [productImage, setProductImage] = useState<Image | null>(null);


    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
      };

      const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("file", file);
      
        // if (file) {
        //   const reader = new FileReader();
        //   reader.onload = (e) => {
        //     if (e.target && typeof e.target.result === "string") {
        //       const base64Data = e.target.result.split(",")[1]; // Get the Base64 data (remove data:image/jpeg;base64, part)
        //       const newImage: Image = {
        //         id: Date.now(),
        //         imageName: file.name,
        //         contentType: file.type,
        //         imageData: base64Data,
        //       };
        //       console.log("newImage", newImage);
        //       // setSelectedImage(file);
        //       // setPreviewUrl(newImage.imageData);
        //       setProductImage(newImage);
            
        //     }
        //   };
      
        //   reader.readAsDataURL(file); // Read the file as data URL (Base64)
        // }


        if (file) {
          const newImage: Image = {
            id: Date.now(),
            imageName: file.name,
            contentType: file.type,
            imageData: URL.createObjectURL(file),
          };
          setPreviewUrl(newImage.imageData);
          //convert image to base64
          const base64String = btoa(newImage.imageData);
          newImage.imageData = base64String;
          setProductImage(newImage);
          setSelectedImage(file);

       
        }
      };
      

      const handleSubmit = () => {
        if (productImage) {
            if (isUpdating) {
                console.log("Updating product....");
                productImage.id =currentProduct.id;
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
