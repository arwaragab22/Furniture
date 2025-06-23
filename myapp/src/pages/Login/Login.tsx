import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { auth} from "../../firebase/firebase";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { lgoinuser } from "../../store/user/userSlice";
import { ClipLoader } from "react-spinners";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const Login = () =>

{
  const location = useLocation();
  console.log(location)
  console.log(location&&location?.state?.from)
  const {loading,error} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;

      } else {
        // User is signed out
        // ...
      }
    });
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
type data = z.infer<typeof schema>;

  const onSubmit = (data: data) => {
    dispatch(lgoinuser(data)
    ).unwrap()
      .then((originalPromiseResult) => {
        if (location.state) {
          navigate(location?.state.from, { replace: true });
        }
        else {
          navigate("/", { replace: true });
        }
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    })

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
        <Box sx={{ textAlign: "center", mb:  1}}>
          <img src="logo1.png" alt="Logo" width="150px" />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" textAlign="center" color="text.secondary" mb={2} fontSize={'18px'}>
            Sign in to access your account and continue shopping.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

            <Box sx={{ textAlign: "right" }}>
              <NavLink to="/forgetpassword" underline="hover" fontSize="14px">
                Forget Password?
              </NavLink>
            </Box>

            <Button
              disabled={loading == "pending"}
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
              {loading == "pending" ? <ClipLoader color="white" /> : "login"}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Don’t have an account?{" "}
              <NavLink to="/register" underline="hover">
                Register
              </NavLink>
            </Typography>
          </Box>
          <Typography
            style={{ color: theme.palette.error.main, marginTop: "20px" }}
          >
            {error && "invalid username or password please try again"}
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
