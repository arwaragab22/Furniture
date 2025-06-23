import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey, purple, red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { producttype } from "../../type";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactImageMagnify from "react-image-magnify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  MailruIcon,
  MailruShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Product from "../../components/Product/Product";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Addtocartbynum } from "../../store/cart/cartslice";
import { Bounce, Slide, toast } from "react-toastify";
import { Addtofav, subtofav } from "../../store/favorite/favslice";
import { Usedialogcontext } from "../../components/contextdialog/Createcontexdialog";

function Productdetails() {
  const [stateoftooste, setstateoftooste] = useState(false);
      const { handleClose, opendialog, handleClickOpen } = Usedialogcontext();

  const { username } = useAppSelector((state) => state.user);

  const handleaddtocart = (id: number, n: number) => {
    dispatch(Addtocartbynum({ id, n }))
      .unwrap()
      .then((error) => {
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
          onClose: () => setstateoftooste(false),
          onOpen: () => setstateoftooste(true),
        });
      })
      .catch((error) => {
        setstateoftooste(true);
        if (username) {
          toast.info(
            error,

            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              style: {
                backgroundColor: "#b89ecf",
                color: "white",
              },
              transition: Bounce,
              onClose: () => setstateoftooste(false),
            }
          );
        } else {
          handleClickOpen();

        }
      });
  };
  const handletofav = (id: number) => {
    if (!islike) {
      toast.dismiss();

      dispatch(Addtofav(id))
        .unwrap()
        .then((error) => {
          setislike(!islike);

          setstateoftooste(true);
          toast.success(" Added to favorites ❤️", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            onClose: () => setstateoftooste(false),
          });
        })
        .catch((error) => {
          toast.dismiss(); //
          setstateoftooste(true);
          if (username) {
            setislike(!islike);

            toast(
              error,

              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

                transition: Bounce,
                onClose: () => setstateoftooste(false),
              }
            );
          } else {
            handleClickOpen()
          }
        });
    } else {
      setislike(!islike);

      toast.dismiss();
      dispatch(subtofav(id))
        .unwrap()
        .then((error) => {
          setstateoftooste(true);
          toast("❌ Removed from favorites", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            onClose: () => setstateoftooste(false),
          });
        })
        .catch((error) => {
          setstateoftooste(true);
          if (username) {
            toast.dismiss(); //
            toast(
              error,

              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
                onClose: () => setstateoftooste(false),
              }
            );
          } else {
            handleClickOpen();

          }
        });
    }
  };
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();
  const loc = useLocation();
  const [checkupdate, setcheckupdate] = useState(false);
  const [specificele, setspecificele] = useState<number>(1);

  const { id, cat } = useParams();
  const [quantity, setquantity] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [product, setProduct] = useState<producttype | null>(null);
  const [allproducts, setallproducts] = useState<producttype[]>([]);
  const shareUrl = window.location.href;
  useEffect(() => {
    const getProductById = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("id", "==", Number(id))
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProduct(data);
        } else {
        }

        const q2 = query(
          collection(db, "products"),
          where("id", "!=", Number(id)),
          where("category", "==", cat)
        );
        const querySnapshot2 = await getDocs(q2);
        const all = querySnapshot2.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return doc.data();
        });
        setallproducts(all);
      } catch (error) {}
    };

    getProductById();
    window.scrollTo(0, 0);
  }, [id, pathname]);
  const { fav } = useAppSelector((state) => state.fav);
  console.log(fav);
  const [islike, setislike] = useState<boolean>(fav.includes(product?.id ?? 0));

  return (
    <Box sx={{}}>
      <Box
        margin={1}
        sx={{
          padding: "20px 25px",
          fontSize: "22px",
          color: grey[900],
          backgroundColor: grey[300],
        }}
      >
        Home / products / {cat} / Mod{id}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center" },
          alignItems: { xs: "center" },
          padding: {
            xs: "5px",
            md: "20px",
          },
          flexDirection: { xs: "column", md: "row" },
        }}
        gap={4}
      >
        <Box
          sx={{
            height: 400,
            width: "100%",
            maxWidth: 600,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            paddingTop: "70px",
          }}
        >
          {islike ? (
            <IconButton
              sx={{ position: "absolute", top: "0px", right: "80px" }}
              aria-label="add to favorites"
              onClick={(e) => {
                e.stopPropagation();
                handletofav(product.id);
              }}
            >
              <FavoriteIcon sx={{ color: red[900] }} />
            </IconButton>
          ) : (
            <IconButton
              sx={{ position: "absolute", top: "0px", right: "80px" }}
              aria-label="add to favorites"
              onClick={(e) => {
                e.stopPropagation();
                handletofav(product.id);
              }}
            >
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </IconButton>
          )}
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "product image",
                isFluidWidth: false,
                width: 400,
                height: 400,
                src: product?.img,
                style: {
                  objectFit: "contain", // يحافظ على الأبعاد
                  width: "100%",
                  height: "100%",
                },
              },
              largeImage: {
                src: product?.img,
                width: 1000,
                height: 1000,
              },
              enlargedImageContainerStyle: {
                zIndex: 9,
                overflow: "hidden",
              },
              enlargedImageContainerDimensions: {
                width: "200%", // تكبير مناسب
                height: "100%",
              },
              isHintEnabled: !isMobile,
              shouldUsePositiveSpaceLens: !isMobile,
              enlargedImagePosition: isMobile ? "over" : "beside",
              pressDuration: isMobile ? 100 : 0,
            }}
          />
        </Box>

        <Box sx={{ flex: 1, padding: { xs: "10px" } }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: { xs: "20px", sm: "25px" },

              fontWeight: "bold",
            }}
          >
            {product?.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              color: "black",
              fontWeight: "bold",
              textDecoration: "underline",
              margin: "30px 0px",
            }}
          >
            3 Years Warranty
          </Typography>
          <Typography
            sx={{
              color: "white",
              backgroundColor: theme.palette.primary.main,
              padding: "3px 10px",
              width: "fit-content",
              margin: "30px 0px",
            }}
          >
            15% discount
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              width: "80%",
              margin: "30px 0px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "25px" },
                color: "black",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {product?.price}EGP
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "25px" },

                color: "black",
                fontWeight: "bold",
                textDecoration: "line-through",
              }}
            >
              {product?.price !== undefined &&
                ((product?.price * 1.15) % 1 == 0
                  ? product?.price * 1.15
                  : (product?.price * 1.15).toFixed(2))}
              EGP
            </Typography>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            style={{
              margin: "30px 0px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "25px",
                padding: "2px 2px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <IconButton size="small" disabled={checkupdate}>
                <RemoveIcon
                  fontSize="small"
                  onClick={() => {
                    if (specificele > 1) {
                      setcheckupdate(true);

                      setcheckupdate(false);
                      setspecificele(specificele - 1);
                    }
                  }}
                />
              </IconButton>

              <Typography>{specificele}</Typography>

              <IconButton size="small" disabled={checkupdate}>
                <AddIcon
                  fontSize="small"
                  onClick={() => {
                    setcheckupdate(true);

                    setspecificele(specificele + 1);
                    setcheckupdate(false);
                  }}
                />
              </IconButton>
            </Stack>
            <Button
              disabled={opendialog}
              sx={{
                color: "white",
                backgroundColor: theme.palette.primary.main,
                fontWeight: "bold",
                fontSize: { xs: "16px", md: "16px" },
                width: "fit-content",
                borderRadius: "26px",
                padding: "5px 8px",
                textTransform: "capitalize",
                "&.Mui-disabled": {
                  color: "white",
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0.7,
                },
              }}
              onClick={() => {
                if (product?.id) {
                  handleaddtocart(product?.id, specificele);
                }
              }}
            >
              Add to Cart
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography color="initial">share</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
              >
                <FacebookMessengerIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#0084FF" }}
                />
              </FacebookMessengerShareButton>

              <WhatsappShareButton url={shareUrl} separator=":: ">
                <WhatsappIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#25D366" }}
                />
              </WhatsappShareButton>

              <TelegramShareButton url={shareUrl}>
                <TelegramIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#0088cc" }}
                />
              </TelegramShareButton>

              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#0077b5" }}
                />
              </LinkedinShareButton>

              <TwitterShareButton url={shareUrl}>
                <TwitterIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#1DA1F2" }}
                />
              </TwitterShareButton>

              <EmailShareButton
                url={shareUrl}
                subject="Check this out!"
                body="Found this interesting: "
              >
                <EmailIcon
                  size={32}
                  round
                  iconFillColor="#fff"
                  bgStyle={{ fill: "#D44638" }}
                />
              </EmailShareButton>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ width: "50%", color: grey, margin: "30px auto" }} />
      <Box sx={{ margin: "20px 0px" }}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontSize: "25px",
            fontWeight: "bold",
            margin: "auto",
            textAlign: "center",
          }}
        >
          Related Products
        </Typography>
      </Box>
      <Box sx={{ marginTop: "1rem", padding: "5px" }}>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {allproducts?.map((ele) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ textAlign: "center", margin: "20px 0px" }}
            >
              <Product
                key={ele.title}
                productfurniture={ele}
                islikedproduct={false}
              ></Product>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Productdetails;
