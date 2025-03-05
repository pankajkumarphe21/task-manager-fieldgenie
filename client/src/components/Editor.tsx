import { Box, FormControl, MenuItem, Select, TextField, Paper, Typography, Grid, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';

const Editor = ({ data }) => {
    const [form, setForm] = React.useState({
        title: '',
        desc: '',
        status: "active",
        deadline: null,
        priority: "medium",
        difficulty: "medium",
    });

    useEffect(() => {
        if (data) {
            setForm({
                ...data,
                deadline: dayjs(data.deadline)
            });
            console.log('Data:', data);
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if(data){
            try {
                const response = await axios.put(`${import.meta.env.VITE_HOST_API}/task/update/${data._id}`, form);
                console.log('Data updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
        else {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User not logged in');
                return;
            }
            try {
                const response = await axios.post(`${import.meta.env.VITE_HOST_API}/task/add/${userId}`, form);
                console.log('Data saved successfully:', response.data);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    };

    // Function to determine background color based on status or data
    const getEditorColor = () => {
        if (!data) return '#31a1de74'; // Default gray color when data is null
        switch (form.status) {
            case 'pending':
                return '#d0a935'; // Light yellow for pending
            case 'completed':
                return '#a5d6a7'; // Light green for completed
            case 'terminated':
                return '#ef9a9a'; // Light red for terminated
        }
    };

    return (
        <Paper
            sx={{
                padding: 3,
                maxWidth: 1100,
                margin: 'auto',
                mt: 4,
                backgroundColor: getEditorColor(), // Apply color based on status or data null
            }}
        >
            <Typography variant="h5">{data ? "Update" : "Create New"}</Typography>
            <TextField
                label="Title"
                variant="standard"
                fullWidth
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Write your title here"
                sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography>Priority:</Typography>
                    <FormControl>
                        <Select name="priority" variant="standard" value={form.priority} onChange={handleChange}>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography>Difficulty:</Typography>
                    <FormControl>
                        <Select name="difficulty" variant="standard" value={form.difficulty} onChange={handleChange}>
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography>Status:</Typography>
                    <FormControl>
                        <Select name="status" variant="standard" value={form.status} onChange={handleChange}>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="terminated">Terminated</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography>Deadline:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Deadline"
                            value={form.deadline}
                            onChange={(newValue) => setForm(prev => ({ ...prev, deadline: newValue }))}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Write your description here"
                sx={{ mt: 2 }}
            />

            <Button  variant="contained" sx={{ backgroundColor: "black", mt: 2 }} onClick={handleSave}> Save</Button>
        </Paper>
    );
};

export default Editor;
