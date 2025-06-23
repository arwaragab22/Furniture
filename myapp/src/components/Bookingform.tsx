import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { Userformfield } from "./Userformfield";

// ✨ تحديد نوع props
interface BookingFormProps {
  sessions: any; // تقدر تستبدل any بالـ type الصحيح إذا عارفه
  setsessions: React.Dispatch<React.SetStateAction<any>>;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}

const Bookingform: React.FC<BookingFormProps> = ({
  sessions,
  setsessions,
  countryCode,
  setCountryCode,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: { xs: "15px", md: 4 },
        pt: 4,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "900",
          textTransform: "capitalize",
          color: grey[900],
        }}
      >
        Let’s Finish Up Your Order
      </Typography>

      <Userformfield
        sessions={sessions}
        setsessions={setsessions}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
      />
    </Box>
  );
};

export default Bookingform;
