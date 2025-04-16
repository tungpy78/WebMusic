import React, { useEffect, useState } from "react";
import { getTopic } from "../../Services/topic.service";
import "../../assets/scss/dashboard.scss";
import { Button, Card, Col, Row } from "antd";
import { Topic } from '../../models/Topic.model';


function TopicMusic(){
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        const fethApi = async () => {
            const result = await getTopic();
            console.log("result", result);
            setTopics(result);
        }
        fethApi();
    },[]);

    console.log("topics", topics);

    return(
        <>
        {topics.length > 0 ? (
            <>
            <h2>Thể loại</h2>
            <Row gutter={[20, 20]} className="topic__list">
                {topics.map((item) => (
                    <Col key={item._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                        <div className="topic__item">
                            <div className="topic__item--image">
                                <img src={item.avatar} alt={item.title} />
                            </div>
                            <div className="title">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                            <Button >Xem chi tiết</Button>
                        </div>
                    </Col>
                ))}
            </Row>
            </>
        ):(
            <>
            </>
        )}
        </>
    )
}
export default TopicMusic;