import axios from "axios";

export const  getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
     const result =  await axios.get(url)
      return result.data;
  };
