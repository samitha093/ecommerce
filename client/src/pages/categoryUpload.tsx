import React, { useEffect, useState } from 'react';
import AddCategory from '../components/categoryUpload/addCategory';
import Toast from "../components/modules/toast";
import axios from "axios";
import CategoryTable from '../components/categoryUpload/categoryTable';
import SearchBars from '../components/modules/searchBars';
import GetAccessToken from '../components/modules/getAccessToken';
import getAccessToken from '../components/modules/getAccessToken';

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
    const [isUpdating, setIsUpdating] = useState(false); // State to track whether it's an update or new add
    const [isDelete, setIsDelete] = useState(false); // State to track whether it's an update or new add
    const [currentCategory, setCurrentCategory] = useState<Category>();
    const [accessToken, setAccessToken] = useState<string | null>(null);
  
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
      getAllCategorysFromStore();
      //for testing
      setCategorys((prevProducts) => [...prevProducts, category]);
    }
  }
  //add new category to store
  function addCategoryToStore(category: Category) {
    console.log("New received item : ", category.name);
    console.log("New received item : ", category);
   
      const myHost = sessionStorage.getItem('host');
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      };
      axios
        .post(`${myHost}/api/v1/categories/addnewcategory`, category, { headers: headers })
        .then((response) => {
          if(response.status == 200){
            Toast.fire({
              icon: 'success',
              title: 'New category added successfully'
            })
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
function getAllCategorysFromStore() {
    const myHost = sessionStorage.getItem('host');
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .get(`${myHost}/api/v1/categories/getallcategories`,{headers})
      .then((response) => {
        if (response.status === 200) {
          const categorys = response.data;
          setCategorys(categorys);
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
          }
    
          //real code
          updateCategoryItem(category);
          getAllCategorysFromStore(); 
          setIsUpdating(false);
        }
//update category in the store
function updateCategoryItem(category: Category) {
    const myHost = sessionStorage.getItem('host');
    const categoryId = category.id; // Assuming that 'id' is the image ID property
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    axios
      .put(`${myHost}/api/v1/categories/updatecategory/${categoryId}`, category, { headers })
      .then((response) => {
        if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Category item updated successfully',
          });
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
    //for testing
    const updatedProducts = categorys.filter(category => category.id !== id);
    setCategorys(updatedProducts); 
    console.log(categorys);
    
    //real code
    removeCategoryFromStore(id);    
    getAllCategorysFromStore();
    setIsDelete(true);
  }
  //delete category from store
  function removeCategoryFromStore(id: number) {
    const myHost = sessionStorage.getItem('host');
    // Define the headers with the access token
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
      axios
        .delete(`${myHost}/api/v1/categories/deletecategory/${id}` , { headers: headers })
        .then((response) => {
          if (response.status === 200) {
            Toast.fire({
              icon: 'success',
              title: 'Category deleted successfully'
            });

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
//search category by id
const searchCategoryByKey = (itemKey: string) =>{
    console.log("searçh category by id : ",itemKey);
    const categoryId = parseInt(itemKey, 10);
    getCategoryByUsingImageId(categoryId);
  }
//get category By id
  const getCategoryByUsingImageId = (categoryId: number) => {
      const myHost = sessionStorage.getItem('host');
      // Define the headers with the access token
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      axios
        .get(`${myHost}/api/v1/categories/getcategorybyid/${categoryId}`,{headers}) 
        .then((response) => {
          if (response.status === 200) {
            const categorys = response.data;
            setCategorys(categorys);
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
      const myHost = sessionStorage.getItem('host');
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
           Category upload Service  </h1>
          </div>
          <div className="col-span-4" style={{ marginRight: '200px' }}>
          <SearchBars
           placeholder="Search category by ID"
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
