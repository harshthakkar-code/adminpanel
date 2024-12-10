import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/usersSlice';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the user from the Redux store if in edit mode
  const user = useSelector((state) => state.users.find((u) => u.id === userId));
  
  // Initial values for the form; use empty if creating, fields of the user if editing
  const isEditMode = Boolean(userId);
  const initialValues = user || { username: '', email: '', role: 'user' };

  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // To update form when user changes
    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(updateUser({ id: userId, ...values }));
      } else {
        dispatch(addUser({ id: Date.now().toString(), ...values }));
      }
      navigate('/');
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      padding={3}
    >
      <Typography variant="h5" gutterBottom>
        {isEditMode ? 'Edit User' : 'Create User'}
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: '100%', maxWidth: 500 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="role"
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              {isEditMode ? 'Update User' : 'Create User'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserForm;