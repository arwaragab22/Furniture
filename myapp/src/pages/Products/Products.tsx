import { useParams } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Product from "../../components/Product/Product";
import type { producttype } from "../../type";
import ProductFilterPage from "../../components/Filtermenu";
import { number } from "zod/v4";
import { useMediaQuery } from "@mui/material";
function Products() {
  const { cateogry } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 حالة التحميل
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [sortOption, setSortOption] = useState("");
  const [products, setproducts] = useState<producttype[]>([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    const fetchproducts = async () => {        debugger;

      const productsarray: producttype[] = [];
      if (selectedCategories.length < 1) {
        setIsLoading(true); //
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          if (doc?.data()?.category === cateogry) {
            if (
              doc.data().price > priceRange[0] &&
              doc.data().price < priceRange[1]
            ) {
              productsarray?.push(doc.data() as producttype);
            }
          }
        });
        setproducts([...productsarray]);
        setIsLoading(false); // 👈 ابدأ التحميل
      }
      else {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        console.log(querySnapshot.docs)
    
        querySnapshot.forEach((doc) => {
          if (selectedCategories.includes(doc?.data()?.category)) {
            if (
              doc.data().price > priceRange[0] &&
              doc.data().price <= priceRange[1]
            ) {

              productsarray?.push(doc.data() as producttype);
            }
          }
        });
      }
            console.log(sortOption);
            if (sortOption) {
              if (sortOption === "low") {
                productsarray.sort((a, b) => {
                  return a.price - b.price;
                });
              } else {
                console.log(productsarray);
                productsarray.sort((a, b) => {
                  return b.price - a.price;
                });
              }
            }
      console.log(selectedCategories);
      setproducts([...productsarray]);
      setIsLoading(false); // 👈 ابدأ التحميل
    };

    fetchproducts();
  }, [cateogry, selectedCategories, priceRange, sortOption]);

  return (
    <Box
      sx={{
        margin: "1rem 0rem",
        display: "flex",
        flexDirection: `${!isMobile ? "row" : "column"}`,
      }}
    >
      <ProductFilterPage
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOption={sortOption}
        setSortOption={setSortOption}
      ></ProductFilterPage>
    
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "space-around",
            alignItems: "stretch",
            flex: 1,
          }}
        >
          {isLoading
            ?
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
          : products.length > 0 ?
            (products?.map((ele) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  sx={{
                    flex: 1,
                    justifyContent: "start",
                    alignItems: "stretch",
                    minWidth: " fit-content !important",
                  }}
                  key={ele.title}
                >
                  <Product productfurniture={ele}></Product>
                </Grid>
            )))
        
            :
            (<Box>    <Typography variant="h6" sx={{ mt: 4, textAlign: "center", mb: 4 }}>
          No products found matching your filter 😕
          <br />
          Try adjusting your filters to see more results.
        </Typography></Box>)
        }
        </Grid>
      
    
      
    </Box>
  );
}

export default Products;
