import LayoutDefault from "../Layout/LayoutDefault";
import Dashboard from "../Pages/Client/Dashboard";
import Login from "../Pages/Client/Login.page";
import Register from "../Pages/Client/register.page";

export const routes =[
    {
        path: "/",
        element: <LayoutDefault/>,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
        ]

    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
]