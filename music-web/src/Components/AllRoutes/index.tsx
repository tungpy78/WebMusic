import { useRoutes } from "react-router-dom";
import { routes } from "../../Routes";

function AllRoutes(){
    const elements = useRoutes(routes);
    return(
        <>
        {elements}
        </>
    )
}
export default AllRoutes;