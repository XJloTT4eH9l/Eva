import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoriesPages/CategoryPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path='/categories' element={ <CatalogPage /> } />
        <Route path="/categories/product/:id" element={ <ProductPage />} />
        <Route path="/categories/:id" element={ <CategoryPage /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
