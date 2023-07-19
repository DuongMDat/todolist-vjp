import { Navigate } from "react-router-dom"
export default function PrivateRouter({children}) {
    let txtData = localStorage.getItem("user")
    let data = JSON.parse(txtData)
    return data ? children : <Navigate to={"/login"} />
    
}