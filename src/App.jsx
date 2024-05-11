import { Outlet } from "react-router-dom";
import Signup from "./components/Signup"
import { AuthContext } from "./store/AuthContext"
import { useContext } from "react"

function App() {
  // const {islLoggedIn, token} = useContext(AuthContext);

  return (
    <>
      <Signup />
      <Outlet />
    </>
  )
}

export default App
