import React, { Component } from 'react';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curentSlide : 0
        }
    }
    //arrow function run slider
    startSlider = (index) =>
    { 
        this.setState({curentSlide : this.state.curentSlide + index})
        setTimeout(() =>
        {
            this.moveSlider(this.state.curentSlide)
        })
    }
    //end arrow function runslider

    //controller slider
    moveSlider = (index) =>
    {
        const image = document.getElementsByClassName('detail__product-slide');
        const length = image.length * 100 - 100;
        if(index > length)
        {
            this.setState({curentSlide : 0})
        }
        if(index < 0)
        {
            this.setState({curentSlide : length})
        }
        for(let i = 0 ; i < image.length ; i++)
        {
            image[i].style.transform = 'translateX(-'+this.state.curentSlide+'%)';
        }
    }
    //end controller slider
    render() {
        return (
            <div className="detail__product-boxSlider">
                <div>Đặc điểm nổi bật của {this.props.nameProduct}</div>
                <div className="detail__product-slider">
                    <div>
                        {/*Render image slider */}
                       {(typeof this.props.slides !== 'undefined') ? this.props.slides.map((value,key) =>
                        {
                            return <img className = "detail__product-slide" key = {key} src = {value} alt = "slider" />
                        }) : ''}
                        {/*End render */}
                    </div>
                    <div className="directional">
                        {/* Directional */}
                        <i onClick = {() => this.startSlider(-100)} className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                        <i onClick = {() => this.startSlider(100)} className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                        {/*End directional */}
                    </div>
                    <div className="dots">
                        {/*Render dots slider*/}
                       {(this.props.slides) ? this.props.slides.map((value,key) =>
                       {
                           if((key * 100) === this.state.curentSlide)
                           {
                               return <span key = {key} style = {{background : '#f28c31'}}></span>
                           }
                           else
                           {
                               return <span key = {key}></span>
                           }
                       }) : ''}
                       {/*End render dots slider */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;