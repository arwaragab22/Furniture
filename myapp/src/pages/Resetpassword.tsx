// src/pages/ForgotPassword.tsx
import history from "history";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust this path as needed
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("A password reset link has been sent to your email.");
    } catch (error: any) {
      setErrorMsg("An error occurred. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Enter your email address and we’ll send you a link to reset your
          password.
        </Typography>

        {successMsg && (
          <Alert severity="success" sx={{ my: 2 }}>
            {successMsg}
          </Alert>
        )}
        {errorMsg && (
          <Alert severity="error" sx={{ my: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
        </Button>

        <Button
          fullWidth
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/login", { replace: true })}
        >
          Remember your password? Log in
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
