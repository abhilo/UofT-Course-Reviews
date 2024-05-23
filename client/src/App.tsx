import { Route, Routes } from "react-router-dom";
// import UserLanding from "./pages/UserLanding.jsx";
// import ContractorLanding from "./pages/ContractorLanding.jsx";
import "./App.css";
// import UserLogin from "./pages/UserLogin.jsx";
// import UserSignup from "./pages/UserSignup.jsx";
// import ContractorLogin from "./pages/ContractorLogin.jsx";
// import ContractorSignup from "./pages/ContractorSignup.jsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import Home from "./pages/Home.tsx";
import UserSignup from "./pages/UserSignup.tsx";
import UserLogin from "./pages/UserLogin.tsx";

const App = () => {
  return (
    <main className="">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
        </Routes>
      </AuthContextProvider>
    </main>
  );
};

export default App;
