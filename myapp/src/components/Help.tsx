import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import { Box, IconButton, Typography, ClickAwayListener } from "@mui/material";

export default function HelpSpeedDial() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <FacebookIcon sx={{ color: "#1877f2" }} />,
      name: "Facebook",
      action: () => window.open("https://m.me/yourpage", "_blank"),
    },
    {
      icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
      name: "WhatsApp",
      action: () => window.open("https://wa.me/yourphonenumber", "_blank"),
    },
    {
      icon: <PhoneIcon sx={{ color: "#2196f3" }} />,
      name: "Call",
      action: () => window.open("tel:19744"),
    },
    {
      icon: <EmailIcon sx={{ color: "#EA4335" }} />,
      name: "Email",
      action: () => window.open("mailto:your@email.com"),
    },
  ];

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 2000 }}>
        {/* زر help الرئيسي */}
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            bgcolor: "white",
            width: 70,
            height: 70,
            borderRadius: "50%",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <ChatIcon sx={{ color: "#800080", fontSize: 30 }} />
          <Typography variant="caption" fontWeight="bold">
            Help
          </Typography>
        </IconButton>

        {/* SpeedDial */}
        {open && (
          <SpeedDial
            ariaLabel="Help Options"
            open
            direction="up"
            FabProps={{
              sx: { display: "none" }, // نخفي الزر الافتراضي
            }}
            sx={{
              position: "absolute",
              bottom: 80,
              left: 10,
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
            ))}
          </SpeedDial>
        )}
      </Box>
    </ClickAwayListener>
  );
}
