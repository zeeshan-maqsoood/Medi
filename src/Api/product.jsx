import axios from "axios";
const BaseUrl = "http://localhost:5001";
export const createProduct = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/api/addProduct`, {
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    console.log(error, "error");
    alert(error.message);
    return error.message;
  }
};

export const getProducts = async (currentpage, totalPages) => {
  try {
    const response = await axios.get(`${BaseUrl}/api?${currentpage}&&limit=10`);
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

export const editProducts=async(data)=>{
    console.log(data,"editData")
    try {
        const response=await axios.put(`${BaseUrl}/api/editProduct/${data._id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            data
        })
        return response
        
    } catch (error) {
      console.log(error)
        
    }
}


export const deleteProduct=async(id)=>{
  console.log(id,"id")
try {
  const response=await axios.delete(`${BaseUrl}/api/delete/${id}`)
  console.log(response,"response")
  return response
} catch (error) {
  console.log(error,"error")
}
}