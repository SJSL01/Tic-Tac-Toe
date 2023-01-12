
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout";
import Welcome from "./Components/Welcome";
import Game from "./Components/Game";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { AuthContextProvider } from "./Context/AuthContext";
import { ChannelContextProvider } from "./Context/ChannelContext";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ChannelContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/play" element={<Game />} />
            </Routes>
          </Layout>
        </ChannelContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
