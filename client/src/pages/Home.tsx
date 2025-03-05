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
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import TaskCard from "../components/TaskCard";
import TaskList from "../components/TaskList";

const Home = ({}) => {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to determine background color based on status
  const getEditorColor = (status) => {
    switch (status) {
      case "pending":
        return "#cc9f16b2"; // Light yellow for pending
      case "completed":
        return "#a5d6a7a9"; // Light green for completed
      case "terminated":
        return "#ef9a9aaf"; // Light red for terminated
    }
  };

  useEffect(() => {
    const fetchTasks = async (userId) => {
      try {
        const { data } = await axios.get(`/task/all/${userId}`);
        console.log(data);
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const userId = localStorage.getItem("userId");
    if (userId) {
      setUser(userId);
      fetchTasks(userId);

      // Fetch tasks every 3 seconds
      const intervalId = setInterval(() => {
        fetchTasks(userId);
      }, 3000);

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    } else {
      navigate("/login");
    }
  }, []);


  return (
    <Box backgroundColor={data ? getEditorColor(data.status) : '#31a1de74'} minHeight={"100vh"}>
      <Navbar setData={setData} />
      {/* Pass color based on data.status */}
      <Editor data={data} />
      {/* Pass color for TaskList based on status */}
      <TaskList setData={setData} list={tasks} />
    </Box>
  );
};

export default Home;
