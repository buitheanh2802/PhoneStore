import React, { Component } from 'react';

class AddCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCategories : ''
        }
    }
    getData = e =>
    {
        this.setState({nameCategories : e.target.value});
    }
    getFile = e =>
    {
       this.setState({fileName : e.target.files[0].name,dataFile : e.target.files[0]});
    }
    submitForm =() =>
    {
        const date = new Date();
        const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
        const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
        const year = date.getFullYear();
        const dayUpdate =  day + '/' + month + '/' + year;
        const categories = {};
        categories.name = this.state.nameCategories;
        categories.creationTime = dayUpdate;
        categories.image = this.state.fileName;
        this.props.addCategories(categories,this.state.fileName,this.state.dataFile);
    }
    render() {
        return (
            <div className = 'addCategories'>
                <input onChange = {this.getData} type='text' placeholder='Nhập tên danh mục .....' />
                <input type = 'file' onChange = {this.getFile} />
                <button onClick = {this.submitForm}><i style={{ marginRight: '5px' }} className="fa fa-plus-circle" aria-hidden="true"></i>Thêm</button>
            </div>
        );
    }
}

export default AddCategories;