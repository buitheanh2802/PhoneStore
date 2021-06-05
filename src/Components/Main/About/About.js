import React, { Component } from 'react';

class About extends Component {
    click = () =>
    {
        let random = Math.floor(Math.random() * 2000);
        console.log(random)
    }
    render() {
        return (
            <div className = "about">
               <button onClick = {this.click}>Click</button>
            </div>
        );
    }
}

export default About;