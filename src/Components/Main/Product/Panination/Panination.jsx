import React from "react";

function Panination(props) {
  const handlePanination = () => {
    const allPage = Math.ceil(props.length.length / 12);
    return props.length.map((value, key) => {
      if (key < allPage) {
        if(key + 1 === props.currentPage)
        {
          return <span key = {key} style = {{background : 'black',color : 'white',border : 'none'}} onClick = {() => props.setCurrentPage(key + 1)}>{key + 1}</span>;
        }
        else
        {
          return <span key = {key} onClick = {() => props.setCurrentPage(key + 1)}>{key + 1}</span>;
        }
      }
      else return null;
    });
  };
  return <div className="panination">{handlePanination()}</div>;
}

export default Panination;
