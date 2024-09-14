import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { Suspense } from "react";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Suspense fallback><Dashboard/></Suspense>} />
        </Routes>
    )
}

export default Router;