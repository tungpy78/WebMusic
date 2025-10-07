import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "../../assets/scss/playlist.scss"
import { Link } from "react-router-dom";
import { deletePlayList, getPlayList } from "../../Services/playlist.service";
import { Playlist1 } from "../../models/song.model";
import Favorite from "../../Components/element/favorite";
import { toast, ToastContainer } from "react-toastify";
import PlaylistPage from "../../Components/element/playlist.page";

function Library(){
    return(
        <>
        <h1>Thư viện <PlayCircleOutlined /></h1>
        <PlaylistPage/>
        <Favorite />
        </>
    )
}
export default Library;