import React, { useEffect, useState } from 'react';
import AddCategory from '../components/categoryUpload/addCategory';
import Toast from "../components/modules/toast";
import axios from "axios";
import CategoryTable from '../components/categoryUpload/categoryTable';
import SearchBars from '../components/modules/searchBars';

interface CategoryUploadProps {
   
}
interface DivStyle {
    backgroundColor: string;
    padding: string;
  }
interface Category {
    id: number;
    name: string;
    description: string;
  }
const CategoryUpload: React.FC<CategoryUploadProps> = ({  }) => {
    const [categorys, setCategorys] = useState<Category[]>([]); // Initialize categorys state as an empty array
    const [categorysCopy, setCategorysCopy] = useState<Category[]>([]); // Initialize categorys state as an empty array
    const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
    const [isDelete, setIsDelete] = useState(false); // State to track whether it's an update or new add
    const [currentCategory, setCurrentCategory] = useState<Category>();
    const [accessToken, setAccessToken] = useState<string>("");
    
    const testCategory=[
      {
        "id": 1,
        "name": "Electronics",
        "description": "Category for electronic products"
      },
      {
        "id": 2,
        "name": "Clothing",
        "description": "Category for clothing items"
      },
      {
        "id": 3,
        "name": "Books",
        "description": "Category for books and reading materials"
      }
    ]

    const defaultCategory: Category = {
        id: 0,
        name: '',
        description: '',
      };
    const divStyle1: DivStyle = {
        backgroundColor: 'white', 
        padding: '10px', 

      };
      const divStyle2: DivStyle = {
        backgroundColor: 'white',
        padding: '10px'
      };
//add new category
const addNewCategory = (category: Category) =>{
    console.log(category);
    //checheck null
    if(category.name === '' || category.description === ''){
        Toast.fire({
            icon: 'error',
            title: 'Please fill all the fields'
          })
    }
    else{
      addCategoryToStore(category);
      
      //for testing
      // setCategorys((prevProducts) => [...prevProducts, category]);
    }
  }
  //add new category to store
  function addCategoryToStore(category: Category) {
    console.log("New received item : ", category.name);
    console.log("New received item : ", category);
   
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      };
      axios
        .post(`/api/v1/product/categories/addnewcategory`, category, { headers: headers })
        .then((response) => {
          if(response.status == 200){
            Toast.fire({
              icon: 'success',
              title: 'New category added successfully'
            })
            getAllCategorysFromStore(accessToken);
            return true;
          }
          else{
            Toast.fire({
              icon: 'error',
              title: 'Can not add new category'
            })
            return false;
          }
  
        })
        .catch(() => {
            Toast.fire({
              icon: 'error',
              title: 'Can not add new category'
            })
            return false;
        });
 }
 //get all categories from the store
function getAllCategorysFromStore(accessToken1:string) {
    
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken1}`,
      'Content-Type': 'application/json',
    };
    console.log("headers : ",headers);
    axios
      .get(`/api/v1/product/categories/getallcategories`,{headers})
      .then((response) => {
        if (response.status === 200) {
          const categorys = response.data.data;
          setCategorys(categorys);
          setCategorysCopy(categorys);
          console.log('Retrieved categories:', categorys);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve categories'
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to retrieve categories'
        });
      })
  }
//update existing category
const updateExisingCategory = (category: Category) =>{
        //testing
        const updatedIndex = categorys.findIndex(p => p.id === category.id);
          if (updatedIndex !== -1) {
            // Create a copy of the categorys array
            const updatedProducts = [...categorys];
            updatedProducts[updatedIndex] = category;
            setCategorys(updatedProducts);
            setCategorysCopy(updatedProducts);
          }
    
          //real code
          updateCategoryItem(category);
          // getAllCategorysFromStore(accessToken); 
          setIsUpdating(false);
        }
//update category in the store
function updateCategoryItem(category: Category) {
    
    const categoryId = category.id; // Assuming that 'id' is the image ID property
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .put(`/api/v1/product/categories/updatecategory/${categoryId}`, category, { headers })
      .then((response) => {
        if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Category item updated successfully',
          });
          getAllCategorysFromStore(accessToken);
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update Category item',
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Failed to update Category item',
        });
      });
  }
    //update category data load
const loadDataForUpdate = (category: Category) =>{
    setIsUpdating(true);
    setCurrentCategory(category);
}
  //remove  category by id
  const removeCategoryById = (id: number) =>{
    removeCategoryFromStore(id);    
  
    setIsDelete(true);
  }
  //delete category from store
  function removeCategoryFromStore(id: number) {
    
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
      axios
        .delete(`/api/v1/product/categories/deletecategory/${id}` , { headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Category deleted successfully'
            });
            getAllCategorysFromStore(accessToken);

          } else {
            Toast.fire({
              icon: 'error',
              title: 'Can not delete Category'
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Can not delete Category'
          });
        });
   }

// Search category by Name
const searchCategoryByKey = (itemName: string) => {
  console.log("Search category by Name: ", itemName);

  if (itemName !== '') {
    // Filter the categorys array to find categories with names that contain the search term (case-insensitive)
    const filteredCategorys = categorysCopy.filter((category) =>
      category.name.toLowerCase().includes(itemName.toLowerCase())
    );

    if (filteredCategorys.length > 0) {
      // You can do something with the filtered categories here
      console.log("Filtered categories by Name:", filteredCategorys);
      setCategorys(filteredCategorys);

    } else {
      setCategorys([]);
      console.log("No categories found with the provided name.");
    }
  }
  else {
    // If the search term is an empty string, set categorys to the original categorys array
    setCategorys(categorysCopy);
  }
}

//get category By id
  const getCategoryByUsingImageId = (categoryId: number) => {
      
      // Define the headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      axios
        .get(`/api/v1/categories/getcategorybyid/${categoryId}`,{headers}) 
        .then((response) => {
          if (response.status === 200) {
            const categorys = response.data;
            setCategorys(categorys);
            setCategorysCopy(categorys);
            console.log('Retrieved category:', categorys);
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Failed to retrieve category'
            });
          }
        })
        .catch(() => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to retrieve category'
          });
        });
    };
    function getAccessToken() { 
      let refreshToken = sessionStorage.getItem('refresh_token');
    
      //test
     
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
            getAllCategorysFromStore(access_token);
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
    // setCategorys(testCategory);
    // setCategorysCopy(testCategory);
   
  }
  , []);

    return (
        <div >
        <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
          <h1 className="text-4xl font-bold text-blue-500 text-center">
           Category upload Service  </h1>
          </div>
          <div className="col-span-4" style={{ marginRight: '200px' }}>
          <SearchBars
           placeholder="Search category by Name"
          searchProductByKey={searchCategoryByKey}/>
          </div>
      </div>
         <div className="grid grid-cols-8">
          <div className="col-span-4" style={divStyle1}>
            <AddCategory 
              onAddCategory ={addNewCategory}
               updateExisingCategory={updateExisingCategory}
               currentCategory={currentCategory || defaultCategory}
               isUpdating={isUpdating}
               /> 
          </div>
          <div className="col-span-4" style={divStyle2}>
         <CategoryTable 
         categorys={categorys} 
         loadDataForUpdate={loadDataForUpdate}  
         removeCategoryById={removeCategoryById}
         /> 
          </div>
      </div>
    </div>
    );
};

export default CategoryUpload;
