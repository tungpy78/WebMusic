import React, { useEffect, useState } from 'react';
import { getAllSongAdmin } from '../../Services/song.service';
import { getTopicAdmin } from '../../Services/topic.service';
import { getArtist } from '../../Services/artist.service';
import { getAlbum } from '../../Services/album.service';
import { getuser } from '../../Services/dashboardAdmin.service';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

const Dashboard: React.FC = () => {
    const [songCount, setSongCount] = useState(0);
    const [artistCount, setArtistCount] = useState(0);
    const [topicCount, setTopicCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [albumCount, setAlbumCount] = useState(0);
    const [topSongs, setTopSongs] = useState<{ title: string; like: number; avatar: string }[]>([]);

    const fetchSongs = async () => {
        const res = await getAllSongAdmin();
        const songs = res.data;
        setSongCount(songs.length);
        const filtered = songs
            .filter((s: any) => s.like > 0)
            .sort((a: any, b: any) => b.like - a.like)
            .slice(0, 10)
            .map((s: any) => ({
                title: s.title,
                like: s.like,
                avatar: s.avatar
            }));
        setTopSongs(filtered);
    };

    const fetchArtists = async () => {
        const res = await getArtist();
        setArtistCount(res.data.length);
    };

    const fetchTopics = async () => {
        const res = await getTopicAdmin();
        setTopicCount(res.data.length);
    };

    const fetchAlbums = async () => {
        const res = await getAlbum();
        setAlbumCount(res.data.length);
    };

    const fetchUsers = async () => {
        const res = await getuser();
        setUserCount(res.data.length);
    };

    useEffect(() => {
        fetchSongs();
        fetchArtists();
        fetchTopics();
        fetchAlbums();
        fetchUsers();
    }, []);

    const chartData = {
        labels: topSongs.map(song => song.title),
        avatars: topSongs.map(song => song.avatar), // custom cho plugin
        datasets: [
            {
                label: 'Lượt thích',
                data: topSongs.map(song => song.like),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderRadius: 5,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        layout: {
            padding: { bottom: 60 }
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Số lượt thích của tất cả bài hát',
                font: {
                    size: 24,
                    weight: 'bold' as const,
                    family: 'Arial'
                },
                color: '#333'
            },
            customImageLabels: {
                avatars: topSongs.map(song => song.avatar)
            }
        },
        scales: {
            x: {
                ticks: { display: false }
            }
        }
    };

    const customImageLabels = {
        id: 'customImageLabels',
        afterDatasetsDraw(chart: any) {
            const {
                ctx,
                chartArea: { bottom },
                scales: { x },
                config
            } = chart;

            const avatars = chart.config.options.plugins.customImageLabels?.avatars || [];

            avatars.forEach((avatarUrl: string, index: number) => {
                if (!avatarUrl) return;
                const image = new Image();
                image.src = avatarUrl;
                image.onload = () => {
                    const xPos = x.getPixelForTick(index);
                    const size = 40;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(xPos, bottom + size / 2 + 10, size / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(image, xPos - size / 2, bottom + 10, size, size);
                    ctx.restore();
                };
            });
        }
    };

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, customImageLabels);

    return (
        <div style={{ width: '95%', height: '100vh' ,padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9'}}>
            <h2 style={{ marginBottom: '30px', paddingTop: '10px' }}>Bảng thống kê</h2>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                marginBottom: '30px',
                flexWrap: 'wrap',
                fontSize: '22px'
            }}>
                <Card title="Tổng bài hát" count={songCount} color="#FF8C00" />
                <Card title="Tổng album" count={albumCount} color="#2E8B57" />
                <Card title="Tổng người dùng" count={userCount} color="#DC143C" />
            </div>

            <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
            }}>
                {/* Biểu đồ bên trái */}
                <div style={{
                    flex: 2,
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    minWidth: '300px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    <div style={{ minWidth: `${topSongs.length * 120}px` }}>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Hai card dọc bên phải */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    minWidth: '180px',
                    fontSize: '22px'
                }}>
                    <Card title="Tổng nghệ sĩ" count={artistCount} color="#6A5ACD" />
                    <Card title="Tổng thể loại" count={topicCount} color="#20B2AA" />
                </div>
            </div>
        </div>
    );
};

type CardProps = {
    title: string;
    count: number;
    color: string;
};

const Card: React.FC<CardProps> = ({ title, count, color }) => (
    <div style={{
        backgroundColor: color,
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        textAlign: 'center',
        flex: 1
    }}>
        <h4 style={{ marginBottom: '10px' }}>{title}</h4>
        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{count}</p>
    </div>
);

export default Dashboard;
