import React, { Component } from 'react';

class SettingComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentEdit : this.props.parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML,
            isPostContent :this.props.parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML
        }
    }
    updateComment = () =>
    {
        let boxLoader = document.getElementsByClassName('loaderForCommentUser')[this.props.ID];
        boxLoader.style.display = 'flex';
        const date = new Date();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
        const year = date.getFullYear();
        const arrDay = ['Chủ nhật','Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const user = {};
        user.username = JSON.parse(sessionStorage.getItem('user')).name;
        user.id = sessionStorage.getItem('id');
        user.dislike = 0;
        user.like = 0;
        user.time = arrDay[date.getDay()] + ' - ' + hours + ':' + minutes + ':' + seconds;
        user.day = day + '/' + month + '/' + year;
        user.content = this.state.isPostContent;
        this.props.startRunEditComment(this.props.ID,this.props.IDComment,user);
    }
    getDataEdit = (e) =>
    {
         this.setState({isPostContent : e.target.value});
    }
    editComment = (e) =>
    {
        let box = document.getElementsByClassName('renderRemoveComment')[this.props.ID];
        box.style.height = '0px';
        box.style.overflow = 'hidden';
        this.props.isEdit(this.props.ID);
        e.target.disabled = true;
        const div = this.props.parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
        const input = document.createElement('input');
        const button = document.createElement('button');
        button.onclick = this.updateComment;
        button.innerHTML = 'Cập nhật';
        button.classList.add('buttonForEditComment');
        input.onkeyup = this.getDataEdit;
        input.classList.add('inputForEditComment');
        input.placeholder = 'Nhập nội dung cần sửa.....';
        div.replaceWith(input,button);
        input.value = this.state.contentEdit;
        input.focus();
    }
    removeComment = (e) =>
    {
        let parent = document.getElementsByClassName('renderEditComment')[this.props.ID];
        let grander = parent.parentElement;
        if (grander.getElementsByClassName('buttonForEditComment')[0]) {
            const input = parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
            const div = document.createElement('div');
            div.classList.add('contentOfUser');
            div.innerHTML = this.props.content;
            input.replaceWith(div);
            parent.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.remove();
        }
         e.target.disabled = true;
         let box = document.getElementsByClassName('renderRemoveComment')[this.props.ID];
         box.style.height = '80px';
         box.style.overflow = 'unset';
    }
    render() {
        return (
            <div className = 'editContent'>
                <button onClick = {this.editComment}><i style = {{marginRight : '5px'}} className="fa fa-pencil-square-o" aria-hidden="true"></i> Sửa</button>
                <button onClick = {this.removeComment}><i style = {{marginRight : '5px'}} className="fa fa-trash" aria-hidden="true"></i>Xóa</button>
            </div>
        );
    }
}

export default SettingComments;