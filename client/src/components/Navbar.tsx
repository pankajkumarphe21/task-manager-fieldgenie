import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar: React.FC = ({setData}) => {
  return (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button color="inherit" onClick={()=>setData(null)}> Add New</Button>
      </Toolbar>
  );
};

export default Navbar;