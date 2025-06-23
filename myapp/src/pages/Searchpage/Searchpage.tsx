import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Product from "../../components/Product/Product";
import type { producttype } from "../../type";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ProductFilterPage from "../../components/Filtermenu";

function Searchpage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [allproducts, setallproducts] = useState<producttype[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true); // 👈 حالة التحميل
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [sortOption, setSortOption] = useState("");
  const [products, setproducts] = useState<producttype[]>([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const getdata = async () => {      const productsarray: producttype[] = [];

      const cat = searchParams.get("cat") || "";
      const text = searchParams.get("text")?.toLowerCase().split(" ") || [""];
      const querySnapshot = await getDocs(collection(db, "products"));
    
      if (selectedCategories.length == 0 && priceRange[0] === 0 && priceRange[1] === 4000 && sortOption == "") {
      console.log(sortOption,selectedCategories,priceRange[0]);
        if (cat == "ALL") {
          const products = querySnapshot.docs
            .map((doc) => ({
              ...doc.data(),
            }))
            .filter((product) => {
              const textmatch =
                text.length > 0
                  ? text.some(
                      (el) =>
                        product.title.includes(el) || product.desc.includes(el)
                    )
                  : product;
              return textmatch;
            });

          setallproducts(products);
        } else {
          const products = querySnapshot.docs
            .map((doc) => ({
              ...doc.data(),
            }))
            .filter((product) => {
              const catmatch =
                product.category?.toLowerCase().includes(cat?.toLowerCase()) ||
                false;
              const textmatch =
                text.length > 0
                  ? text.some(
                      (el) =>
                        product.title.includes(el) || product.desc.includes(el)
                    )
                  : product;

              return catmatch && textmatch;
            });

          setallproducts(products);
        }
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
      setallproducts([...productsarray]);
      setIsLoading(false); // 👈 ابدأ التحميل
      
    };
    getdata();
  }, [searchParams,priceRange,sortOption,products,selectedCategories]);

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
      <Box sx={{ marginTop: "1rem", flex: 1 }} mb={4}>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {allproducts.length > 0 ? (
            allproducts.map((ele) => (
              <Grid
                size={{ xs: 12, md: 6, lg: 4 }}
                sx={{ textAlign: "center" }}
              >
                <Product key={ele.title} productfurniture={ele}></Product>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                textAlign: "center",
                marginTop: "4rem",
                color: "grey.600",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <SentimentDissatisfiedIcon
                sx={{ fontSize: 60, color: "grey.500" }}
              />
              <Typography variant="h6" fontWeight={500}>
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search or filter to find what you're looking
                for.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Searchpage;
