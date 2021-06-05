import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../apis/firebaseClient';
import DetailComment from './DetailComment';
class ManagerComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProducts: [],
            loader : 'flex'
        }
    }
    componentDidMount() {
        this.getDataFromFireBase()
        .then(() =>
        {
            this.setState({loader : 'none'});
        })
    }
    removeComment = (IDProduct, IDcomment, renderFrom) => {
        return firebase.database().ref('Products')
            .child(IDProduct + '/commentBy/' + IDcomment).remove()
            .then(() => {
                return firebase.database().ref('Products')
                    .child(IDProduct + '/commentBy/')
                    .once('value')
                    .then(data => {
                        if (data !== null) {
                            const newArrComment = [];
                            data.forEach(value => {
                                newArrComment.push(value.val());
                            })
                            return firebase.database().ref('Products')
                                .child(IDProduct).update({ commentBy: newArrComment })
                                .then(() => {
                                    this.getDataFromFireBase()
                                        .then(() => {
                                            ReactDOM.render(<DetailComment removeComment={this.removeComment} IDProduct={IDProduct} renderFromIndex={renderFrom} dataComments={this.state.dataProducts[renderFrom].data.commentBy} />, document.getElementsByClassName('renderDetailComments')[renderFrom]);
                                        })
                                })
                        }
                    })

            })
    }
    getDataFromFireBase = () => {
        let arrData = [];
        return firebase.database().ref('Products')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(childrent => {
                    let obj = {};
                    obj.data = childrent.val();
                    obj.id = childrent.key;
                    arrData.push(obj);
                });
                this.setState({ dataProducts: arrData });
            })
    }
    renderDetailComments = (IDProduct, key) => {
        const boxRender = document.getElementsByClassName('renderDetailComments');
        for (let i = 0; i < boxRender.length; i++) {
            if (i !== key) {
                ReactDOM.unmountComponentAtNode(boxRender[i]);
                let pReset = boxRender[i].previousSibling;
                let resetBtn = pReset.getElementsByTagName('button')[0];
                resetBtn.classList.remove('changeBtn');
                resetBtn.innerHTML = 'Chi tiết<i class="fa fa-angle-down" aria-hidden="true"></i>';
            }
        }
        const p = boxRender[key].previousSibling;
        const changeButton = p.getElementsByTagName('button')[0];
        if (boxRender[key].childElementCount === 0) {
            changeButton.classList.add('changeBtn');
            ReactDOM.render(<DetailComment removeComment={this.removeComment} IDProduct={IDProduct} renderFromIndex={key} dataComments={this.state.dataProducts[key].data.commentBy} />, document.getElementsByClassName('renderDetailComments')[key]);
            changeButton.innerHTML = '<i style = "margin-right :5px;" class="fa fa-times" aria-hidden="true"></i>Đóng lại';
        }
        else {
            changeButton.classList.remove('changeBtn');
            ReactDOM.unmountComponentAtNode(document.getElementsByClassName('renderDetailComments')[key]);
            changeButton.innerHTML = 'Chi tiết<i class="fa fa-angle-down" aria-hidden="true"></i>';
        }
    }
    render() {
        return (
            <div>
                <div style  = {{minHeight : '650px',position : 'relative'}} className="managerProducts__content">
                    <div style={{ display: this.state.loader,minHeight : '100%'}} className='loaderForManagerComment'>
                        <div style={{ paddingTop: 0 }} className="lds-dual-ring"></div>
                    </div>
                    <div>
                        <p style={{ width: "10%", textAlign: 'center' }}>STT</p>
                        <p style={{ width: "42%" }}>Tên sản phẩm</p>
                        <p style={{ width: "19%" }}>Lượt bình luận</p>
                        <p style={{ width: "29%" }}>Hành động</p>
                    </div>
                    {(this.state.dataProducts.length > 0) ? this.state.dataProducts.map((value, key) => {
                        // const totalComments = value.data.commentBy.filter((e) => {
                        //     return e !== null;
                        // })
                        return (<div key={key} className='rowsForManagerComment'>
                            <p style={{ width: "10%", textAlign: 'center' }}>{key + 1}</p>
                            <p style={{ width: "42%", textAlign: 'start', fontWeight: '500' }}>{value.data.nameProduct}</p>
                            <p style={{ width: "19%" }}>{(value.data.commentBy) ? value.data.commentBy.length : 0}</p>
                            <p style={{ width: "29%" }}>
                                <button onClick={() => this.renderDetailComments(value.id, key)} className='comment__btn'>Chi tiết<i className="fa fa-angle-down" aria-hidden="true"></i></button>
                            </p>
                            <div className='renderDetailComments'></div>
                        </div>)
                    }) : null}
                </div>
            </div>
        );
    }
}

export default ManagerComments;