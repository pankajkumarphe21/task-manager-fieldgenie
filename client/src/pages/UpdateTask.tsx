import { Button, Card, FormControl, Input, InputLabel } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../config/axios";

const UpdateTask = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/task/${params.id}`).then((res) => {
      let temp = res.data.task;
      setTitle(temp.title);
      setDesc(temp.description);
      setCompleted(temp.completed);
    });
  }, []);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`/task/update/${params.id}`, { title, desc, completed })
      .then(() => {})
      .catch((err) => {
        console.log("error: ", err);
      });
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
          width: "50%",
          height: "90vh",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            alignItems: "center",
          }}
        ></div>
        <span style={{ fontSize: "20px" }}>
          Completed:
          <input
            name="completed"
            onClick={() => {
              setCompleted(!completed);
            }}
            type="radio"
          />
          Not Completed:
          <input
            name="completed"
            onClick={() => {
              setCompleted(!completed);
            }}
            type="radio"
          />
        </span>
        <Button
          type="submit"
          sx={{ marginTop: "20px" }}
          color="secondary"
          variant="contained"
        >
          Update
        </Button>
      </Card>
    </form>
  );
};

export default UpdateTask;
