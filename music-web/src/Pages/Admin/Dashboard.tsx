import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <>
            <div style={{width: '95%', height: '100%', backgroundColor: 'bisque', overflowY: 'scroll'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'burlywood'}}>
                    <div style={{width: '70%'}}>

                    </div>

                    <div style={{
                        width: '30%',
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: '10px',
                        gap: '10px'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>Số lượng bài hát:</div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
