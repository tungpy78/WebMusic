
import CarouselImage from "../../Components/element/caroucel-image";
import HintMusic from "../../Components/element/hitMusic";
import TopicMusic from "../../Components/element/topicMusic";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function Dashboard(){
    
    return (
        <>
        <CarouselImage />
        <HintMusic />
        <TopicMusic />
        </>
    )
}
export default Dashboard;