import { Button, Checkbox, Fab, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../app/store";
import AddIcon from "@mui/icons-material/Add";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login Page
      </Button>
      <Typography>{user}</Typography>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} />
      <Checkbox {...label} disabled />
      <Checkbox {...label} checked />
    </div>
  );
};

export default Home;
