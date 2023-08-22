import React, { useEffect, useState ,ChangeEvent} from 'react';

interface AddProductImageUploadProps {
    onAddProductImage: (image: Image) => void;
}
interface Image {
    id: number;
    imageName: string;
    contentType: string;
    imageData: string; 
  }
const AddProductImageUpload: React.FC<AddProductImageUploadProps> = ({onAddProductImage}) => {
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
      
        if (file) {
          const newImage: Image = {
            id: Date.now(),
            imageName: file.name,
            contentType: file.type,
            imageData: URL.createObjectURL(file)
          };
          setSelectedImage(file);
          setPreviewUrl(newImage.imageData);
          setProductImage(newImage);
        }
      };

      const handleSubmit = () => {
        if (productImage) {
          onAddProductImage(productImage);
        } else {
          console.error("No image selected");
        }
      };
      
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
                Upload
            </button>
          </div>
          </div>
        </div>
      </div>
    );
};

export default AddProductImageUpload;
