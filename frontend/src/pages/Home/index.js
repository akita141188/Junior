import React, {useState, useEffect} from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(()=>{
    // Featured
    getProducts({
      params:{
        limit: 6,
        "filter[is_featured]": true,
      }
    }).then(({data})=>{
      setFeaturedProducts(data.data.docs);
    });
    // Latest
    getProducts({
      params:{
        limit: 6,
      }
    }).then(({data})=>{
      setLatestProducts(data.data.docs);
    });
  }, []);
  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {
            featuredProducts?.map((product)=>
              <ProductItem item={product}/>
            )
          }
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {
            latestProducts?.map((product)=>
              <ProductItem item={product}/>
            )
          }
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};
export default Home;
