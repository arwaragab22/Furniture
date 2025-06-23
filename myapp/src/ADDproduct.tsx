import React from "react";
import productsData from "./data.json";
import { db } from "./firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

type Product = {
  title: string;
  desc: string;
  price: number;
  img: string;
  category: string;
  numbers: number;
};

const ImportProducts: React.FC = () => {
  const handleImport = async () => {
    const products: Product[] = productsData.products;

    for (const product of products) {
      try {
        await addDoc(collection(db, "products"), product);
      
      } catch (error) {
      }
    }

    alert("✅ All products imported successfully!");
  };

  return <button onClick={handleImport}>Import Products to Firestore</button>;
};

export default ImportProducts;
