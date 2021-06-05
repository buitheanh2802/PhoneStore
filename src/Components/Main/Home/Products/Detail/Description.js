import React, { Component } from 'react';
class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // toggle : false
        }
    }
    showDetail = () => {
        var toggle = document.getElementsByClassName('detail__extension')[0];
        if (this.props.showButtonForDetail) {
            toggle.style.overflow = "";
            toggle.style.height = "100%";
        }
        else {
            toggle.style.overflow = "hidden";
            toggle.style.height = "400px";
        }
    }
    render() {
        if (this.props.start) {
            this.showDetail();
        }
        return (
            <div className="detail__extension">
                <div className="detail__extension-title">
                    {this.props.titleDetail}
                </div>
                <div className="detail__extension-content">
                  {this.props.contentDetail}    
               </div>
                <div className="detail__extension-image">
                    <img src= {this.props.imageProductDetail} alt="description" />
                </div>
            </div>
        );
    }
}

export default Description;