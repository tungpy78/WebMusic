import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Trang quản trị hệ thống</h1>

            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Tổng bài hát</h2>
                    <p className="text-2xl font-bold text-blue-500">1,024</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Người dùng</h2>
                    <p className="text-2xl font-bold text-green-500">512</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Nghệ sĩ</h2>
                    <p className="text-2xl font-bold text-purple-500">88</p>
                </div>
                <div className="bg-white shadow rounded-xl p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Lượt nghe hôm nay</h2>
                    <p className="text-2xl font-bold text-red-500">4,320</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
