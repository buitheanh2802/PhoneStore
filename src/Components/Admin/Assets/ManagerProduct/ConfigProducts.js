import React, { Component } from 'react';
import firebase from './../../../../apis/firebaseClient';
class ConfigProducts extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            arrImageUrl: [],
            currentSlide : 0,
            hideSlider : 'block'
        }
    }
    componentDidMount() {
        const arrImageUrl = [];
        const connectToFirebase = firebase.storage().ref('Images/Products/' + this.props.product.data.IDProduct + '/SlidesProduct');
        this.props.product.data.sliders.forEach(value => {
            connectToFirebase.child(value).getDownloadURL()
                .then((dataUrl) => {
                    arrImageUrl.push(dataUrl);
                })
                .then(() => {
                    this.setState({ arrImageUrl })
                })
                .then(() =>
                {
                    this.moveSlider(0);
                    setTimeout(() =>
                    {
                        this.setState({hideSlider : 'none'})
                    },1000);
                })
        })
    }
    runSlider = (index) =>
    {
        this.setState({currentSlide : this.state.currentSlide + index})
        setTimeout(() =>
        {
            this.moveSlider(this.state.currentSlide);
        })
    }
    moveSlider = (index) =>
    {
         const img = document.getElementsByClassName("sliderForConfigProduct");
         if(index > img.length - 1)
         {
             this.setState({currentSlide : 0});
         }
         if(index < 0)
         {
             this.setState({currentSlide : img.length - 1})
         }
         for(let i = 0 ; i < img.length ; i++)
         {
             img[i].style.display = "none";
         }
        //  console.log(this.state.currentSlide)
        //  console.log(index);
         img[this.state.currentSlide].style.display = "block"
    }
    render() {
        return (
            <div className="managerProduct__config">
                <div style={{ display: this.state.hideSlider ,zIndex : 1 }} className="managerProduct__detail-loader">
                    <div><div></div></div>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="managerProduct__detail-title">Cấu hình và slider sản phẩm</div>
                <div className="managerProduct__config-content">
                    <div>
                        <div>Cấu hình sản phẩm</div>
                        {this.props.product.data.configProduct.map((value, key) => {
                            const data = value.split(":")
                            return <p key={key}><span>{data[0]} : </span><span>{data[1]}</span></p>
                        })}
                    </div>
                    <div>
                        <div>Slider sản phẩm</div>
                        <div>
                            {this.state.arrImageUrl.map((value,key) => {
                                  return <img className = "sliderForConfigProduct" key = {key} src = {value} alt = "Slider" />
                            })}
                        </div>
                        <div>
                            {this.state.arrImageUrl.map((value,key) =>
                            {
                                if(this.state.currentSlide === key)
                                {
                                    return (<span key = {key} style = {{background : 'black'}}></span>)
                                }
                                else
                                {
                                    return (<span key = {key}></span>)
                                }
                            })}
                        </div>
                        <div className = "configProduct__directional">
                            <i onClick = {() => this.runSlider(-1)} className="fa fa-chevron-left" aria-hidden="true"></i>
                            <i onClick = {() => this.runSlider(1)} className="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfigProducts;