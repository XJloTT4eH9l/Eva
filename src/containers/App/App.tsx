import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import FermentedJuicePage from "../CategoriesPages/FermentedJuicePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path='/catalog' element={ <CatalogPage /> } />
        <Route path="/catalog/:id" element={ <ProductPage />} />
        <Route path="/catalog/fermented-juice" element={ <FermentedJuicePage /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
