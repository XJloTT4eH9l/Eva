import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoriesPages/CategoryPage";
import OrderPage from '../OrderPage/OrderPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path='/categories' element={ <CatalogPage /> } />
        <Route path="/product/:id" element={ <ProductPage />} />
        <Route path="/categories/:id" element={ <CategoryPage /> } />
        <Route path="/order" element={ <OrderPage /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
