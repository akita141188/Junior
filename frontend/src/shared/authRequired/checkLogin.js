import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const checkLogin = (OriginComponent)=>{

    const ExtendsComponent = ()=>{
        const logged = useSelector(({Auth})=> Auth.login.logged);
        return logged ? <OriginComponent/> : <Navigate to= "/"/>
    }
    return ExtendsComponent;
}

export default checkLogin;