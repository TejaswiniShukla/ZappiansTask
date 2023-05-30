import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import EditPage from "./EditPage";
import {
  deleteUserService,
  showAllService,
} from "./Utilities/Axios/apiService";

function UserTable() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
 const [editItem,setEditItem]=useState({});

  const handleOpen = (item) => {
    setOpen(true);
    setEditItem(item);
   
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  useEffect(() => {
    console.log("User effecet");
    (async function getData() {
      let userList = await showAllService();
      setUser(userList.data.data);
    })();
  }, [open]);

  const delteUserFunc = async (id) => {
    const deletedUser = await deleteUserService({
      id: id,
    });
    if (deletedUser) {
      let service = await showAllService();
      console.log(service, "All USers idhr");
      setUser(service.data.data)
    }
  };

  return (
    <>
    {open&&( <EditPage item={editItem} open={open} handleClose={handleClose} />)}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <h3>Name</h3>
          </TableCell>
          <TableCell>
            <h3>Email</h3>
          </TableCell>
          <TableCell>
            <h3>MobileNumber</h3>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {user &&
           
          user.map((item, index) => {
            return (
             
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>
                  <Button
                    sx={{ marginRight: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={()=>handleOpen(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => delteUserFunc(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
         
            );
          })}
      </TableBody>

      
    </Table>
    </>

  );
}

export default UserTable;
