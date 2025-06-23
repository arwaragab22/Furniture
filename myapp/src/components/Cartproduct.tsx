import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { producttype } from "../type";
import { grey } from "@mui/material/colors";
import { Close } from "@mui/icons-material";
import {
  Addtocartbynum,
  Getproductofuser,
  Removefromcart,
} from "../store/cart/cartslice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { memo, useEffect, useRef, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Slide, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteToastIcon = () => <DeleteIcon sx={{ color: "#fff" }} />;

function Cartproduct({ data }: { data: producttype }) {
  const { products } = useAppSelector((state) => state.cart);
  const [checkupdate, setcheckupdate] = useState(false);
  const count = useRef(0);
  const dispatch = useAppDispatch();
  const hanleremoveitem = (id: number) => {
    dispatch(Removefromcart(id))
      .unwrap()
      .then(() => {  toast.error("Deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

        style: {
          backgroundColor: "#be1b1b", // لون أحمر مميز
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "10px",
        },
        icon: <DeleteToastIcon />,
      });})
      .catch(() => {});
  };

  const [specificele, setspecificele] = useState<number>();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(Getproductofuser(user.email));
      }
    });

    return () => {
      unsubscribe(); // 👈 مهم جدًا لوقف التكرار
    };
  }, [dispatch]);

  useEffect(() => {
    const specificele = products.find((el) => {
      return el.id == data.id;
    });

    const numberp = specificele?.n;

    if (numberp) setspecificele(numberp);
  }, [products, data.id]);
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px 5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "10px",
        position: "relative",
      }}
    >
      <Box>
        <img
          src={data.img}
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            marginTop: "10px",
          }}
        />
      </Box>
      <Stack direction="column" padding={1}>
        <Typography sx={{ fontSize: "13px", color: grey[600] }}>
          {data.desc}
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: "1px solid #ccc",
                borderRadius: "25px",
                padding: "0px",
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
                    alert(specificele);
                    setcheckupdate(true);
                
                    dispatch(Addtocartbynum({ id: data.id, n: specificele-1 }))
                      .unwrap()
                      .then(() => {
                        setcheckupdate(false);
                        setspecificele(specificele - 1);

                      });
                  }}
                />
              </IconButton>

              <Typography>{specificele}</Typography>

              <IconButton size="small" disabled={checkupdate}>
                <AddIcon
                  fontSize="small"
                  onClick={() => {
                    setcheckupdate(true);
                    dispatch(Addtocartbynum({ id: data.id, n: specificele+1 }))
                      .unwrap()
                      .then(() => {
                        setcheckupdate(false);
                  
                        setspecificele(specificele + 1);

                      });
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
          <Typography sx={{ fontSize: "15px" }}>
            {data.price * specificele}
            <Typography component="span">EGP</Typography>
          </Typography>
        </Stack>
      </Stack>
      <IconButton
        aria-label="delete"
        size="small"
        style={{
          border: "1px solid grey",
          padding: "1px",
          marginBottom: "10px",

          width: "23px",
          height: "23px",
          position: "absolute",
          top: "7px",
          right: "8px",
        }}
        onClick={() => {
          hanleremoveitem(data.id);
        }}
      >
        <Close fontSize="15px" />
      </IconButton>
    </Paper>
  );
}

export default memo(Cartproduct);
