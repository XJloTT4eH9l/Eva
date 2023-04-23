import { useState, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { API_LANGS } from "../../constants/api";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoriesPages/CategoryPage";
import OrderPage from '../OrderPage/OrderPage';
import AboutPage from "../AboutPage/AboutPage";
import ContactPage from "../ContactPage/ContactPage";
import SearchPage from "../SearchPage/SearchPage";

import { IProductDetail, Lang } from "../../types/types";

function App() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchList, setSearchList] = useState<IProductDetail[]>([]);

  const [langs, setLangs] = useState<Lang[]>();

  useEffect(() => {
    const getLangs = async () => {
      const res = await axios.get(API_LANGS);
      console.log(res.data);
      setLangs(res.data);
    }
    getLangs();
  }, [])

  useEffect(() => {
    console.log(langs);
  }, [langs])

  return (
    <>
    <Suspense fallback='loading...'>
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
      </Suspense>
    </>
  )
}

export default App;