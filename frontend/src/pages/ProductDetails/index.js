import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";
import { getProduct, getCommentsProduct, createCommentProduct } from "../../services/Api";
import { useParams, useNavigate } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import moment from "moment";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const clickAddToCart = (type)=>{
    dispatch(addToCart({
      _id: id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    if(type==="buy-now"){
      return navigate("/Cart");
    }
  }

  const onChangeInput = (e)=>{
    const {name, value} = e.target;
    setInputComment({...inputComment, [name]: value});
  }
  const onClickSubmit = (e)=>{
    e.preventDefault();
    return createCommentProduct(id, inputComment)
      .then(({data})=>{
        if(data.status=="success"){
          setInputComment({});
          getComments(id);
        }
      });
  }
  const getComments = (id)=>{
    getCommentsProduct(id, {
      params:{
        limit: 50,
      }
    })
      .then(({data})=>{
        setComments(data.data.docs);
      });
  }
  useEffect(()=>{
    getProduct(id, {})
      .then(({data})=>{

        // Get Product
        setProduct(data.data);

        // Get Comments
        getComments(id);

      });
  }, []);
  return (
    <div>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(product.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product?.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {product?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{product?.price}đ</li>
              <li id="status" className={product?.is_stock? "": "text-danger"} >{product?.is_stock? "Còn hàng": "Hết hàng"}</li>
            </ul>
            {
              product?.is_stock
                ? <div id="add-cart">
                    <button onClick={()=>clickAddToCart("buy-now")} className="btn btn-warning mr-2">
                      Mua ngay
                    </button>
                    <button onClick={clickAddToCart} className="btn btn-info">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                : null
            }

          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product?.name}</h3>
            {product?.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  onChange={onChangeInput}
                  value={inputComment.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment.content || ""}
                />
              </div>
              <button onClick={onClickSubmit} type="submit" name="sbm" className="btn btn-primary">
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {
              comments?.map((comment, index)=>
              <div className="comment-item">
                <ul>
                  <li>
                    <b>{`${index+1}-${comment.name}`}</b>
                  </li>
                  <li>{moment(comment.createdAt).fromNow()}</li>
                  <li>
                    {comment.content}
                  </li>
                </ul>
              </div>
              )
            }
            
          </div>
        </div>
        {/*	End Comments List	*/}
      </div>
      {/*	End Product	*/}
      <div id="pagination">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Trang trước
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Trang sau
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProductDetails;
