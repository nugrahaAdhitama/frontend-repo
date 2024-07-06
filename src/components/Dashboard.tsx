"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDataAsync } from "@/store/fetchUserDataSlice";
import axios from "axios";
import { updateUserDataAsync } from "@/store/updateUserDataSlice";
import { RootState } from "@/store/store";
import { addNewUserAsync } from "@/store/addNewUserSlice"; // Add this line

interface Column {
  id: "name" | "email" | "address" | "phone" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

interface Data {
  docId: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

function createData(
  docId: string,
  name: string,
  email: string,
  address: string,
  phoneNumber: string
): Data {
  return { docId, name, email, address, phoneNumber };
}

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.fetchUserData.data);
  const userDataStatus = useSelector(
    (state: RootState) => state.fetchUserData.status
  );

  React.useEffect(() => {
    if (userDataStatus === "idle") {
      dispatch(fetchUserDataAsync());
    }
  }, [userDataStatus, dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<Data | null>(null);
  const [newUser, setNewUser] = React.useState<Data | null>(null);
  const [addUserOpen, setAddUserOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (user: Data) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    if (selectedUser) {
      dispatch(updateUserDataAsync(selectedUser));
      handleClose();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleAddUserOpen = () => {
    setNewUser(createData("", "", "", "", ""));
    setAddUserOpen(true);
  };

  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const handleAddUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (newUser) {
      setNewUser({
        ...newUser,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleAddUser = () => {
    if (newUser) {
      dispatch(addNewUserAsync(newUser));
      handleAddUserClose();
    }
  };

  // Convert userData to rows
  const rows =
    userData && userData.users
      ? userData.users.map(
          (user: {
            docId: string;
            name: string;
            email: string;
            address: string;
            phoneNumber: string;
          }) =>
            createData(
              user.docId,
              user.name,
              user.email,
              user.address,
              user.phoneNumber
            )
        )
      : [];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1>EBUDDY PTE LTD USER</h1>
      {/* <Button variant="contained" color="primary" onClick={handleAddUserOpen}>
        Add User
      </Button> */}
      <Dialog open={addUserOpen} onClose={handleAddUserClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newUser?.name || ""}
            onChange={handleAddUserInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            value={newUser?.email || ""}
            onChange={handleAddUserInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={newUser?.address || ""}
            onChange={handleAddUserInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={newUser?.phoneNumber || ""}
            onChange={handleAddUserInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserClose}>Cancel</Button>
          <Button onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpen(row)}
                              >
                                Update
                              </Button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={selectedUser?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            value={selectedUser?.email || ""}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={selectedUser?.address || ""}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={selectedUser?.phoneNumber || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
