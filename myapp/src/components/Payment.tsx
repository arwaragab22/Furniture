import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { purple } from "@mui/material/colors";
import {
  collection,
  doc,
  
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAppSelector } from "../store/store";
import { FieldPath } from "firebase/firestore";
import { producttype } from "../type";
import Cartproduct from "./Cartproduct";
import { Addtocartbynum } from "../store/cart/cartslice";
import { useNavigate } from "react-router-dom";

export default function Payment({
  toggleDrawer,
  open,
}: {
  toggleDrawer: (a: boolean) => () => void;
  open: boolean;
  }) {
  const navigate = useNavigate();
  const { username } = useAppSelector((state) => state.user);
  const [totalprice, settotlprice] = React.useState(0);
const[products,setproducts]=React.useState<producttype[]>([])
  const [userData, setUserData] = React.useState<number[]>([]);
    const  cart  = useAppSelector((state) => state.cart);
  
  const numberofallproducts = cart.products.reduce((acu, cur) => {
    return acu + cur.n;
  }, 0);

  React.useEffect(() => {

    const getdata = async () => {
      const q = query(collection(db, "users"), where("email", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const idsprod = firstDoc.data().products || []; // مصفوفة أرقام

        // تقسيم الأرقام إلى chunks (حد أقصى 10 في كل استعلام)
        const chunks = [];
        for (let i = 0; i < idsprod.length; i += 10) {
          chunks.push(idsprod.slice(i, i + 10));
        }

        let results2:producttype[] = [];

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
        setproducts(results2)
        const totalpriceofall = results2.reduce((acu,cur) => {
        return acu+cur.price  
        }, 0)
      settotlprice(totalpriceofall)
      }
    };
    
    

    getdata();
  }, [cart.products]); // مهم تحط username كـ dependency

  const DrawerList = (
    <Box
      sx={{ width: 300, padding: "20px 8px", overflowX: "auto" }}
      role="presentation"
    >
      <Box
        display=""
        mx=""
        my=""
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Stack
          direction="row"
          gap={1}
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              color: purple[700],
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            my cart
          </Typography>
          <Typography> {numberofallproducts} items</Typography>
        </Stack>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={toggleDrawer(false)}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          marginTop: "15px",
          fontSize: "16px",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Cart Summary </Typography>
        <Typography>
          Subtotal
          <Box component="span" sx={{ fontWeight: "bold", marginLeft: "5px" }}>
            {totalprice} EGP
          </Box>
        </Typography>
      </Stack>
      <List>
        {products.map((ele) => (
          <ListItem key={ele.id} disablePadding>
            <Cartproduct data={ele}></Cartproduct>
          </ListItem>
        ))}
      </List>
      {products.length > 0 && (
        <Button
          onClick={()=>navigate("/checkout")}
          variant="contained"
          sx={{
            marginTop: "15px",
            width: "100%",
            borderRadius: "5px",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Chechout
        </Button>
      )}
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
}

