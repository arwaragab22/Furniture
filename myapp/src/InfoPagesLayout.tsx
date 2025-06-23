import { useEffect, useState } from 'react'
import "primereact/resources/themes/saga-purple/theme.css"; // أو أي ثيم تحبه
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import './App.css';
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import { onAuthStateChanged } from 'firebase/auth';
import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { auth } from './firebase/firebase';
import { setuser } from './store/user/userSlice';
import { useAppDispatch } from './store/store';
import { Getproductofuser } from './store/cart/cartslice';
import { Box, IconButton, Typography } from '@mui/material';

import ChatIcon from "@mui/icons-material/Chat";
import { EmailIcon, FacebookIcon } from 'react-share';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import Footer from './components/Footer';
import BestSellingSlider from './components/MOST';
import HelpSpeedDial from './components/Help';
import { Bounce, ToastContainer } from 'react-toastify';
import CustomizedDialogs from './components/Dialoglogin';
import Createcontexdialog, { Usedialogcontext } from './components/contextdialog/Createcontexdialog';

function InfoPagesLayout() {
  const toast = useRef(null);

  const items = [
    {
      icon: <FacebookIcon style={{ color: "#0084FF", fontSize: 28 }} />,
      command: () => window.open("https://m.me/yourpage", "_blank"),
    },
    {
      icon: <WhatsAppIcon style={{ color: "#25D366", fontSize: 28 }} />,
      command: () => window.open("https://wa.me/yourphonenumber", "_blank"),
    },
    {
      icon: <PhoneIcon style={{ color: "#34b7f1", fontSize: 28 }} />,
      command: () => window.open("tel:19744"),
    },
    {
      icon: <EmailIcon style={{ color: "#EA4335", fontSize: 28 }} />,
      command: () => window.open("mailto:your@email.com"),
    },
  ];

  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setuser(user.email));
        if (user?.email) {
          dispatch(Getproductofuser(user?.email));
        }
      } else {
        // المستخدم مش مسجل دخول
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Createcontexdialog>
      <Header></Header>
      <Outlet></Outlet>
      <div className="card">
        <HelpSpeedDial></HelpSpeedDial>
        <Footer></Footer>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
      <CustomizedDialogs></CustomizedDialogs>
    </Createcontexdialog>
  );
}

export default InfoPagesLayout;
