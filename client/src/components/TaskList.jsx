import React from 'react'
import TaskCard from './TaskCard'
import { Box } from '@mui/material'

const TaskList = ({list, setData}) => {
  return (
    <Box display="flex" flexWrap={"wrap"} justifyContent="center" mt={2} gap={2}>
        {
            list.map((task, index) =>
                <TaskCard setData = {setData} data={task} key={index} />
            )
        }
    </Box>
  )
}

export default TaskList
