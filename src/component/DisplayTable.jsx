//import "bootstrap/dist/css/bootstrap.min.css";
import { useState,forwardRef } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Container,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import MuiAlert from '@mui/material/Alert';

//import {withStyles} from "@mui/styles"
export default function DisplayTable(props) {
  
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [newTitle, setNewTitle] = useState();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState();
  const [saveButtonDisable, setSaveButtonDisable] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //const getSelectors = state=>({data: state.data})
  const data = useSelector((state) => state.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",

    boxShadow: 24,
    p: 2,
  };
  const handleClose = () => {
    setNewTitle();
    setShow(false);
  };
  const handleShow = (e) => {
    const id = e.target.getAttribute("name");

    console.log(id);
    setIndex(id);
    //const text = document.getElementById(id).innerText
    //console.log(text)
    setShow(true);
  };
  const saveClick = () => {
    // let title = document.getElementById("change").value
    console.log(newTitle);
    if (newTitle !== "") {
      props.onEdit(index, document.getElementById("change").value);
      setNewTitle();
      setSaveButtonDisable(true);
      setShow(false);
      setMessageInfo("Change Success");
      setOpen(true)
    }
  };
  const snackbarClose =()=>{
    setOpen(false)
  };
  return (
    <div
      className="table-resposive"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {/* { <table
        className="table table-striped table-hover"
        style={{ maxWidth: "1000px" }}
      >
        <thead className="bg-dark" style={{ color: "white" }}>
          <tr>
            <th>User ID</th>
            <th>Post ID</th>
            <th>Title</th>
            <th></th>
            <th></th>
          </tr>
     </thead>  */}
      {!!data?.length ? (
        <TableContainer component={Paper} sx={{ width: "90%", boxShadow: "2" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Post ID</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((res) => {
                  return (
                    <StyledTableRow key={res.id} hover>
                      <StyledTableCell>{res.userId}</StyledTableCell>
                      <StyledTableCell>{res.id}</StyledTableCell>
                      <StyledTableCell id={res.id}>{res.title}</StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleShow}
                          name={res.id}
                        >
                          <i
                            style={{ marginRight: "10px" }}
                            className="fas fa-edit"
                          ></i>{" "}
                          Edit
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="error"
                          id={res.id}
                          onClick={() => {  props.onDelete(res.id); setMessageInfo("Delete Success");setOpen(true)}}
                        >
                          <i
                            style={{ marginRight: "10px" }}
                            className="fas fa-trash-alt"
                          ></i>{" "}
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
            {/*         
        <tbody>
          {data.map((res) => {
            return (
              <tr key={res.id}>
                <td>{res.userId}</td>
                <td>{res.id}</td>
                <td id={res.id}>{res.title}</td>
                <td><button className='btn btn-primary' onClick={handleShow} name={res.id} ><i className="fas fa-edit"></i>  Edit</button></td>
                <td><button className='btn btn-danger' id={res.id} onClick={()=>props.onDelete(res.id)}><i className="fas fa-trash-alt"></i>  Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>} */}
          </Table>
          <TablePagination
            rowsPerPageOptions={[7]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <CircularProgress color="success" size={100}  />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <Paper sx={style}>
            <Container sx={{ color: "primary.main" }}>
              <h4>Please enter the new title</h4>
            </Container>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <TextField
                sx={{ width: "100%" }}
                id="change"
                autoComplete="off"
                label="Title"
                variant="filled"
                onChange={(event) => setNewTitle(event.target.value)}
                onFocus={() => {
                  setNewTitle("");
                  setSaveButtonDisable(false);
                }}
                error={newTitle === ""}
                helperText={newTitle === "" ? "Empty field!" : " "}
              />
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
              <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                color="primary"
                onClick={saveClick}
                disabled={saveButtonDisable || newTitle === ""}
              >
                Save Changes
              </Button>
            </Typography>
          </Paper>
        </Fade>
      </Modal>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        
        autoHideDuration={1000}
        onClose={snackbarClose}
      >
        <Alert
          onClose={snackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {messageInfo}
        </Alert>
      </Snackbar>
    </div>
  );
}
