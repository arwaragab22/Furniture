import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
  ToggleButton,
  Checkbox,
  Switch,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { grey, blue, lightGreen, lightBlue } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
import { db } from "../firebase/firebase";


import { useAppSelector } from "../store/store";
import {
  FieldPath,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { collection } from "firebase/firestore";

import { producttype } from "../type";
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface OrderReviewProps {
  sessions: number;
}

const Orderreview: React.FC<OrderReviewProps> = ({ sessions }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [totalprice, settotlprice] = React.useState(0);
  const [products, setproducts] = React.useState<producttype[]>([]);
  const [userData, setUserData] = React.useState<number[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const [ username,setusername ] = useState<string>();
  const numberofallproducts = cart.products.reduce((acu, cur) => {
    return acu + cur.n;
  }, 0);


  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user?.email) {
        setusername(user?.email);
      }
    });
    const getdata = async () => {
      console.log(username)
      const q = query(collection(db, "users"), where("email", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const idsprod = firstDoc.data().products || []; // مصفوفة أرقام

        const chunks = [];
        for (let i = 0; i < idsprod.length; i += 10) {
          chunks.push(idsprod.slice(i, i + 10));
        }

        let results2: producttype[] = [];

        for (const chunk of chunks) {
          const ids = chunk.map((item) => item.id);
          const productsQuery = query(
            collection(db, "products"),
            where("id", "in", ids) // البحث على حقل id (رقم)
          );
          const productsSnapshot = await getDocs(productsQuery);
          const products = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          results2 = [...results2, ...products];
        }
        setproducts(results2);
        const totalpriceofall = results2.reduce((acu, cur) => {
          return acu + cur.price;
        }, 0);
        settotlprice(totalpriceofall);
      }
    };
    getdata();
  }, [cart.products]); // مهم تحط username كـ dependency
  const auth = getAuth();



  const [Enableddescount, setEnableddiscount] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  console.log(products);
  const pricing: {
    [key: number]: { regular: number; discounted: number };
  } = {
    8: { regular: 14.0, discounted: 13.44 },
    12: { regular: 29.6, discounted: 28.42 },
    16: { regular: 44.4, discounted: 42.62 },
  };

  const selectedPrice = pricing[sessions] || { regular: 0, discounted: 0 };

  return (
    <Paper sx={{ backgroundColor: grey[100], height: "100%" }} elevation={1}>
      <Box
        sx={{
          padding: { xs: "15px", lg: 4 },
          pt: 4,
          backgroundColor: grey[100],
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          ORDER OVERVIEW
        </Typography>

        <Grid container mb={2} sx={{ display: "none" }}>
          {["4", "8", "12", "16", "20", "24"].map((val) => (
            <Grid item xs={6} md={4} key={val}>
              <Box
                onClick={() => setSelectedMonths(Number(val))}
                sx={{
                  padding: { xs: "5px 10px", md: "20px 10px" },

                  borderRadius: 1,
                  textAlign: "left",
                  fontSize: { xs: "14px", md: "16px" },
                  color: grey[700],
                  cursor: "pointer",
                  fontWeight: 500,
                  backgroundColor: "white",
                  transition: "0.5s",
                }}
              >
                {val} Months
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "25px 0px 40px 0px",
          }}
        >
          <Switch
            checked={checked}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setChecked(isChecked);
              setEnableddiscount(isChecked ? 5 : 0);
            }}
            color="success"
            size="medium"
          />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Pay in advance - <Box component="span">EXTRA 5% DISCOUNT</Box>
          </Typography>
        </Stack>

        <Stack spacing={2} mt={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Number of items:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {products.length}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Regular Price:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <del>{totalprice}€</del>
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Your Price:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {(
                totalprice -
                ((0.04 + Enableddescount) / 100) * totalprice
              ).toFixed(2)}
              €
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: lightGreen[500], textTransform: "uppercase" }}
          >
            <Typography variant="body2">
              Discount {4 + Enableddescount}%
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "21px" }}>
              -{((0.04 + Enableddescount / 100) * totalprice).toFixed(2)}€
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderColor: "white",
            borderWidth: "2px",
            margin: "10px 0px",
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: 3 }}
        >
          <Typography
            variant="body2"
            sx={{ color: grey[500], textTransform: "uppercase" }}
          >
            Setup fee
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: lightBlue[800],
              fontSize: "21px",
            }}
          >
            00.00€
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Typography
            variant="body2"
            sx={{ color: grey[500], textTransform: "uppercase" }}
          >
            Total P.M.
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: lightBlue[800],
              fontSize: "21px",
            }}
          >
            {(
              totalprice -
              ((0.04 + Enableddescount) / 100) * totalprice
            ).toFixed(2)}
            €
          </Typography>
        </Stack>

        <FormControlLabel
          control={<Checkbox {...register("terms")} />}
          sx={{ alignItems: "flex-start", fontSize: "14px" }}
          label={
            <Typography
              variant="body2"
              component="span"
              sx={{ color: grey[400], marginTop: "8px" }}
            >
              I accept the{" "}
              <span style={{ color: blue[500] }}>Terms & Conditions</span> and
              understand my{" "}
              <span style={{ color: blue[500] }}>right of withdrawal</span> as
              well as the circumstances that lead to repeal of the same
            </Typography>
          }
        />
        {errors.terms && (
          <FormHelperText error>{(errors.terms as any).message}</FormHelperText>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            padding: "15px",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            fontSize: "18px",
            color: "#fff",
            background: "linear-gradient(to left, #64b5f6, #1976d2)",
            "&:hover": {
              background: "linear-gradient(to left, #42a5f5, #1565c0)",
            },
          }}
        >
          Order Now
        </Button>
      </Box>
    </Paper>
  );
};

export default Orderreview;;
