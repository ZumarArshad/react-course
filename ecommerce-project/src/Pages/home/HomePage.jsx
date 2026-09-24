import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { ProductsGrid } from "./ProductsGrid.jsx";
import "./HomePage.css";

export function HomePage({cartItems}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () =>{
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    getHomeData();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="images/favicon/home-favicon.png"
      />
      <title>Ecommerce Project</title>
      <Header cartItems={cartItems} />
      <div className="home-page">
       <ProductsGrid products={products} />
      </div>
    </>
  );
}
