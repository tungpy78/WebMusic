import LayoutDefault from "../Layout/LayoutDefault";
import Dashboard from "../Pages/Client/Dashboard";

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

    }
]