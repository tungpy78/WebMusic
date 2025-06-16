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
import path from "path";
import ForgotPassword from "../Pages/Client/ForgotPassword";
import VerifyOtp from "../Pages/Client/Verify-otp";
import ResetPassword from "../Pages/Client/ResetPassword";
import Profile from "../Pages/Client/Profile.page";
import Rank from "../Pages/Client/rank.page";
import AlbumPage from "../Pages/Client/album.page";
import AlbumDetail from "../Pages/Client/albumDetail";
import ArtistPage from "../Pages/Client/artis.page";


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
        element: (
            <ProtectedRoute>
                <LayoutDefault />
            </ProtectedRoute>
          ),
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
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/ranks",
                element: <Rank/>,
            },
            {
                path: "/album",
                element: <AlbumPage />,
            },
            {
                path: "/album/:albumId",
                element: <AlbumDetail />,
            },
            {
                path: "/artist/:artistId",
                element: <ArtistPage />,
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
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/verify-otp",
        element: <VerifyOtp />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    }
]