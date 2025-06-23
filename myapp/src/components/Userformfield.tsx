import { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { grey } from "@mui/material/colors";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import "./a.css";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { db } from "../firebase/firebase";
import { useAppSelector } from "../store/store";
import { collection, FieldPath, getDocs, query, where } from "firebase/firestore";
import { producttype } from "../type";
import Cartproduct from "./Cartproduct";
import { Addtocartbynum } from "../store/cart/cartslice";
import { useNavigate } from "react-router-dom";
import {

  CardElement,

} from "@stripe/react-stripe-js";



countries.registerLocale(enLocale);

interface Country {
  code: string;
  name: string;
}

interface UserformfieldProps {
  countryCode: string;
}

export const Userformfield = ({ countryCode }: UserformfieldProps) => {
  const countryList: Country[] = Object.entries(countries.getNames("en")).map(
    ([code, name]) => ({ code, name })
  );


  const {
    register,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const CustomInput = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
  >((props, ref) => (
    <input
      {...props}
      ref={ref}
      placeholder={props.placeholder || "رقم الهاتف"}
      style={{
        paddingLeft: "60px",
        height: "40px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
      }}
    />
  ));

  const selectedSession = watch("monthlySessions");
  const [phonecode1, setPhonecode1] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    console.log("Selected country code: ", countryCode);
  }, [countryCode]);

  return (
    <Box
      sx={{
        padding: { xs: "5px", md: 2 },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "start",
      }}
    >
      <Box>
        {" "}
        <Typography variant="subtitle2" sx={{ fontSize: ".9rem", mt: 2 }}>
          <Box component="span" sx={{ color: grey[500] }}>
            Phone Number
          </Box>{" "}
        </Typography>
        <Controller
          name="studentPhone"
          control={control}
          render={({ field, fieldState }) => (
            <div className="phone-wrapper" style={{ zIndex: 90 }}>
              <PhoneInput
                {...field}
                country="ae" // 🇦🇪
                enableSearch
                disableDropdown={false}
                countryCodeEditable={false}
                inputProps={{ name: "studentPhone" }}
                inputClass="custom-phone-input"
                buttonClass="custom-flag-button"
                containerClass="custom-phone-container"
                dropdownClass="custom-dropdown"
              />

              {(!field.value || field.value === "+971") && (
                <span className="placeholder-overlay"></span>
              )}

              {fieldState.error && (
                <p className="error-message">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </Box>

      <Box>
        {" "}
        <Typography variant="subtitle2" sx={{ fontSize: ".9rem" }}>
          <Box component="span"></Box>
          <Box component="span" sx={{ color: grey[500] }}>
            Alternative Phone (optional)
          </Box>
        </Typography>
        <Controller
          name="parentPhone"
          control={control}
          render={({ field, fieldState }) => (
            <div className="phone-wrapper" style={{ zIndex: 9 }}>
              <PhoneInput
                {...field}
                country="ae" // 🇦🇪
                enableSearch
                disableDropdown={false}
                countryCodeEditable={false}
                inputProps={{ name: "parentPhone" }}
                inputClass="custom-phone-input"
                buttonClass="custom-flag-button"
                containerClass="custom-phone-container"
                dropdownClass="custom-dropdown"
              />

              {(!field.value || field.value === "+971") && (
                <span className="placeholder-overlay"></span>
              )}

              {fieldState.error && (
                <p className="error-message">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
          CONTACT EMAIL ADDRESS
        </Typography>
        <TextField
          fullWidth
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>

      <Box>
        {" "}
        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
          CONTACT NAME
        </Typography>
        <TextField
          fullWidth
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Box>

      <Box>
        {" "}
        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
          Billing Address
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Address"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="No"
              {...register("buildingNo")}
              error={!!errors.buildingNo}
              helperText={errors.buildingNo?.message}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Postal Code"
            {...register("postalCode")}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="City"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl
            fullWidth
            error={!!errors.country}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          >
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              displayEmpty
              defaultValue=""
              {...register("country")}
              label="Country"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: "300px",
                    zIndex: 1300,
                  },
                },
              }}
              sx={{ backgroundColor: "#fff" }}
              renderValue={(selected) => (selected ? selected : "")}
            >
              <MenuItem value=""></MenuItem>

              {countryList.map(({ code, name }) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>

            {errors.country && (
              <Typography variant="caption" color="error">
                {errors.country.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ display: "none" }}>
        {" "}
        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
          Monthly Sessions
        </Typography>
        <FormControl fullWidth error={!!errors.monthlySessions}>
          <Select
            value={selectedSession || ""}
            displayEmpty
            onChange={(e) => {
              setValue("monthlySessions", e.target.value, {
                shouldValidate: true,
              });
              props.setsessions(e.target.value);
            }}
            renderValue={(selected) =>
              selected ? (
                `${selected} Sessions`
              ) : (
                <span style={{ color: "#888" }}>Select number of sessions</span>
              )
            }
          >
            <MenuItem value="" disabled>
              Select number of sessions
            </MenuItem>
            <MenuItem value="8">8 Sessions</MenuItem>
            <MenuItem value="12">12 Sessions</MenuItem>
            <MenuItem value="16">16 Sessions</MenuItem>
          </Select>

          {errors.monthlySessions && (
            <Typography variant="caption" color="error">
              {errors.monthlySessions.message}
            </Typography>
          )}
        </FormControl>
      </Box>
      <CheckoutForm />

    

    </Box>
  );
};
const CheckoutForm = () => {



  return (
    <Box>
      <Typography variant="subtitle2" sx={{ color: grey[500] }}>
        Card Details
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#fff",
          minHeight: "50px",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                lineHeight: "24px",
                fontFamily: "Arial, sans-serif",
                "::placeholder": {
                  color: "#888",
                },
              },
              invalid: {
                color: "#e5424d",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};