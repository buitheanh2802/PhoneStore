import React, { useEffect, useState } from 'react';
import categoryApi from './../../../../apis/categoryApi';
function Trademark(props) {
    const [categories,setCategories] = useState([]);
    const [oldProducts] = useState(props.totalProducts);
    useEffect(() =>
    {
        let listCategories = [];
        categoryApi.fetchAll().then(data => listCategories = data)
        .then(() => {
            Promise.all(listCategories.map(item => categoryApi.fetchUrl(`Images/Categories/${item.image}`)))
            .then(url => url.forEach((link,key) => listCategories[key].urlImage = link))
            .then(() => setCategories(listCategories));
        })
    },[]);
    const handleChecked = (index) =>
    {
       if(props.checkedCategory === false) props.setCheckedCategory(true);
       const filterBox = document.getElementsByClassName("filter__box")[0];
       const selectedForRadio = document.getElementsByClassName('selected__trademark');
       if(filterBox.children[6].children[0].checked === false){
        filterBox.children[6].children[0].checked = true;
        selectedForRadio[1].style.display = 'none';
       }
       const box = document.getElementsByClassName('trademark')[0];
       const label = box.getElementsByTagName('label');
       const selected = document.getElementsByClassName('selected')[0];
       const indexSelected = selected.getElementsByClassName('selected__trademark');
        for(var i = 0 ; i < label.length ; i++)
        {
            if(i === index) {
                label[i].style.border = '1px solid #288ad6';
                label[i].getElementsByTagName('img')[1].style.display = 'block';
                indexSelected[0].style.display = 'flex';
                indexSelected[0].children[0].innerHTML = label[i].id;
                indexSelected[0].onclick = () => closeCurrentCategory(indexSelected[0],label[index]);
            }
            else {
             label[i].style.border = '1px solid #dedede';
             label[i].getElementsByTagName('img')[1].style.display = 'none';
            }
        }
        handleFilterCategories(index);
    }
    const handleFilterCategories = (index) =>
    {
        if(props.currentPage !== 1) props.setCurrentPage(1);
        const box = document.getElementsByClassName('trademark')[0];
        const label = box.getElementsByTagName('label')[index].id;
        const dataFilter = oldProducts.filter(item => item.trademark === label);
        props.setTotalProducts(dataFilter);
        props.setFilterTrademark(dataFilter);
    }
    const closeCurrentCategory = (elm,label) =>
    {
       const filterBox = document.getElementsByClassName("filter__box")[0];
       const selectedForRadio = document.getElementsByClassName('selected__trademark')[1];
       elm.style.display = 'none';
       label.style.border = '1px solid #dedede';
       label.getElementsByTagName('img')[1].style.display = 'none';
       filterBox.children[6].children[0].checked = true;
       selectedForRadio.style.display = 'none';
       props.setTotalProducts(oldProducts);
       props.setCheckedCategory(false);
    }
    return (
        <div className = 'trademark'>
           {categories.length > 0 ? categories.map((item,key) => 
               <label id = {item.name} key = {key} onClick = {(e)=>handleChecked(key,e)}>
                    <img src={item.urlImage} alt={item.name}/>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAoCAYAAACB4MgqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1RDlCNUE2MjRCQjgxMUVBQTEyRkEwNENDMEQzMkE2MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1RDlCNUE2MzRCQjgxMUVBQTEyRkEwNENDMEQzMkE2MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVEOUI1QTYwNEJCODExRUFBMTJGQTA0Q0MwRDMyQTYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVEOUI1QTYxNEJCODExRUFBMTJGQTA0Q0MwRDMyQTYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O8UzUAAAA0RJREFUeNrUmF1IU2EYx//vu6ObMnXT+Vmnm+wiYhFRpBWVJRFp0gfd6G4KupCQvgiKvq4iIbA06koKuiiKCIO8sCuzLxreKEL2KVZm6HTZckOd5/SclWTmcmc7m+c88LJn5z1n+51nz/s/739s981eGQYKBiaByUcFQ0EzFqCXShpNgoFKPcA52yFJslt5y41Rabw2yeYiSt1Tx7gB2qONm/laSnumH+c6h75dkCVupXR45hzXb0vz2nsusYrSsdnmNQXPtQqoK8/D8Y2OWMoc5IwfoOwkjbBSrZmq2FNMOFeag9w0AWYh6nr4GMdeSGiZ60RNwK3JHGdLs0PQgQkJl554onmw9AmMlwUhdURyfsytYhEYzmzJxiJbMiYmZdS2DuLd0Lha6E4L54rcdUR6TUzgSXT1iZJsFDrMmJRk1FGlu76OqVWORxkZKesp/azmurDgNgvHgvTwncQZcGyDA848C2RZxrUXw3B/Cqjtj0bnQrFM6W21RQsLfn5bLuor8rFrWfqs8weLM7FaTA3lN9q/ofXDqJoyy4yz05Qp6hGM5tcOC/7WM678jHCttKG6KBMm9mdu/yo7Ni22hvI7HSNo7vapYIbywS6lNrG0adheuPJsKLTYNhdaUbrEihzS6IuPB1G+NA1lNJRofuXD3c4RNdBembOdpM5tsYpCWHBixlXq235fEJUrMrA834KGigLYU02h+db3P3C93asGugempO2Qg91aSPCcqnK/6zupxRDG6U6moF9+9IduSkVTu1N/7e40gY74AfS81w/PaBA167LQ653A5aceSHLEcteUZROqAl74tdxeRPzkfEOLteZBvzq142hwVolHvjzsl7TehMVld6j4Qurpw5QeoiHF4zs0t27TfWE8t72CxqX+yxfGM7h2lf7XF+oeXPGFZo7imb5Q1+DTfKEXCYyYwKmfL/zPF+pvcSq+EKyaLGHjfJnpaMAj9oW6AVfrC3XR44ov5Ba2Ro0vnHdwgm757Qv79PKHEY+AutEpiuXR+ML5ASdfyBk7FYsvTPjiVHyhzNg+su+3oNMQ4ukLEwautS9MUI9r7wvjDq74QoddKKF0AAYJEg5e73SJeyj3w0DxU4ABAGYG7XZm8JELAAAAAElFTkSuQmCC" alt="choose"/>
               </label>)
            : null}
        </div>
    );
}

export default Trademark;