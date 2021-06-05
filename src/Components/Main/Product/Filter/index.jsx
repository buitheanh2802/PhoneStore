import React, { useEffect, useState } from "react";

function Filter(props) {
  const [oldProducts] = useState(props.totalProducts);
  let currentFilter = [];
  useEffect(() => {
    initFilter();
  });
  const initFilter = () => {
    const filterBox = document.getElementsByClassName("filter__box")[0];
    const input = filterBox.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
      input[i].id = i;
      input[i].onclick = handleFilter;
    }
  };
  const handleFilter = (e) => {
    currentFilter = oldProducts;
    if(props.currentPage !== 1) props.setCurrentPage(1);
    const filterPrice = Number(e.target.id);
    const selected = document.getElementsByClassName('selected')[0];
    const indexSelected = selected.getElementsByClassName('selected__trademark');
    let priceIndex = null;
    let data = null;
    if (filterPrice === 0) priceIndex = 10000000;
    else if (filterPrice === 1) priceIndex = 15000000;
    else if (filterPrice === 2) priceIndex = 20000000;
    else if (filterPrice === 3) priceIndex = 30000000;
    else if (filterPrice === 4) priceIndex = 30000000;
    if (currentFilter.length > 0) {
      if(props.checkedCategory) currentFilter = props.filterTrademark;
      if (priceIndex !== null) {
        if(filterPrice === 0) data = currentFilter.filter(item => item.price < priceIndex)
        else if(filterPrice === 1) data = currentFilter.filter(item => item.price < priceIndex && item.price >= 10000000)
        else if(filterPrice === 2) data = currentFilter.filter(item => item.price < priceIndex && item.price >= 15000000)
        else if(filterPrice === 3) data = currentFilter.filter(item => item.price < priceIndex && item.price >= 20000000)
        else if(filterPrice === 4) data = currentFilter.filter(item => item.price > priceIndex);
        const parent = e.target.parentNode.innerText;
        indexSelected[1].style.display = 'flex';
        indexSelected[1].onclick = () => clearPrice(indexSelected[1]);
        indexSelected[1].children[0].innerHTML = parent
        props.setTotalProducts(data);
      } else {
        if(props.checkedCategory){ 
          props.setTotalProducts(currentFilter)
        }
        else{
          props.setTotalProducts(oldProducts);
        }
        indexSelected[1].style.display = 'none';
      }
    }
  };
  const clearPrice = (elm) =>
  {
      elm.style.display = 'none';
      const filterBox = document.getElementsByClassName("filter__box")[0];
      filterBox.children[6].children[0].checked = true;
      if(props.checkedCategory) props.setTotalProducts(currentFilter)
      else props.setTotalProducts(oldProducts);
  }
  return (
    <div className="filter">
      <div className="filter__box">
        <span>Chọn mức giá : {"\u00a0"}</span>
        <label>
          <input type="radio" name="filter" />
          Dưới 10 triệu
        </label>
        <label>
          <input type="radio" name="filter" />
          10 - 15 triệu
        </label>
        <label>
          <input type="radio" name="filter" />
          15 - 20 triệu
        </label>
        <label>
          <input type="radio" name="filter" />
          20 - 30 triệu
        </label>
        <label>
          <input type="radio" name="filter" />
          Trên 30 triệu
        </label>
        <label>
          <input defaultChecked={true} type="radio" name="filter" />
          Tất cả
        </label>
      </div>
      <div className="filter__search">
       
      </div>
    </div>
  );
}
export default Filter;
