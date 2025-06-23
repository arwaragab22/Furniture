import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, grey, purple, red } from "@mui/material/colors";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import Products from "./pages/Products/Products.tsx";
import Searchpage from "./pages/Searchpage/Searchpage.tsx";
import Fav from "./pages/fav/Fav.tsx";
import Productdetails from "./pages/productdetails/Productdetails.tsx";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Checkout from "./pages/Checkout.tsx";
import Cat from "./pages/cat/Cat.tsx";
import ForgotPassword from "./pages/Resetpassword.tsx";
import StripeWrapper from "./StripeWrapper";
import ProductFilterSidebar from "./components/Filter.tsx"
import Arwa from "./Arwa.tsx";
import AboutUs from "./pages/About.tsx";
import InfoPagesLayout from "./InfoPagesLayout.tsx";
import PrivacyPolicy from "./pages/Privcy.tsx";
import TermsConditions from "./pages/Terms.tsx";
import OurServices from "./pages/Services.tsx";
import ReturnPolicy from "./pages/Policy.tsx";
import FAQ from "./pages/Fqa.tsx";
import StoreLocator from "./pages/Locater.tsx";
import ContactUs from "./pages/Contactus.tsx";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    text: {
      primary: grey[900],
    },
    error: {
      main: red[300],
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:cateogry",
        element: <Products />,
      },
      {
        path: "/search",
        element: <Searchpage />,
      },
      {
        path: "/fav",
        element: <Fav />,
      },
      {
        path: "/products/:cat/:id",
        element: <Productdetails />,
      },
      {
        path: "/cat",
        element: <Cat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <StripeWrapper />,
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/arwa",
    element: <Arwa />,
  },
  {
    path: "/filter",
    element: <ProductFilterSidebar />,
  },

  {
    path: "/",
    element: <InfoPagesLayout />,
    children: [
      { path: "aboutus", element: <AboutUs /> },
      { path: "privcy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsConditions /> },
      { path: "services", element: <OurServices /> },
      { path: "policy", element: <ReturnPolicy /> },
      { path: "fqa", element: <FAQ /> },
      { path: "locator", element: <StoreLocator /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "ContactUs", element: <ContactUs /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </PrimeReactProvider>
);
