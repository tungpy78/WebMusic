import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { createTopic, deleteTopic, getTopic, restoreTopic, updateTopic } from '../../Services/topic.service';

type TopicType = {
    _id: string,
    title: string,
    description: string,
    avatar: string,
    deleted: boolean,
};

export type TopicRequest = {
    title: string,
    description: string,
    fileAvata: File | null,
}
const Topic = () => {
    const [showForm, setShowForm] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [topicDes, setDesTopic] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [topicId, setTopicId] = useState('');
    const [iscreate, setiscreate] = useState<boolean>(false);
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    
    const [topics, setTopics] =  useState<TopicType[]>([]);
        useEffect(() => {
            const fethApi = async () => {
                try {
                    const result = await getTopic();
                
                    setTopics(result?.data);
                } catch (error) {
                    console.log("errortopic", error);
                }
            }
            fethApi();
        },[]);
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 8;
    const totalPages = Math.ceil(topics.length / accountsPerPage);
    const startIndex = currentPage * accountsPerPage;
    const currentTopics = topics.slice(startIndex, startIndex + accountsPerPage);


    const handleSave = async () => {
        if (!topicName.trim()) return;
        const newTopic : TopicRequest = {
            title: topicName,
            description: topicDes,
            fileAvata: imageFile,
        };
        try {
            if(iscreate){
                await createTopic(newTopic);
                alert('Tạo thành công!');
            }else{
                await updateTopic(topicId,newTopic);
                alert('update thành công!');
            }
            const updatedResult = await getTopic();
            setTopics(updatedResult.data);
            setTopicId('');
            setTopicName('');
            setDesTopic('');
            setImageFile(null);
            setImagePreview(null);
            setShowForm(false);
            setiscreate(false);
            setCurrentPage(Math.floor(topics.length / accountsPerPage));
        } catch (err) {
            console.error(err);
            alert('Tạo thất bại:' + err);
        } // chuyển tới trang mới
    };

    const handleEditClick = (topic: TopicType) => {
    console.log('Edit topic:', topic);
    setShowForm(true);
    setTopicName(topic.title);
    setDesTopic(topic.description);
    setImagePreview(topic.avatar);
    };

    const deletedOrRestore = async(id: string,deleted: Boolean) => {
         try {
            if (!id) return;
            if (deleted) {
                await restoreTopic(id); 
                alert('Khôi phục thành công!');
            } else {
                await deleteTopic(id);
                alert('Xóa thành công!');
            }
            const updatedResult = await getTopic();
            setTopics(updatedResult.data);
            setTopicId('');
        } catch (err) {
            console.error(err);
            alert('Thao tác thất bại:' + err);
        }
        
    };
    
    const handleCancel = () => {
        setTopicId('');
        setTopicName('');
        setDesTopic('');
        setImageFile(null);
        setImagePreview(null);
        setShowForm(false);
    };


    return (
        <div style={{width: '90%', maxHeight: '90%'}}>
            <div style={{
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{
                        fontSize: '26px',
                        fontWeight: '600',
                        color: '#1976d2',
                        margin: 0,
                        textShadow: '0 1px 1px rgba(0,0,0,0.05)',
                        letterSpacing: '0.5px'
                    }}>
                        Danh sách thể loại
                    </h2>


                    <button
                        onClick={() => {
                            setShowForm(true);
                            setiscreate(true);
                            }}
                        onMouseEnter={() => setIsHoveringAdd(true)}
                        onMouseLeave={() => setIsHoveringAdd(false)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: isHoveringAdd ? '#45a049' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Thêm thể nghệ sĩ
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '8% 15% 25% 25% 27%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    backgroundColor: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Hình ảnh</div>
                    <div>Tên nghệ sĩ</div>
                    <div>Mô tả</div>
                    <div style={{textAlign: 'center'}}>Hành động</div>
                </div>

                {currentTopics.map((topics, index) => (
                    <div
                        key={topics._id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '8% 15% 25% 25% 27%',
                            padding: '12px 16px',
                            backgroundColor: '#fff',
                            marginBottom: '8px',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            alignItems: 'center',
                            transition: 'background-color 0.2s',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <div>{startIndex + index + 1}</div>
                        <div>
                            <img
                                src={topics.avatar || 'https://via.placeholder.com/60'} // fallback nếu không có ảnh
                                alt="topic"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div>{topics.title}</div>
                        <div>{topics.description}</div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            <button
                                onClick={() => {handleEditClick(topics);setiscreate(false);setTopicId(topics._id)}}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'pen']}
                                    style={{
                                        color: '#2196F3',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#0d47a1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '#2196F3';
                                    }}
                                />
                            </button>
                                {/* buton xóa                   */}
                            <button
                                onClick={() => {deletedOrRestore(topics._id,topics.deleted)}}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', topics.deleted ? 'undo' : 'trash']}
                                    style={{
                                        color: topics.deleted ? '#1976d2' : '#f44336', // Màu đỏ
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = topics.deleted ? '#0d47a1' : '#b71c1c'; // Màu đỏ đậm khi hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = topics.deleted ? '#1976d2' : '#f44336';
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div style={{marginTop: '20px', textAlign: 'center'}}>
                        {Array.from({length: totalPages}, (_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPage(pageIndex)}
                                style={{
                                    margin: '0 5px',
                                    padding: '6px 12px',
                                    border: '1px solid #ccc',
                                    backgroundColor: currentPage === pageIndex ? '#4CAF50' : '#fff',
                                    color: currentPage === pageIndex ? '#fff' : '#000',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                )}

                {showForm && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1010
                    }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '500px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <h2 style={{margin: 0, textAlign: 'center'}}>{iscreate ? 'Tạo thể loại mới' : 'Chỉnh sửa thể loại'}</h2>
                            <input
                                type="text"
                                placeholder="Nhập tên thể loại"
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />

                            <input
                                type="text"
                                placeholder="Mô tả"
                                value={topicDes}
                                onChange={(e) => setDesTopic(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setImageFile(file);
                                        setImagePreview(URL.createObjectURL(file)); 
                                    }
                                }}
                                style={{
                                    padding: '10px 0',
                                    fontSize: '16px'
                                }}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginTop: '8px'
                                    }}
                                />
                            )}

                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                                <button onClick={handleCancel} style={{
                                    padding: '10px 18px',
                                    backgroundColor: '#e0e0e0',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}>
                                    Hủy
                                </button>
                                
                                <button onClick={handleSave} style={{
                                    padding: '10px 18px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic;