import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

import type { producttype } from "../../type";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Addtocart } from "../../store/cart/cartslice";
import { useState } from "react";
import { Addtofav, subtofav } from "../../store/favorite/favslice";
import { red } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { Usedialogcontext } from "../contextdialog/Createcontexdialog";

export default function Product({
  productfurniture,
  islikedproduct
}: {
  productfurniture: producttype;
  islikedproduct: boolean;
  }) {
        const { handleClose, opendialog, handleClickOpen } = Usedialogcontext();
  
  const [islike, setislike] = useState<boolean>(islikedproduct || false);
  const [stateoftooste, setstateoftooste] = useState(false);
  const navigate = useNavigate();
  const { username } = useAppSelector((state) => state.user);

  const { error } = useAppSelector((state) => state.cart);
  const notify = (error: string) =>
    toast(error, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const dispatch = useAppDispatch();

  const handleaddtocart = (id: number) => {
    dispatch(Addtocart(id))
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
    if (username) {
      setstateoftooste(true);

      if (!islike) {
        toast.dismiss();
        setislike(!islike);

        dispatch(Addtofav(id))
          .unwrap()
          .then((error) => {
            setstateoftooste(true);
            toast.success(" Added to favorites ❤️", {
              position: "top-center",
              autoClose: 600,
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

            if (username) {
              setstateoftooste(true);
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
                  icon: LockIcon, // ← هنا تضع الأيقونة
                  style: {
                    backgroundColor: "#facc15 ",
                    color: " black",
                    fontWeight: "bold",
                  },
                  transition: Slide,
                  onClose: () => setstateoftooste(false),
                }
              );
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
                  icon: LockIcon, // ← هنا تضع الأيقونة
                  style: {
                    backgroundColor: "#facc15 ",
                    color: " black",
                    fontWeight: "bold",
                  },
                  transition: Slide,
                  onClose: () => setstateoftooste(false),
                }
              );
            }
          });
      }
      setstateoftooste(false);

    }
    else {
      // tooste("You need to log in to save items to your favorites.", setdisbtn);
      handleClickOpen();
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: "auto",
          cursor: "pointer",
          height: "100%",
          marginTop: "20px",
        }}
      >
        <Box
          onClick={() => {
            navigate(
              `/products/${productfurniture.category}/${productfurniture.id}`
            );

            window.scrollTo(0, 0);
          }}
        >
          {" "}
          <CardMedia
            component="img"
            sx={{ objectFit: "cover", width: "100%" }}
            height="230"
            image={productfurniture?.img}
            alt="Paella dish"
          />
          <CardContent>
            <Typography>{productfurniture.title}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {productfurniture.desc}
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing>
          {islike ? (
            <IconButton
              disabled={stateoftooste}
              aria-label="add to favorites"
              onClick={(e) => {
                e.stopPropagation();
                handletofav(productfurniture.id);
              }}
            >
              <FavoriteIcon sx={{ color: red[900] }} />
            </IconButton>
          ) : (
            <IconButton
              disabled={stateoftooste}
              aria-label="add to favorites"
              onClick={(e) => {
                e.stopPropagation();
                handletofav(productfurniture.id);
              }}
            >
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </IconButton>
          )}
          <IconButton
            disabled={stateoftooste}
            aria-label="share"
            onClick={(e) => {
              e.stopPropagation();
              handleaddtocart(productfurniture.id);
            }}
            sx={{ padding: "8px" }}
          >
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </IconButton>
          <Typography sx={{ marginLeft: "auto" }}>
          
            {productfurniture.price.toLocaleString("en-EG")}EGP
          </Typography>
        </CardActions>
      </Card>
    </>
  );
}
