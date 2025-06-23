import { Slide, toast } from "react-toastify";
import LockIcon from "@mui/icons-material/Lock";
const Lock = () => {
  return <LockIcon />;
};
export const tooste = (message: string, statedis) => {
  console.log(statedis);
  toast.info(`${message}`, {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    transition: Slide,
    closeOnClick: true,
    style: {
      maxWidth: "400px",

      backgroundColor: "#2196F3", // info
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "10px",
    },
    icon: <Lock />,
    onClose: () => statedis(false),
  });
};
