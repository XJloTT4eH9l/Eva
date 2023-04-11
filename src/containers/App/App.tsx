import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoriesPages/CategoryPage";
import OrderPage from '../OrderPage/OrderPage';
import AboutPage from "../AboutPage/AboutPage";
import ContactPage from "../ContactPage/ContactPage";

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  return (
    <>
      <Header cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path='/categories' element={ <CatalogPage /> } />
        <Route path="/product/:id" element={ <ProductPage setCartOpen={setCartOpen}/>} />
        <Route path="/categories/:id" element={ <CategoryPage /> } />
        <Route path="/order" element={ <OrderPage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/contacts" element={ <ContactPage /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
