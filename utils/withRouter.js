import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component){
    return (
        function WrappedComponent(props) {
            const params = useParams();
            const navigate = useNavigate();
            const location = useLocation();
            return <Component {...props} params={params} navigate={navigate} location={location}/>
        }
    )
}