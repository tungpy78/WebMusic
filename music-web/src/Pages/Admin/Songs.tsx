import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Divider } from 'antd';

const Songs = () => {
    // const [showForm, setShowForm] = useState(false);
    // const [topicName, setTopicName] = useState('');
    // const [topicRole, setRoleTopic] = useState('Ca sĩ');
    // const [selectedSong, setSelectedSong] = useState(null); // lưu bài hát đang xem
    // const [showDetailModal, setShowDetailModal] = useState(false); // hiện form chi tiết
    // const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    // const [accounts, setTopics] = useState(Array.from({ length: 3 }, (_, i) => ({
    //     id: i + 1,
    //     name: `Vai trò ${i + 1}`,
    //     role: 'Ca sĩ',
    //     created: '2024-01-01',
    //     updated: '2024-05-01'
    // })));
    // const [currentPage, setCurrentPage] = useState(0);
    // const accountsPerPage = 8;
    // const totalPages = Math.ceil(accounts.length / accountsPerPage);
    // const startIndex = currentPage * accountsPerPage;
    // const currentTopics = accounts.slice(startIndex, startIndex + accountsPerPage);

    // const handleSave = () => {
    //     if (!topicName.trim()) return;
    //     const newTopic = {
    //         id: accounts.length + 1,
    //         name: topicName,
    //         role: topicRole,
    //         created: new Date().toISOString().split('T')[0],
    //         updated: new Date().toISOString().split('T')[0]
    //     };
    //     setTopics([...accounts, newTopic]);
    //     alert(`Đã lưu: ${topicName}`);
    //     setTopicName('');
    //     setShowForm(false);
    //     setCurrentPage(Math.floor((accounts.length) / accountsPerPage)); // chuyển tới trang mới
    // };

    // const handleCancel = () => {
    //     setTopicName('');
    //     setShowForm(false);
    // };

    // const [song, setSong] = useState([
    //     {
    //         id: 1,
    //         name: "Yêu 5",
    //         role: "Ca sĩ",
    //         description: "Bài hát nổi tiếng của Rhymastic",
    //         genre: "Pop",
    //         likes: 1000,
    //         listens: 50000,
    //         album: "Không thuộc album nào",
    //         lyric: "Tình yêu đến em không mong đợi gì...",
    //         avatar: "https://link-to-image.jpg",
    //         isLocked: false,
    //         created: "2024-01-01",
    //         updated: "2024-05-01"
    //     }
    // ]);



    return (<></>)
        // <div style={{width: '90%', maxHeight: '90%'}}>
        //     <div style={{
        //         width: '100%',
        //         margin: '0 auto',
        //         backgroundColor: '#fff',
        //         borderRadius: '8px',
        //         padding: '20px',
        //         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        //     }}>
        //         <div style={{
        //             display: 'flex',
        //             justifyContent: 'space-between',
        //             alignItems: 'center',
        //             marginBottom: '20px'
        //         }}>
        //             <h2 style={{
        //                 fontSize: '26px',
        //                 fontWeight: '600',
        //                 color: '#1976d2',
        //                 margin: 0,
        //                 textShadow: '0 1px 1px rgba(0,0,0,0.05)',
        //                 letterSpacing: '0.5px'
        //             }}>
        //                 Danh sách bài hát
        //             </h2>
        //
        //
        //             <button
        //                 onClick={() => setShowForm(true)}
        //                 onMouseEnter={() => setIsHoveringAdd(true)}
        //                 onMouseLeave={() => setIsHoveringAdd(false)}
        //                 style={{
        //                     padding: '8px 16px',
        //                     backgroundColor: isHoveringAdd ? '#45a049' : '#4CAF50',
        //                     color: 'white',
        //                     border: 'none',
        //                     borderRadius: '4px',
        //                     cursor: 'pointer',
        //                     transition: 'background-color 0.3s ease'
        //                 }}
        //             >
        //                 Thêm bài hát
        //             </button>
        //         </div>
        //
        //         <div style={{
        //             display: 'grid',
        //             gridTemplateColumns: '10% 20% 20% 15% 15% 20%',
        //             fontWeight: 'bold',
        //             padding: '12px 16px',
        //             backgroundColor: '#f1f1f1',
        //             borderBottom: '2px solid #ddd',
        //             borderRadius: '8px 8px 0 0'
        //         }}>
        //             <div>STT</div>
        //             <div>Tên bài hát</div>
        //             <div>Mô tả</div>
        //             <div>Ngày tạo</div>
        //             <div>Ngày cập nhật</div>
        //             <div style={{textAlign: 'center'}}>Hành động</div>
        //         </div>
        //
        //         {currentTopics.map((account, index) => (
        //             <div
        //                 key={account.id}
        //                 style={{
        //                     display: 'grid',
        //                     gridTemplateColumns: '10% 20% 20% 15% 15% 20%',
        //                     padding: '12px 16px',
        //                     backgroundColor: '#fff',
        //                     marginBottom: '8px',
        //                     borderRadius: '6px',
        //                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        //                     alignItems: 'center',
        //                     transition: 'background-color 0.2s',
        //                     cursor: 'default'
        //                 }}
        //                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
        //                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        //             >
        //                 <div>{startIndex + index + 1}</div>
        //                 <div>{account.name}</div>
        //                 <div>{account.role}</div>
        //                 <div>{account.created}</div>
        //                 <div>{account.updated}</div>
        //                 <div style={{display: 'flex', justifyContent: 'center', gap: '4px'}}>
        //                     <button
        //                         style={{
        //                             padding: '6px 6px',
        //                             backgroundColor: 'transparent',
        //                             color: '#9e9e9e',  // màu icon mặc định
        //                             border: 'none',
        //                             borderRadius: '4px',
        //                             cursor: 'pointer',
        //                             marginRight: '2px'
        //                         }}
        //                     >
        //                         <FontAwesomeIcon
        //                             icon={['fas', 'eye']}
        //                             style={{
        //                                 color: '#9e9e9e',  // màu icon mặc định
        //                                 transition: 'transform 0.2s ease, color 0.2s ease',
        //                                 cursor: 'pointer'
        //                             }}
        //                             onClick={() => {
        //                                 setSelectedSong(accounts);
        //                                 setShowDetailModal(true);
        //                             }}
        //                             onMouseEnter={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1.2)';
        //                                 e.currentTarget.style.color = '#616161';  // màu xám đậm khi hover
        //                             }}
        //                             onMouseLeave={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1)';
        //                                 e.currentTarget.style.color = '#9e9e9e';  // trở lại màu xám nhẹ
        //                             }}
        //                         />
        //                     </button>
        //
        //                     <button
        //                         style={{
        //                             padding: '6px 6px',
        //                             backgroundColor: 'transparent',
        //                             color: '#4CAF50',
        //                             border: 'none',
        //                             borderRadius: '4px',
        //                             cursor: 'pointer',
        //                             marginRight: '2px'
        //                         }}
        //                     >
        //                         <FontAwesomeIcon
        //                             icon={['fas', 'pen']}
        //                             style={{
        //                                 color: '#2196F3',
        //                                 transition: 'transform 0.2s ease, color 0.2s ease',
        //                                 cursor: 'pointer'
        //                             }}
        //                             onMouseEnter={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1.2)';
        //                                 e.currentTarget.style.color = '#0d47a1';
        //                             }}
        //                             onMouseLeave={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1)';
        //                                 e.currentTarget.style.color = '#2196F3';
        //                             }}
        //                         />
        //                     </button>
        //
        //                     <button
        //                         style={{
        //                             padding: '6px 6px',
        //                             backgroundColor: 'transparent',
        //                             color: '#4CAF50',
        //                             border: 'none',
        //                             borderRadius: '4px',
        //                             cursor: 'pointer',
        //                             marginRight: '2px'
        //                         }}
        //                     >
        //                         <FontAwesomeIcon
        //                             icon={['fas', 'trash']}
        //                             style={{
        //                                 color: '#f44336', // Màu đỏ
        //                                 transition: 'transform 0.2s ease, color 0.2s ease',
        //                                 cursor: 'pointer'
        //                             }}
        //                             onMouseEnter={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1.2)';
        //                                 e.currentTarget.style.color = '#b71c1c'; // Màu đỏ đậm khi hover
        //                             }}
        //                             onMouseLeave={(e) => {
        //                                 e.currentTarget.style.transform = 'scale(1)';
        //                                 e.currentTarget.style.color = '#f44336';
        //                             }}
        //                         />
        //                     </button>
        //                 </div>
        //             </div>
        //         ))}
        //
        //         {totalPages > 1 && (
        //             <div style={{marginTop: '20px', textAlign: 'center'}}>
        //                 {Array.from({length: totalPages}, (_, pageIndex) => (
        //                     <button
        //                         key={pageIndex}
        //                         onClick={() => setCurrentPage(pageIndex)}
        //                         style={{
        //                             margin: '0 5px',
        //                             padding: '6px 12px',
        //                             border: '1px solid #ccc',
        //                             backgroundColor: currentPage === pageIndex ? '#4CAF50' : '#fff',
        //                             color: currentPage === pageIndex ? '#fff' : '#000',
        //                             borderRadius: '4px',
        //                             cursor: 'pointer'
        //                         }}
        //                     >
        //                         {pageIndex + 1}
        //                     </button>
        //                 ))}
        //             </div>
        //         )}
        //
        //         {showForm && (
        //             <div style={{
        //                 position: 'fixed',
        //                 top: 0,
        //                 left: 0,
        //                 width: '100vw',
        //                 height: '100vh',
        //                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 zIndex: 1010
        //             }}>
        //                 <div style={{
        //                     width: '100%',
        //                     maxWidth: '500px',
        //                     backgroundColor: '#fff',
        //                     borderRadius: '12px',
        //                     padding: '24px',
        //                     boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     gap: '16px'
        //                 }}>
        //                     <h2 style={{margin: 0, textAlign: 'center'}}>Thêm thể loại</h2>
        //                     <input
        //                         type="text"
        //                         placeholder="Nhập tên thể loại"
        //                         value={topicName}
        //                         onChange={(e) => setTopicName(e.target.value)}
        //                         style={{
        //                             padding: '10px 14px',
        //                             fontSize: '16px',
        //                             borderRadius: '6px',
        //                             border: '1px solid #ccc',
        //                             outline: 'none',
        //                         }}
        //                     />
        //
        //                     <input
        //                         type="text"
        //                         placeholder="Mô tả"
        //                         value={topicName}
        //                         onChange={(e) => setTopicName(e.target.value)}
        //                         style={{
        //                             padding: '10px 14px',
        //                             fontSize: '16px',
        //                             borderRadius: '6px',
        //                             border: '1px solid #ccc',
        //                             outline: 'none',
        //                         }}
        //                     />
        //
        //                     <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
        //                         <button onClick={handleCancel} style={{
        //                             padding: '10px 18px',
        //                             backgroundColor: '#e0e0e0',
        //                             border: 'none',
        //                             borderRadius: '6px',
        //                             fontSize: '15px',
        //                             cursor: 'pointer'
        //                         }}>
        //                             Hủy
        //                         </button>
        //
        //                         <button onClick={handleSave} style={{
        //                             padding: '10px 18px',
        //                             backgroundColor: '#4CAF50',
        //                             color: 'white',
        //                             border: 'none',
        //                             borderRadius: '6px',
        //                             fontSize: '15px',
        //                             cursor: 'pointer'
        //                         }}>
        //                             Lưu
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        // </div>
};

export default Songs;