import React, { useState } from "react";
import { post } from "./userService.js";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await post("/users", { name, job });
      console.log("User Created:", response.data);
      setSuccess("User created successfully!");
      setName("");
      setJob("");
    } catch (error) {
      console.error("Failed to create user:", error);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 500, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Job"
            variant="outlined"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </Box>
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create User"}
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

export default CreateUser;
