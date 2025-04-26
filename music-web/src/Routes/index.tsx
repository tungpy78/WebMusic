import { Navigate } from "react-router-dom";
import LayoutDefault from "../Layout/LayoutDefault";
import Dashboard from "../Pages/Client/Dashboard";
import Login from "../Pages/Client/Login.page";
import Register from "../Pages/Client/register.page";
import TopicDetail from "../Pages/Client/topicDetail.page";
import SongDetail from "../Pages/Client/songDetail.page";
import Library from "../Pages/Client/library.page";
import PlayListDetail from "../Pages/Client/playlistdetail";
import TopicMusic from "../Components/element/topicMusic";
import HistorySong from "../Pages/Client/history.page";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
};
const UnauthorizedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) return <Navigate to="/" replace />;

    return <>{children}</>;
}


export const routes =[
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/topics",
                element: <TopicMusic />,
            },
            {
                path: "/topic/:topicId",
                element: <TopicDetail />,
            },
            {
                path: "/song/:songId",
                element: <SongDetail />,
            },
            {
                path: "/library",
                element: <Library />,
            },
            {
                path: "/playlist/:playlistId",
                element: <PlayListDetail />,
            },
            {
                path: "/history",
                element: <HistorySong />,
            },
        ]

    },
    {
        path: "/login",
        element: (
            <UnauthorizedRoute>
              <Login />
            </UnauthorizedRoute>
          ),
    },
    {
        path: "/register",
        element: (
            <UnauthorizedRoute>
              <Register />
            </UnauthorizedRoute>
          ),
    },
]