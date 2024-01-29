import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserFrom from "./views/UserFrom";
import Products from "./views/Product";
import  ProductFrom from "./views/ProductForm"
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserFrom key="userCreate"/>,
            },
            {
                path: '/users/:id',
                element: <UserFrom key="userUpdate" />,
            },

            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/new",
                element: <ProductFrom key="productCreate"/>,
            },
            {
                path: '/products/:id',
                element: <ProductFrom key="productUpdate" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
