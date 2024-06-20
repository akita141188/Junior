import { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux-setup/reducers/authReducer";
const Login = () => {
    const [inputCustomer, setInputCustomer] = useState({});
    const [errorLogin, setErrorLogin] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ChangeInputCustomer = (e) => {
        const { name, value } = e.target;
        return setInputCustomer({ ...inputCustomer, [name]: value })
    }
    const clickLogin = (e) => {
        e.preventDefault();
        loginCustomer(inputCustomer)
            .then(({data}) => {
                dispatch(loginSuccess(data))
                return navigate("/Cart")
            })
            .catch((error) =>
                setErrorLogin(true))
    }
    return (
        <div id="customer">
            {
                errorLogin && (
                    <div className="alert alert-danger text-center">Thông tin Email hoặc Password không hợp lệ!</div>
                )
            }
            <h3 className="text-center">Đăng nhập</h3>
            <form method="post">
                <div className="row">
                    <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
                        <input
                            onChange={ChangeInputCustomer}
                            placeholder="Email (bắt buộc)"
                            type="text" name="email"
                            className="form-control"
                            value={inputCustomer.email || ""}
                            required />
                    </div>
                    <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
                        <input
                            onChange={ChangeInputCustomer}
                            placeholder="Mật khẩu (bắt buộc)"
                            type="text" name="password"
                            className="form-control"
                            value={inputCustomer.password || ""}
                            required />
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <a href="#" onClick={clickLogin}>
                        <b>Đăng nhập ngay</b>
                    </a>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <a href="#">
                        <b>Quay về trang chủ</b>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Login;