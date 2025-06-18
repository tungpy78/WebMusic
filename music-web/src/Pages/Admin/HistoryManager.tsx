import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { createTopic, deleteTopic, getTopic, restoreTopic, updateTopic } from '../../Services/topic.service';
import { TopicRequest } from './Topic';
import { HistoryAction } from '../../models/historyAction.model';
import { getAllHistory } from '../../Services/historyAction.service';

const HistoryManager = () => {
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [historyAction, setHistoryAction] =  useState<HistoryAction[]>([]);
    const [historyActionShow, setHistoryActionShow] =  useState<HistoryAction[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
        useEffect(() => {
            const fethApi = async () => {
                try {
                    const result = await getAllHistory();
                    setHistoryAction(result?.data);
                    setHistoryActionShow(result?.data);
                } catch (error) {
                    console.log("errortopic", error);
                }
            }
            fethApi();
        },[]);
        useEffect(() => {
            if(searchKeyword==='') setHistoryActionShow(historyAction);
             if (historyAction.length === 0) return;
            const normalize = (str: string) =>
                str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

            const filtered = historyAction.filter(item =>
                normalize(item.user || "").includes(normalize(searchKeyword))
            );
            setHistoryActionShow(filtered);
            setCurrentPage(0);
        }, [searchKeyword]);
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 8;
    const totalPages = Math.ceil(historyActionShow.length / accountsPerPage);
    const startIndex = currentPage * accountsPerPage;
    const currentTopics = historyActionShow.slice(startIndex, startIndex + accountsPerPage);



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
                        letterSpacing: '0.5px',
                    }}>
                        Lịch sử hoạt động 
                    </h2>
                    <div style={{ position: 'relative', width: '300px', marginRight: '25px' }}>
                        <input
                            type="text"
                            placeholder="Tìm nhân viên..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onMouseEnter={() => setIsHoveringAdd(true)}
                            onMouseLeave={() => setIsHoveringAdd(false)}
                            style={{
                            width: '100%',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            borderColor: isHoveringAdd ? '#45a049' : '#ccc'
                            }}
                        />
                    </div>
                    
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '8%  15% 15% 52% 10%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    backgroundColor: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Tên nhân viên</div>
                    <div>Số điện thoại</div>
                    <div>Hành động</div>
                    <div>Thời gian thực hiện </div>
                </div>

                {currentTopics.map((topics, index) => (
                    <div
                        key={topics._id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '8%  15% 15% 52% 10%',
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
                        <div>{topics.user}</div>
                        <div>{topics.phone}</div>
                        <div
                            style={{
                                whiteSpace: 'pre-wrap',       
                                wordBreak: 'break-word',      
                            }}
                            >
                            {topics.content}
                        </div>
                        <div>{new Date(topics.listenedAt).toLocaleDateString('vi-VN')}</div>             
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
            </div>
        
        {currentTopics.length > 0 ? (
            currentTopics.map((topics, index) => (
                <div
                    key={topics._id}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '8%  15% 15% 52% 10%',
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
                    <div>{topics.user}</div>
                    <div>{topics.phone}</div>
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {topics.content}
                    </div>
                    <div>{new Date(topics.listenedAt).toLocaleDateString('vi-VN')}</div>
                </div>
            ))
        ) : (
            <div
                style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#999',
                    fontStyle: 'italic',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    marginTop: '10px'
                }}
            >
                Không tìm thấy kết quả
            </div>
        )}
        </div>
    );
};

export default HistoryManager;