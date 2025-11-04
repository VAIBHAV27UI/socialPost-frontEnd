import { Navigate, Outlet } from "react-router-dom"

const ProtectedAdmin = () => { 

    const token = localStorage.getItem("token")
    return token ? <Outlet/> : <Navigate to="/admin/login" replace />

}

export default ProtectedAdmin