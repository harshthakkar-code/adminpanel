import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.find((u) => u.id === userId));

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      padding={3}
    >
      <Card variant="outlined" sx={{ maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Role:</strong> {user.role}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ marginTop: 2 }}
            onClick={() => navigate(`/edit/${user.id}`)}
          >
            Edit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetail;