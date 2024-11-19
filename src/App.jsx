import { useState } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const handleLogin = () => {
//         setIsLoggedIn(true);
//   };

//   return (
//         <>
//             {(() => {
//                 if (!isLoggedIn) {
//                     return <LoginPage onLogin={handleLogin} />;
//                 } else {
//                     return (

//                        <LandingPage/>
//                     );
//                 }
//             })()}
//         </>
//     );
// }

// export default App;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            <BrowserRouter>
                <div className="w-full min-h-screen bg-white-950">
                    <Header isLoggedIn={isLoggedIn} />
                </div>

                <div>
                    <Footer></Footer>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
