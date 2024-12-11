import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import LandingPage from "./components/nike-landingpage/LandingPage";
import DropDownMenu from "./components/react-bootstrap/DropDownMenu";
import ProductGrid from "./components/ProductGrid";
import CheckoutPage from "./components/Checkout";
import ProductDetailPage from "./components/ProductDetail";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            <BrowserRouter basename="/thesis-frontend/">
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/menu" element={<DropDownMenu />} />
                    <Route path="/products" element={<ProductGrid />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductDetailPage />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
