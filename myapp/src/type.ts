import Product from "./components/Product/Product";


export type producttype = {
  category: string;
id:number,
  desc: string;

  img: string;

  numbers: number;

  price: number;

  title: string;
};
declare module "*.css";

// Define a type for the slice state
export type user = {
  username: string;

  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null|string,
};
export type  userlogin = {
  username: string,
  password:string


}
export type carttype = user & {
  products: {
    id: number,
    n:number
  }[]
};
export type favtype = user & {
  fav: number[];
};
export type cattype = {
  img:"string", cat:"string"
}