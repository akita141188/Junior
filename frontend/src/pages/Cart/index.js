import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { order } from "../../services/Api";
import {useSelector, useDispatch} from "react-redux";
import { updateCart, deleteItemCart } from "../../redux-setup/reducers/cart";
import { getImageProduct } from "../../shared/ultils";
import { Link } from "react-router-dom";
const Cart = () => {
  const [inputsOrder, setInputsOrder] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(({Cart})=>Cart.items);
  const logged= useSelector(({Auth})=> Auth.login.logged)
  const customer = useSelector(({Auth})=> Auth.login.currentCustomer)
  const newItems = items.map((item)=>({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));
  const clickOrder = (e)=>{
    e.preventDefault();
    order({
      fullName : customer.fullName,
      email : customer.email,
      address : customer.address,
      phone: customer.phone,
      customer_id : customer._id,
      items: newItems,
    }).then(({data})=>{
      if(data.status==="success"){
        navigate("/Success");
      }
    });
  }
  const changeInputOrder = (e)=>{
    const {name, value} = e.target;
    return setInputsOrder({
      ...items,
      [name]: value,
    });
  }
  const changeQty = (e, id)=>{
    const {value} = e.target;
    if(value <= 0){
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng hay không?");
      return isConfirm
        ? dispatch(deleteItemCart({_id: id}))
        : false;
    }
    return dispatch(updateCart({
      _id: id,
      qty: value,
    }));
  }

  return (
    <div>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {
            items?.map((item)=>
              <div className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e)=>changeQty(e, item._id)}
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{item.qty*item.price}đ</b>
                  <a href="#">Xóa</a>
                </div>
              </div>
          )
          }
          

          
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button
                id="update-cart"
                className="btn btn-success"
                type="submit"
                name="sbm"
              >
                Cập nhật giỏ hàng
              </button>
            </div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{items.reduce((total, item)=>total + item.qty*item.price, 0)}đ</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        {/* <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputOrder}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputOrder}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputOrder}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputOrder}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
              />
            </div>
          </div>
        </form> */}
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
{
  logged ? (
    <a onClick={clickOrder} href="#">
    <b>Mua ngay</b>
    <span>Giao hàng tận nơi siêu tốc</span>
  </a>
  ) : (
    <Link to="/Login">
    <b>Đăng nhập để mua hàng</b>
  </Link>
  )
}
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </a>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </div>
  );
};
export default Cart;
