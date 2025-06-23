import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, TextField, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 

// Validation schema
const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
type data = z.infer<typeof schema>;
  const onSubmit = (data: data) => {
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then(async(userCredential) => {


try {
  const docRef = await addDoc(collection(db, "users"), {
    email: userCredential.user.email,
    role: "user",
    createdAt: serverTimestamp(),
  });

} catch (e) {

}

        navigate("/login", { replace: true });
        const user = userCredential.user;
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: grey[100],
        width: "100%",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img src="logo1.png" alt="Logo" width="120px" />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Create Your Account 
            </Typography>
      

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              placeholder="Enter your email"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Enter your password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "8px",
              }}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
