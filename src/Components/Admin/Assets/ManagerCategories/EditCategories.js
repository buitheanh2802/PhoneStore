import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class EditCatecories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCategories : this.props.data.name
        }
    }
    //closeEditForm
    closeEditForm = () =>
    {
       ReactDOM.unmountComponentAtNode(document.getElementsByClassName('renderInfo')[this.props.id]);
    }
    //closeEdit Form end..... 
    //get content 
    getContent = (e) =>
    {
      this.setState({[e.target.name] : e.target.value});
    }
    //end get content .....
    submitForm = () =>
    {
        this.props.updateCategories(this.props.IDCategories,this.state.nameCategories);
        this.closeEditForm()
    }
    render() {
        return (
            <div className='editCategories'>
                <div style = {{height : '214px'}} className="user__delete">
                    <div className="user__delete-title editCategories__title">Thông tin</div>
                    <div className = 'editCategories__input'>
                         <p>Tên danh mục</p>
                         <input onChange = {this.getContent} name = 'nameCategories' defaultValue = {this.state.nameCategories} type = 'text' placeholder = 'Nhập nội dung cần sửa' />
                    </div>
                    <div className="user__delete-confirm">
                        <button onClick = {this.submitForm}><i className="fa fa-check" aria-hidden="true" style={{marginRight:'5px'}}></i>Cập nhật</button>
                        <button onClick = {this.closeEditForm}><i className="fa fa-times" aria-hidden="true" style={{marginRight:'5px'}}></i>Hủy bỏ</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCatecories;