import { Outlet } from "react-router-dom"
import Footer from "./component/Footer"
export default function Layout() {
  return (
    <div>
        <Outlet />
        <Footer/>
    </div>
  )
}
