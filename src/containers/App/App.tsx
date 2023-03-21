import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/catalog/:id" element={ <ProductPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
