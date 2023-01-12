
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout";
import Welcome from "./Components/Welcome";
import Game from "./Components/Game";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/play" element={<input />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
