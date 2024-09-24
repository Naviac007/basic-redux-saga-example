import React, { useState,useEffect } from "react";

import Button from "@mui/material/Button";
//import "bootstrap/dist/css/bootstrap.min.css";
import * as Actions from "../store/get/get.action";
import DisplayTable from "../component/DisplayTable";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

import "../component/Background.css";
export default function Home(props) {
  //   const [result, setResult] = useState([]);
  const [resultFetched, setResultFetched] = useState(false);
  // const componentName = "Home";
  const [logData, updateLogData] = useState([]);
  //   const url = "https://jsonplaceholder.typicode.com/posts";
  //   const getResult = async () => {
  //     await axios
  //       .get(url)
  //       .then((response) => {
  //         //console.log(response.data);
  //         setResult(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };
  useEffect(()=>{
    if(logData.length===10){
     console.log(logData);
     updateLogData([]);
    }

  },[logData])
  const dispatch = useDispatch();
  const fetchResults = () => {
    dispatch(Actions.fetchData());
    setResultFetched(true);
    updateLogData((data)=>[
      ...data,
      "Results fetched"
    ]);
  };
  const deleteRow = (id) => {
    dispatch(Actions.deleteData(id));
    // setResult(result.filter(item => item.id !==id));
    updateLogData((data)=>[
      ...data,
      `Deleted data with id=${id}`
    ]);
  };
  const changeDetail = (id, text) => {
    dispatch(Actions.updateData(id, text));
    
    // let temp = [...result]
    // var index  = temp.findIndex(item => item.id ==id);
    // const newData = {
    //     "userId":temp[index].userId,
    //     "id":temp[index].id,
    //     "title":text,
    // }
    // temp[index] = newData
    // setResult(temp)
  };
  const headingStyle = {
    color: "black",
    boxShadow: 0,
    //color: "white",
    textAlign: "center",
  };
  return (
    <div className="page">
      <Box sx={headingStyle}>
        <h1>Task: Fetch data from API</h1>
      </Box>

      {!resultFetched && (
        <center>
          <Button
            variant="contained"
            color="success"
            style={{ fontSize: "23px" }}
            onClick={fetchResults}
          >
            <i style={{ marginRight: "10px" }} className="fas fa-cloud"></i>{" "}
            Fetch Data
          </Button>
        </center>
      )}
      {resultFetched && (
        <DisplayTable onDelete={deleteRow} onEdit={changeDetail} updateLogData={updateLogData}/>
      )}
    </div>
  );
}
