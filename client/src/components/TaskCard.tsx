import { Card, Typography } from '@mui/material'

const TaskCard = ({ data, setData }) => {
    const { title, status, description, deadline } = data;

    // Set background color based on status
    const getCardColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ac6d0f'; // Light Orange for pending
            case 'completed':
                return '#1f7a24'; // Light Green for completed
            case 'terminated':
                return '#a72a2a'; // Light Red for terminated
            default:
                return '#f0f0f0'; // Default gray
        }
    };

    return (
        <Card
            sx={{
                width: 300,
                padding: 2,
                margin: 2,
                backgroundColor: getCardColor(status),  // Apply background color based on status
                cursor: 'pointer',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': {
                    boxShadow: 6, // Add a larger shadow on hover
                    transform: 'scale(1.05)', // Slight zoom on hover
                },
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth transition for hover effects
            }}
            onClick={() => setData(data)}
        >
            <Typography variant="h6" sx={{ color: '#e1e1e1', fontWeight: 'bold', marginBottom: 1 }}>
                {title}
            </Typography>
            <Typography fontSize={12} sx={{ color: '#d6d2d2', marginBottom: 1 }}>
                {status.toUpperCase()} • {deadline.slice(0, 10)}
            </Typography>
            <Typography sx={{ color: '#e8e6e6', fontSize: 14 }}>
                {description}
            </Typography>
        </Card>
    );
};

export default TaskCard;
