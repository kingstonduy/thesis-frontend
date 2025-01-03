import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "./components/nike-landingpage/LandingPage";
import DropDownMenu from "./components/react-bootstrap/DropDownMenu";
import ProductGrid from "./components/ProductGrid";
import CheckoutPage from "./components/Checkout";
import ProductDetailPage from "./components/ProductDetail";
import { message } from "antd";
import LoginPage from "./components/Login";
import UserProfilePage from "./components/UserProfile";
import AboutUs from "./components/AboutUs";
import FooterPage from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import OrderTracking from "./components/Order";
import RegisterPage from "./components/Register";
import ProductGenderWoMen from "./components/ProductGridGenderWomen";
import ProductGenderMen from "./components/ProductGridGenderMen";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin(e) {
        console.log(e);
        message.success("Login successful!", 1); // 1 second duration
        setIsLoggedIn(true);
    }

    return (
        <BrowserRouter basename="/thesis-frontend/">
            {isLoggedIn ? (
                <>
                    <Header setIsLoggedIn={setIsLoggedIn} />
                    <ScrollToTop />
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
                        <Route
                            path="/user-profile"
                            element={<UserProfilePage />}
                        />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/order" element={<OrderTracking />} />
                        <Route
                            path="/products-gender-men"
                            element={<ProductGenderMen />}
                        />
                        <Route
                            path="/products-gender-women"
                            element={<ProductGenderWoMen />}
                        />
                    </Routes>
                    <FooterPage />
                </>
            ) : (
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="*"
                        element={<LoginPage handleLogin={handleLogin} />}
                    />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
