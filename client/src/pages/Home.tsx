import { useEffect, useState } from "react";
import axios from "../config/axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      completed: true,
      deadline: "",
      description: "",
      title: "",
      user: "",
      __v: 0,
      _id: "",
    },
  ]);
  const navigate=useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isModalOpen,setIsModalOpen]=useState(false);
  const addTask = () => {
    axios
      .post(`/task/add/${localStorage.getItem("userId")}`, {
        date,
        title,
        desc,
      })
      .then(() => {
        setIsModalOpen(false)
      });
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`/auth/${userId}`).then((res) => {
      setTasks(res.data.tasks);
    });
  }, []);
  return (
    <div>
      <div style={{display:'flex'}}>
      {!isModalOpen && tasks.map(
        (
          task: {
            completed: Boolean;
            deadline: String;
            description: String;
            title: String;
            user: String;
            __v: Number;
            _id: String;
          },
          i
        ) => {
          return (
            <Box key={i} sx={{ width: 275,height:'250px' }}>
              <Card variant="outlined"  sx={{ width: 275,height:'250px' }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {task.description}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {task.deadline}
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="secondary" onClick={()=>{navigate(`/update/${task._id}`)}} size="small">Update Task</Button>
                </CardActions>
              </Card>
            </Box>
            
          );
        }
      )}
      </div>
      {!isModalOpen &&
      <Button sx={{marginTop:'30px'}} variant="contained" onClick={()=>{setIsModalOpen(true)}}>Add a new Task</Button>}
      {isModalOpen && <form
        onSubmit={addTask}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            width: "50%",
            height: "70vh",
            backgroundColor: "#d6e3e2",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ paddingBottom: "20px", width: "60%" }}>
            <InputLabel htmlFor="my-title">Title</InputLabel>
            <Input
              id="my-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </FormControl>
          <FormControl sx={{ paddingBottom: "20px", width: "60%" }}>
            <InputLabel htmlFor="my-desc">Description</InputLabel>
            <Input
              id="my-desc"
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </FormControl>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'30px',alignItems:'center'}}>
            <span style={{fontSize:'24px',width:'250px'}}>Deadline: </span>
            <input
              value={date}
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }} style={{height:'20px',}}
            />
          </div>
          <Button
            type="submit"
            sx={{ marginBottom: "20px" }}
            variant="contained"
          >
            Add Task
          </Button>
        </Card>
        
      </form>}
    </div>
  );
};

export default Home;
