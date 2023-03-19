import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomePage from "../HomePage/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Eva" element={ <HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
