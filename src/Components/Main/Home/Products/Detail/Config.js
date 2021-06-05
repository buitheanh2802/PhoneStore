import React, { Component } from 'react';

class Config extends Component {
    render() {
        return (
            <div className="detail__product-config">
                <div>Thông số kĩ thuật </div>
                <div>
                    {this.props.data.map((value, key) => {
                        const config = value.split(":");
                        return (<p key = {key}>
                            <span>{config[0]} : </span>
                            <span>{config[1]}</span>
                        </p>)
                    })}
                </div>
            </div>
        );
    }
}

export default Config;