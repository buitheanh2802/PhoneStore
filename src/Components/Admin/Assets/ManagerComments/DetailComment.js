import React, { Component } from 'react';

class DetailComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }
    getData = e =>
    {
       this.props.removeComment(this.props.IDProduct,e,this.props.renderFromIndex);
    }
    render() {
        let count = 1;
        return (
            <table className='detailComments'>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Họ và tên</td>
                        <td>Nội dung</td>
                        <td>Thời gian bình luận</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    {(this.props.dataComments) ? this.props.dataComments.map((value, key) => {
                        return (
                            <tr key = {key}>
                                <td style = {{textAlign : 'center'}}>{count++}</td>
                                <td style = {{fontWeight : '500'}}>{value.username}</td>
                                <td  style = {{fontWeight : '500'}}>{value.content}</td>
                                <td>{value.time} - {value.day}</td>
                                <td><button onClick = {() => this.getData(key)}><i style = {{marginRight : '5px'}} className="fa fa-trash" aria-hidden="true"></i>Xóa</button></td>
                            </tr>
                        )
                    }) : <tr><td style = {{textAlign :  'center',fontWeight : '600'}} colSpan = '5'>Chưa có bình luận nào về sản phẩm này</td></tr>}
                </tbody>
            </table>
        );
    }
}

export default DetailComment;