import { Outlet } from "react-router-dom";
import Signup from "./components/Signup"
import { AuthContext } from "./store/AuthContext"
import { useContext } from "react"
import Welcome from "./components/Welcome";

function App() {
  const {islLoggedIn, token} = useContext(AuthContext);

  return (
    <>
      {token && <Welcome />}
      <Outlet />
    </>
  )
}

export default App
