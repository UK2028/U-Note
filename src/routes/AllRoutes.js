import { Route, Routes } from "react-router-dom";

import { Home, Create } from '../pages'; 
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AllRoutes = () => {
  return (
    <main className="min-h-[90vh]">
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path='/create' element={<Create/>} />
        </Route>
    </Routes>
    </main>
  )
}
