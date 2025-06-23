


import Bookingform from "../components/Bookingform";

import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import Grid from '@mui/material/Grid'
import Orderreview from '../Components/Orderreview';
import { useEffect, useState } from 'react'

import { useForm, FormProvider } from "react-hook-form";
import "../index.css";
import { grey } from '@mui/material/colors'
import { Box } from '@mui/material';

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../shema";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import type z from "zod";

import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { query, where } from "firebase/firestore";
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
import type { producttype } from "../type";

function Checkout() {  const { username } = useAppSelector((state) => state.user);

  const [countryCode, setCountryCode] = useState("+30");

  const stripe = useStripe();
  const elements = useElements();
  const methods = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      studentPhone: "",
      parentPhone: "",
      email: "",
      fullName: "",
      address: "",
      buildingNo: "",
      postalCode: "",
      city: "",
      country: "",
      monthlySessions: "8",
      paymentMethod: "card",
      cardHolder: "",
      cardNumber: "",
      accountHolder: "",
      iban: ""
    }, mode: "onChange", 
  });


  type dataall = z.infer<typeof schema>;

  const onSubmit = async (data: dataall) => {
    alert("77")
    // ✅ الخطوة 1: ابعتي طلب للسيرفر عشان ترجعي clientSecret
    const response = await fetch(
      "http://localhost:4242/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 2000 }), // = 20 دولار مثلًا
      }
    );

    const { clientSecret } = await response.json();

    // ✅ الخطوة 2: استخدمي Stripe لتأكيد الدفع
    const result = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
      },
    });

    if (result?.paymentIntent?.status === "succeeded") {
      alert("✅ Payment successful (Real)");
    } else {
      console.error(result?.error);
      alert("❌ Payment failed");
    }
let a={            studentPhone: countryCode + "" + data.studentPhone,
  parentPhone: countryCode + "" + data.parentPhone}
    console.log(data);
  };



  const [sessions, setsessions] = useState(8);





  return (

    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box></Box>
      <Box sx={{ backgroundColor: grey[50], margin: "auto", width: "100%" }}>
        <Box
          sx={{
            width: { xs: "100%", md: "90%", lg: "80%" },
            margin: "auto",
            padding: { xs: "5px", md: "40px" },
            borderRadius: "25px",
          }}
        >
          <form
            onSubmit={methods.handleSubmit((data) =>
              onSubmit({ ...data})
            )}
          >
            <FormProvider {...methods}>
              <Grid container>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Bookingform
                    sessions={sessions}
                    setsessions={setsessions}
                    setCountryCode={setCountryCode}
                    countryCode={countryCode}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Orderreview
                    sessions={sessions}
              
                  />
                </Grid>
              </Grid>
            </FormProvider>
          </form>
        </Box>
        <ToastContainer position="top-center" />
      </Box>
      </Box>


  );
}

export default Checkout
