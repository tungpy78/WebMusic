import CarouselImage from "../../Components/element/caroucel-image";
import TopicMusic from "../../Components/element/topicMusic";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Song } from "../../models/song.model";
// << THÊM useRef
import { useEffect, useState, useRef } from "react"; 
import { getRecommendedSongs } from "../../Services/recomandation.service";

function Dashboard() {
    const [dataSong, setDataSong] = useState<Song[]>([]);
    // << 1. Tạo một ref để kiểm tra xem đã gọi API hay chưa
    const hasFetched = useRef(false); 

    useEffect(() => {
        // << 2. Chỉ gọi API nếu cờ là false
        if (hasFetched.current === false) {
            const fetchApi = async () => {
                try {
                    const response = await getRecommendedSongs();
                    setDataSong(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchApi();

            // << 3. Đánh dấu là đã gọi API
            hasFetched.current = true;
        }
    }, []); // Mảng rỗng vẫn giữ nguyên

    console.log("recommended songs:", dataSong);
    
    return (
        <>
            <CarouselImage songs={dataSong} />
            <TopicMusic />
        </>
    )
}
export default Dashboard;