import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
const UserContext = createContext();

function Createcontexdialog({ children }:{children:React.ReactNode}) {
     
         const [opendialog, setOpendialig] = React.useState(false);
       
         const handleClickOpen = () => {
           setOpendialig(true);
         };
         const handleClose = () => {
           setOpendialig(false);
         };
    return (
      <UserContext.Provider value={{ opendialog, handleClickOpen ,handleClose}}>
        {children}
      </UserContext.Provider>
    );
}
export default Createcontexdialog;
export const Usedialogcontext = () => {
    const dcontex = useContext(UserContext);

    return dcontex;
}