import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import custom_Function from './../../../../constants/myFuction';
import productApi from './../../../../apis/productsApi';
function Search() {
    const [item,setItem] = useState([]);
    const [dataSearch,setDataSearch] = useState('');
    const [showResult,setShowResult] = useState('none');
    let timeOut = useRef(null);
    const getData = e =>
    {
        const value = e.target.value;
        if(timeOut.current)
        {
            clearTimeout(timeOut.current);
        }
        timeOut.current = setTimeout(() =>
        {
            setDataSearch(value);
        },700)
    }
    useEffect(() =>
    {
       let totalData = [];
       if(dataSearch !== '')
       {
          productApi.fetchAll().then(data => totalData = data)
          .then(() => {
            const filter = totalData.filter(item => item.nameProduct.toUpperCase().indexOf(dataSearch.toUpperCase()) !== -1);
            if(filter.length > 0) {
                Promise.all(filter.map(item => productApi.fetchUrl(`Images/Products/${item.IDProduct}/${item.imageProduct}`)))
                      .then(data => data.forEach((url,key) => filter[key].imageUrl = url))
                      .then(() => {setItem(filter);setShowResult('block')});
            }else {setItem([]);setShowResult('block');}
          });
       }
       else{setItem([]);setShowResult('none');}
    },[dataSearch]);
    return (
        <div className = 'search'>
            <div className ='search__input'>
                 <input onChange = {getData} type = 'text' placeholder = 'Nội dung tìm kiếm ....' />
                 <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div style = {{display : showResult}} className = 'search__result'>
                {item.length > 0 ? item.map((item,key) => 
                {
                    return (
                    <Link key = {key} to= {`/Detail/${custom_Function.to_Slug(item.nameProduct)}.${item.IDProduct}.html`} className = 'itemProduct'>
                        <div>
                            <img src = {item.imageUrl} alt = {item.trademark}/>
                        </div>
                        <div className = 'itemProduct__content'>
                            <div>{item.nameProduct}</div>
                             <div>
                                <p>{custom_Function.to_Formart(item.price)} VNĐ</p>
                                <p>{custom_Function.to_Formart(item.oldPrice)} VNĐ</p>
                             </div>
                        </div>
                   </Link>
                    )
                }) : <center className = 'emptyResult'>Không tìm thấy kết quả</center>}
            </div>
        </div>
    );
}

export default Search;