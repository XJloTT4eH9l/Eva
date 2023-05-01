import { useState, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import ScrollTopBtn from "../../components/ScrollTopBtn/ScrollTopBtn";

import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoriesPages/CategoryPage";
import OrderPage from '../OrderPage/OrderPage';
import AboutPage from "../AboutPage/AboutPage";
import ContactPage from "../ContactPage/ContactPage";
import SearchPage from "../SearchPage/SearchPage";

import { IProductDetail } from "../../types/types";

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchList, setSearchList] = useState<IProductDetail[]>([]);

  return (
    <>
    <Suspense fallback={ <Spinner /> }>
      <Header 
        cartOpen={cartOpen} 
        setCartOpen={setCartOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchList={searchList}
        setSearchList={setSearchList}
      />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path='/categories' element={ <CatalogPage /> } />
        <Route path="/product/:id" element={ <ProductPage setCartOpen={setCartOpen} />} />
        <Route path="/categories/:id" element={ <CategoryPage /> } />
        <Route path="/order" element={ <OrderPage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/contacts" element={ <ContactPage /> } />
        <Route path="/search" element={ 
          <SearchPage 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            searchList={searchList}
            setSearchList={setSearchList}
          /> 
        } />
      </Routes>
      <Footer />
      <ScrollTopBtn />
      </Suspense>
    </>
  )
}

export default App;