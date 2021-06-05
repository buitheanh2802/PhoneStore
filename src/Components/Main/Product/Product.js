import React, { useEffect, useState } from 'react';
import ProductItem from './../Home/Products/Product/ProductChild';
import customFunction from './../../../constants/myFuction'
import productApi from './../../../apis/productsApi';
import animated from './../../../helpers/animate'
import Header from './Header';
import './Product.css';
import Filter from './Filter';
import Panination from './Panination/Panination'
import Trademark from './Trademark/Trademark';
const Products = () => {
    const { to_Formart, to_Slug } = customFunction;
    const [loader, setLoader] = useState('flex');
    const [totalProducts, setTotalProducts] = useState([]);
    const [currentPage,setCurrentPage] = useState(2);
    const [checkedCategory,setCheckedCategory] = useState(false);
    const [filterTrademark,setFilterTrademark] = useState([]);
    useEffect(() => {
        let productItem = [];
        productApi.fetchAll().then(data => productItem = data)
            .then(() => {
                Promise.all(productItem.map(item => {
                    return productApi.fetchUrl(`Images/Products/${item.IDProduct}/${item.imageProduct}`);
                }))
                    .then(data => data.forEach((url, key) => productItem[key].imageUrl = url))
                    .then(() => { setTotalProducts(productItem) })
                    .then(() => animated.initAnimatedFrom('boxLoaderForHome').then(() => setLoader('none')));
            })
    },[]);
    const handleResultProducts = () => {
        window.scrollTo(0,0);
        let start = currentPage * 12 - 12;
        let end = currentPage * 12;
        //0 - `12
        if(totalProducts.length > 0)
        {
            return totalProducts.map((data, key) => {
                if (key >= start && key < end) {
                    return <ProductItem
                        oldPrice={to_Formart(data.oldPrice)}
                        weight={data.configProduct[8]}
                        CPU={data.configProduct[0]}
                        graphics={data.configProduct[6]}
                        screen={data.configProduct[3]}
                        price={to_Formart(data.price)}
                        image={data.imageUrl}
                        name={data.nameProduct}
                        key={key}
                        id={data.IDProduct}
                        slug={to_Slug(data.nameProduct)}
                        totalComment={(data.commentBy) ? data.commentBy.filter(data => {
                            return data !== null
                        }) : 0}
                        views={data.view} />
                }
                return null;
            })
        }
        else return <center style = {{color : 'red'}}>Chưa có sản phẩm nào !</center>
    }
    return (
        <div className="product">
            <div style={{ display: loader }} className="boxLoaderForHome">
                <div className="lds-dual-ring"></div>
            </div>
            <div className="product__box">
                <Header />
                {loader === 'none' ? <Trademark setFilterTrademark = {setFilterTrademark} checkedCategory = {checkedCategory} setCheckedCategory = {setCheckedCategory} currentPage = {currentPage} setCurrentPage = {setCurrentPage} setTotalProducts = {setTotalProducts} totalProducts = {totalProducts} /> : null}
                {loader === 'none' ? <Filter filterTrademark = {filterTrademark} checkedCategory = {checkedCategory} currentPage = {currentPage} setCurrentPage = {setCurrentPage} totalProducts = {totalProducts} setTotalProducts = {setTotalProducts} /> : null}
                <div className = 'selected'>
                      <div className = 'selected__trademark'>
                          <div>Macbook</div>
                          <div><i className="fa fa-times" aria-hidden="true"></i></div>
                      </div>
                      <div className = 'selected__trademark'>
                          <div>10 - 20 triệu</div>
                          <div><i className="fa fa-times" aria-hidden="true"></i></div>
                      </div>
                </div>
                <div className="product__content">
                    {handleResultProducts()}
                </div>
               <Panination currentPage = {currentPage} setCurrentPage = {setCurrentPage} length={totalProducts} />
            </div>
        </div>
    );
}
export default Products;