import React, { useEffect, useState } from 'react';

interface AddCategoryProps {
    onAddCategory: (category: Category) => void;
    updateExisingCategory: (category: Category) => void; 
    currentCategory: Category;
    isUpdating: boolean;
}
interface Category {
    id: number;
    name: string;
    description: string;
  }
const AddCategory: React.FC<AddCategoryProps> = ({ currentCategory,isUpdating ,onAddCategory,updateExisingCategory}) => {

    const [id, setId]                   = useState<number>(currentCategory.id || 0);
    const [productName, setProductName] = useState(currentCategory.name || ''); 
    const [description, setDescription] = useState(currentCategory.description || '');

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
      const handleCategoryNameChange = (event: any) => {
        setProductName(event.target.value);
      };
      const handleCategoryDescriptionChange = (event: any) => {
        setDescription(event.target.value);
      };
      useEffect(() => {
        console.log("current category add file ", currentCategory);
        setId(currentCategory.id || 0);
        setProductName(currentCategory.name || '');
        setDescription(currentCategory.description || '');
       
      }, [currentCategory]);
      const handleSubmit = () => {
        if (isUpdating) {
          console.log("Updating category....");
          handleUpdateExistingProduct();             
        } else {
          console.log("Adding new category....");
          handleAddNewProduct(); 
        }
      };  
      function handleUpdateExistingProduct() {
        setId(generateRandomId());
         const productDetails = {
           id: id,
           name: productName,
           description: description,
         };

         console.log("Updated product");
         console.log(productDetails);
         updateExisingCategory(productDetails);
        //  clearProductDetails();    
     }
     function generateRandomId() {
        const timestamp = Date.now(); // Get current timestamp
        const random = Math.random().toString().substr(2, 5); // Generate random number string
        return parseInt(`${timestamp}${random}`); // Combine timestamp and random number as integer
      }

     function handleAddNewProduct() {
           
           const genId =generateRandomId();
           const productDetails = {
           id: genId,
           name: productName,
           description: description,

         };
         console.log("New product");
         console.log(productDetails);
         onAddCategory(productDetails); 
        //  clearProductDetails();    
     }
    return (
        <div className="grid grid-cols-2 gap-0 content-center ..." >
        <div style={containerStyle}>
          <div className="h-56 grid grid-cols-1 gap-0 mt-0">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '25px', fontWeight: 'bold',textAlign:'center', color: '#001C30' }}>New Categoy</h3>
            </div>
            <div className="mt-1 ">
              <input
                placeholder="Category Name"
                type="text"
                value={productName}
                onChange={handleCategoryNameChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
            </div>

            <div className="mt-1">
              <input
                placeholder="Description"
                type="text"
                value={description}
                onChange={handleCategoryDescriptionChange} 
                style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '40px', width: '300px' }}
              />
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

export default AddCategory;
