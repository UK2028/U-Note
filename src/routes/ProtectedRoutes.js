import { Navigate, Outlet } from "react-router-dom";

import { auth } from "../firebase/config";

export const ProtectedRoutes = () => {

  const uid = JSON.parse(localStorage.getItem("user"))?.uid || false;

  const authId = auth?.currentUser?.uid;

  return (
    <div>
      {(uid===authId && authId) ? <Outlet/> : <Navigate to="/"/>}  
    </div>
  )
}
