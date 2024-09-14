import axios from "axios";
export const UsePhoto = async (imgURL)=> {
    const formData = new FormData();
    formData.append('image',imgURL)
    const key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`,formData);
    // console.log(data.data.display_url);
    return data.data.display_url;
  }