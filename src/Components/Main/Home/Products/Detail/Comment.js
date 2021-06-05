import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './../../../../../apis/firebaseClient';
import SettingComments from './SettingComments';
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataComment: [],
            errorPostComment: '',
            content: '',
            isCloseLoader: 'none',
            curentPage: 1
        }
    }
    startRunEditComment = (ID, IDComment, data) => {
        const update = firebase.database().ref('Products/' + this.props.IDProduct + '/commentBy/');
        update.child(IDComment).update(data)
            .then(() => {
                this.renderCommentFromFirebase()
                    .then(() => {
                        this.SettingComment(ID);
                    })
                    .then(() => {
                        setTimeout(() => {
                            let box = document.getElementsByClassName('loaderForCommentUser')[ID];
                            box.classList.add('fadeForCommentUser');
                            box.addEventListener('animationend', () => {
                                document.getElementsByClassName('loaderForCommentUser')[ID].style.display = 'none';
                                box.classList.remove('fadeForCommentUser');
                            })
                        }, 300)
                    })
            })
    }
    //call API
    componentDidMount() {
        this.renderCommentFromFirebase()
    }
    //end componentDidmount

    //create function render comment from firebase 
    renderCommentFromFirebase = () => {
        return firebase.database().ref('Products')
            .child(this.props.IDProduct + '/commentBy').once('value')
            .then(dataSnapshot => {
                // let obj = {};
                // obj.data = 
                const arrComments = [];
                dataSnapshot.forEach(value => {
                    let obj = {};
                    obj.data = value.val();
                    obj.id = value.key;
                    arrComments.push(obj);
                })
                this.setState({ dataComment: arrComments });
            })
            .then(() => {
                const loader = document.getElementsByClassName('boxLoaderForComment')[0];
                loader.classList.add('animationLoader');
                loader.addEventListener('animationend', () => {
                    this.setState({ isCloseLoader: 'none' });
                })
            });
    }
    isEdit = (e) => {
        this.setState({ isEditFromIndex: e })
    }
    //end function....
    //Create write comment for user 
    writeComment = (e) => {
        e.preventDefault();
        document.getElementById('reset').reset();
        if (this.checkLogin() === false) {
            this.setState({ errorPostComment: 'Đăng nhập để tiếp tục bình luận.....' })
        }
        else {
            if (this.state.content === '' || this.state.content.trim() === '') {
                this.setState({ errorPostComment: 'Không được để trống nội dung....' });
            }
            else {
                this.setState({ errorPostComment: '' })
                //start POST COMMENT 
                this.startPostComment(this.props.IDProduct);
            }
        }
    }
    //create function check login when start comment
    checkLogin = () => {
        if (sessionStorage.getItem('user')) {
            return true;
        }
        else {
            return false;
        }
    }
    //End function

    //create function getComment when post 
    getDataFromBoxComment = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    //end function
    SettingComment = (key, IDComment) => {
        //logic for remove comment 
        let boxForRemoveComment = document.getElementsByClassName('renderRemoveComment')[key];
        //end logic
        let parent = document.getElementsByClassName('renderEditComment')[key];
        let grander = parent.parentElement;
        let toggleCog = grander.getElementsByClassName('toggleCog');
        if (parent.childElementCount === 0) {
            toggleCog[0].style.display = 'none';
            toggleCog[1].style.display = 'block';
            ReactDOM.render(<SettingComments content={this.state.dataComment[key].data.content} isEdit={this.isEdit}
                startRunEditComment={this.startRunEditComment}
                ID={key}
                IDComment={IDComment}
                parent={parent} />
                , document.getElementsByClassName('renderEditComment')[key]);
        }
        else {
            toggleCog[0].style.display = 'block';
            toggleCog[1].style.display = 'none';
            let childrent = parent.getElementsByClassName('editContent')[0];
            childrent.classList.add('closeEditComment');
            childrent.addEventListener('animationend', () => {
                if (grander.getElementsByClassName('buttonForEditComment')[0]) {
                    const input = parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
                    const div = document.createElement('div');
                    div.classList.add('contentOfUser');
                    div.innerHTML = this.state.dataComment[key].data.content;
                    input.replaceWith(div);
                    parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.remove();
                }
                if (boxForRemoveComment.clientHeight === 80) {
                    boxForRemoveComment.style.height = '0px';
                    boxForRemoveComment.style.overflow = 'hidden';
                }
                ReactDOM.unmountComponentAtNode(document.getElementsByClassName('renderEditComment')[key]);
            });
        }
    }
    //create function postComment 
    startPostComment = (e) => {
        this.setState({ isCloseLoader: 'flex' })
        const date = new Date();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
        const year = date.getFullYear();
        const arrDay = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const user = {};
        user.username = JSON.parse(sessionStorage.getItem('user')).name;
        user.id = sessionStorage.getItem('id');
        user.dislike = 0;
        user.like = 0;
        user.time = arrDay[date.getDay()] + ' - ' + hours + ':' + minutes + ':' + seconds;
        user.day = day + '/' + month + '/' + year;
        user.content = this.state.content;
        const totalComment = [];
        totalComment.push(user);
        if (this.state.dataComment.length > 0) {
            this.state.dataComment.forEach(value => {
                totalComment.push(value.data);
            })
        }
        const data = firebase.database().ref('Products');
        data.child(e).update({
            commentBy: totalComment
        })
            .then(() => {
                this.renderCommentFromFirebase()
                    .then(() => {
                        document.getElementsByClassName('contentOfUser')[0].innerHTML = this.state.dataComment[0].data.content;
                    })
            })
    }
    //end function
    //create function closeRemoveComment
    closeRemoveComment = (key) => {
        let closeBox = document.getElementsByClassName('renderRemoveComment')[key];
        closeBox.style.height = '0px';
        closeBox.style.overflow = 'hidden';
        this.SettingComment(key, null);
    }
    startRemoveComment = (IDComment, key) => {
        this.closeRemoveComment(key);
        return firebase.database().ref('Products')
            .child(this.props.IDProduct + '/commentBy/' + IDComment).remove()
            .then(() => {
                return firebase.database().ref('Products')
                    .child(this.props.IDProduct + '/commentBy')
                    .once('value')
                    .then(data => {
                        const arrComments = [];
                        data.forEach(value => {
                            arrComments.push(value.val());
                        })
                        return firebase.database().ref('Products')
                            .child(this.props.IDProduct).update({ commentBy: arrComments })
                            .then(() => {
                                if (document.getElementsByClassName('comment__content-user')[key]) {
                                    let box = document.getElementsByClassName('comment__content-user')[key];
                                    box.style.transform = 'translateY(100%)';
                                    box.style.opacity = 0;
                                    setTimeout(() => {
                                        this.renderCommentFromFirebase()
                                            .then(() => {
                                                box.removeAttribute('style');
                                                if (document.getElementsByClassName('contentOfUser')[0]) {
                                                    document.getElementsByClassName('contentOfUser')[0].innerHTML = this.state.dataComment[0].data.content;
                                                }
                                            })
                                    }, 500)
                                }
                            })
                    })
            })
    }
    //end function
    //show panination
    //start = 3 *4 - 4;
    //end = 4 * 3 
    /*page hiện tại .... 1 */
    /*Số comment muốn lấy 4 */
    //tổng số bình luận 15
    //start 0
    //end 4
    showComment = () => {
        let resultComent = 4;
        let end = this.state.curentPage * resultComent; //12
        let start = this.state.curentPage * resultComent - resultComent; //4
        return this.state.dataComment.map((value, key) => {
            if (key >= start && key < end) {
                if (sessionStorage.getItem('user')) {
                    if (value.data.id === sessionStorage.getItem('id')) {
                        return (
                            <div key={key} className="comment__content-user">
                                <div className='loaderForCommentUser'>
                                    <div style={{ margin: 'auto' }} className="lds-ripple"><div></div><div></div></div>
                                </div>
                                <div className="name">
                                    {value.data.username}
                                </div>
                                <div className="date">
                                    <span>{value.data.time}</span>{'\u00A0'}-{'\u00A0'}<span>{value.data.day}</span>
                                </div>
                                <div className="contentOfUser">
                                    {value.data.content}
                                </div>
                                <div className="action">
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    <span>{value.data.like}</span>
                                    <i id="modifier" className="fa fa-thumbs-down" aria-hidden="true"></i>
                                    <span>{value.data.dislike}</span>
                                </div>
                                <label onClick={() => this.SettingComment(key, value.id)} className="fa fa-cog toggleCog" aria-hidden="true"></label>
                                <label style={{ display: 'none' }} onClick={() => this.SettingComment(key, value.id)} className="fa fa-times toggleCog" aria-hidden="true"></label>
                                <div className='renderRemoveComment'>
                                    <p>Bạn có chắc chắn muốn xóa bình luận này không ? </p>
                                    <div>
                                        <button onClick={() => this.startRemoveComment(value.id, key)}><i style={{ marginRight: '5px' }} className="fa fa-check" aria-hidden="true"></i>Xác nhận</button>
                                        <button onClick={() => this.closeRemoveComment(key)}><i style={{ marginRight: '5px' }} className="fa fa-ban" aria-hidden="true"></i>Hủy</button>
                                    </div>
                                </div>
                                <div className='renderEditComment'></div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={key} className="comment__content-user">
                                <div className="name">
                                    {value.data.username}
                                </div>
                                <div className="date">
                                    <span>{value.data.time}</span>{'\u00A0'}-{'\u00A0'}<span>{value.data.day}</span>
                                </div>
                                <div className="contentOfUser">
                                    {value.data.content}
                                </div>
                                <div className="action">
                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    <span>{value.data.like}</span>
                                    <i id="modifier" className="fa fa-thumbs-down" aria-hidden="true"></i>
                                    <span>{value.data.dislike}</span>
                                </div>
                                <div className='renderEditComment'>

                                </div>
                            </div>
                        )
                    }
                }
                else {
                    return (
                        <div key={key} className="comment__content-user">
                            <div className="name">
                                {value.data.username}
                            </div>
                            <div className="date">
                                <span>{value.data.time}</span>{'\u00A0'}-{'\u00A0'}<span>{value.data.day}</span>
                            </div>
                            <div className="contentOfUser">
                                {value.data.content}
                            </div>
                            <div className="action">
                                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                <span>{value.data.like}</span>
                                <i id="modifier" className="fa fa-thumbs-down" aria-hidden="true"></i>
                                <span>{value.data.dislike}</span>
                            </div>
                            <div className='renderEditComment'>

                            </div>
                        </div>
                    )
                }
            }
            return null;
        })
    }
    //end function
    showPanination = () => {
        let totalComment = this.state.dataComment.length / 4;
        totalComment = Math.ceil(totalComment);
        return this.state.dataComment.map((value, key) => {
            if (key < totalComment) {
                if (key === this.state.curentPage - 1) {
                    return (<button style={{ background: 'black', color: 'white', borderRadius: '5px' }} key={key} onClick={() => this.setState({ curentPage: key + 1 })}>{key + 1}</button>)
                }
                else {
                    return (<button key={key} onClick={() => this.setState({ curentPage: key + 1 })}>{key + 1}</button>)
                }
            }
            return null
        })
    }
    render() {
        return (
            <div className="dataForUser">
                <div className="comment">
                    <div className="comment__title">
                        <span>{(this.state.dataComment.length > 0) ? this.state.dataComment.length : 0}</span>{'\u00A0'}
                                 bình luận về{'\u00A0'}
                        <span>MacBook Air 2017 i5 1.8GHz/8GB/128GB</span>
                    </div>
                    <div className="comment__content">
                        <div style={{ display: this.state.isCloseLoader }} className="boxLoaderForComment">
                            <div style={{ width: '60px', height: '60px', paddingTop: '0' }} className="lds-dual-ring"></div>
                        </div>
                        {(this.state.dataComment.length > 0) ?
                            this.showComment()
                            : <center>Chưa có bình luận nào về sản phẩm này</center>}
                        <div className="panination">
                            {(this.state.dataComment.length > 0) ? this.showPanination() : null}
                        </div>
                    </div>
                </div>
                <div className="postComment">
                    <div className="postComment__title">Viết bình luận</div>
                    <form id="reset">
                        <textarea name="content" onChange={this.getDataFromBoxComment} defaultValue='' className="postComment__input" placeholder="Nhập nội dung bình luận....." ></textarea>
                        <p style={{ color: 'red', fontSize: '15px', paddingLeft: '30px' }}>{this.state.errorPostComment}</p>
                        <button type='submit' onClick={this.writeComment}>Bình luận</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Comment