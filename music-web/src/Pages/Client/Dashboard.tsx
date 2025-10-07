
import CarouselImage from "../../Components/element/caroucel-image";
import HintMusic from "../../Components/element/hitMusic";
import TopicMusic from "../../Components/element/topicMusic";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Song } from "../../models/song.model";
import { useEffect, useState } from "react";
import { getRecommendedSongs } from "../../Services/recomandation.service";
function Dashboard(){
    const [dataSong, setDataSong] = useState<Song[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getRecommendedSongs();
                setDataSong(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    console.log("recommended songs:", dataSong);
    
    return (
        <>
        <CarouselImage songs={dataSong} />
        <HintMusic />
        <TopicMusic />
        </>
    )
}
export default Dashboard;