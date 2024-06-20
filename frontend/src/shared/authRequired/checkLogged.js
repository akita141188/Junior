import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const checkLogged = (OriginComponent)=>{

    const ExtendsComponent =()=>{
        const logged = useSelector(({Auth})=> Auth.login.logged)
        return logged ? <Navigate to="/"/>  : <OriginComponent/>
    }
    return ExtendsComponent;

}

export default checkLogged;