import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, put } from "./userService.js"; // Import get and put functions from apiService
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const {
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await get(`/users/${id}`);
        setUser(response.data.data);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setEmail(response.data.data.email);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await put(`/users/${id}`, {
        firstName,
        lastName,
        email,
      });
      console.log("User Updated:", response.data);
      setSuccess("User updated successfully!");
      navigate("/userlist");
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 500, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        </Box>
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : "Update User"}
          </Button>
        </Box>
        {success && (
          <Box mt={2}>
            <Alert severity="success">{success}</Alert>
          </Box>
        )}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default EditUser;
