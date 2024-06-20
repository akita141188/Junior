import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { RegisterCustomer } from "../../services/Api";

const Register = ()=>{
const [inputsCustomer, setInputsCustomer] = useState({});
const [errorRegister, setErrorRegister] = useState(false)
const navigate = useNavigate();

const changeInputsCustomer = (e)=>{
    const {name,value} = e.target;
    return setInputsCustomer({...inputsCustomer,[name]:value})
}

const clickRegister = (e)=>{
    e.preventDefault();
    RegisterCustomer(inputsCustomer)
    .then(()=> navigate("/Login"))
    .catch(({response})=> {
        if(response.data ==="Email exits") return setErrorRegister("Email đã tồn tại");
        if(response.data ==="Phone exits") return setErrorRegister("Số điện thoại đã tồn tại");
    })
}

    return (
<div id="customer">
    {
        errorRegister &&
        (
            <div className="alert alert-danger text-center">{errorRegister}</div>
        )
    }
  <h3 className="text-center">Đăng ký</h3>
  <form method="post">
    <div className="row">
      <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
        <input 
        onChange={changeInputsCustomer}
        placeholder="Họ và tên (bắt buộc)" 
        type="text" 
        name="fullName" 
        className="form-control" 
        value={inputsCustomer.fullName || ""}
        required />
      </div>
      <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
        <input 
        onChange={changeInputsCustomer}
        placeholder="Mật khẩu (bắt buộc)" 
        type="text" 
        name="password" 
        className="form-control" 
        value={inputsCustomer.password || ""}

        required />
      </div>
      <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
        <input
        onChange={changeInputsCustomer}
        placeholder="Email (bắt buộc)" 
        type="text" 
        name="email" 
        className="form-control" 
        value={inputsCustomer.email || ""}

        required />
      </div>
      <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
        <input 
        onChange={changeInputsCustomer}
        placeholder="Số điện thoại (bắt buộc)" 
        type="text" 
        name="phone" 
        className="form-control" 
        value={inputsCustomer.phone || ""}

        required />
      </div>
      <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
        <input
        onChange={changeInputsCustomer} 
        placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" 
        type="text" 
        name="address" 
        className="form-control" 
        value={inputsCustomer.address || ""}

        required />
      </div>
    </div>
  </form>
  <div className="row">
    <div className="by-now col-lg-6 col-md-6 col-sm-12">
      <a onClick={clickRegister} href="#">
        <b>Đăng ký ngay</b>
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

export default Register;