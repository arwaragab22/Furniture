import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Show when scrolled near bottom (e.g. footer)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight >= scrollHeight - 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        color="white"
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 20,
          zIndex: 9999,
        }}
      >
              <KeyboardArrowUpIcon sx={{color:"purple",fontSize:"45px"}} />
      </Fab>
    </Zoom>
  );
}
