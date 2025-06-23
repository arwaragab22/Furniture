import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useAppSelector } from "../../store/store";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import Product from "../../components/Product/Product";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import  type { favtype } from "../../type"
const Fav = () => {


  const [favProducts, setFavProducts] = useState<favtype[]>([]);
  const [loading, setLoading] = useState(true);
  const {username} = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavProducts = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", username));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.empty) {
          setLoading(false);
          return;
        }

        const userData = userSnapshot.docs[0].data();
        const favIds = userData.fav; // array of numbers

        // جلب جميع المنتجات
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const allProducts = productsSnapshot.docs.map((doc) => doc.data());

        // فلترة المنتجات اللي ids بتاعتها في favIds
        const favProductsList = allProducts.filter((p) =>
          favIds.includes(p.id)
        );

        setFavProducts(favProductsList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchFavProducts();
  }, [auth.currentUser, favProducts]);



  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {!loading? (
          favProducts.length > 0 ? (
            favProducts?.map((ele) => (
              <Grid size={4} sx={{ textAlign: "center" }} mt={2} mb={4}>
                <Product
                  key={ele?.id}
                  productfurniture={ele}
                  islikedproduct={true}
                ></Product>
              </Grid>
            ))
          ) : (
            <Box textAlign="center" mt={6} mb={6}>
              <FavoriteBorderIcon sx={{ fontSize: 80, color: "#ccc" }} />
              <Typography variant="h5" mt={2}>
                Your favorites list is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Start exploring and tap the ❤️ icon to add items you love!
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, borderRadius: "20px", padding: "8px 20px" }}
                onClick={() => navigate("/cat")} // Or whatever your browse route is
              >
                Browse Products
              </Button>
            </Box>
          )
        ) : (
          Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={330}
                sx={{
                  maxWidth: 345,
                  margin: "auto",
                  cursor: "pointer",
                  height: "100%",
                  marginTop: "20px",
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Fav;
