import { useEffect, useState } from "react";
import { getTopic } from "../../Services/topic.service";
import "../../assets/scss/dashboard.scss";
import { Button, Col, Row } from "antd";
import { Topic } from '../../models/Topic.model';
import { Link } from "react-router-dom";


function TopicMusic(){
    const [topics, setTopics] = useState<Topic[]>([]);

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

    

    return(
        <>
        {topics.length > 0 ? (
            <>
            <h2>Thể loại</h2>
            <Row gutter={[16, 16]} className="topic__list">
                {topics.map((item) => (
                    <Col key={item._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                        <Link to={`/topic/${item._id}`}>
                            <div className="topic__item">
                                <div className="topic__item--image">
                                    <img src={item.avatar} alt={item.title} />
                                </div>
                                <div className="title">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
            </>
        ):(
            <>
            <h2>Đang load</h2>
            </>
        )}
        </>
    )
}
export default TopicMusic;