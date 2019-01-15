import React, { Component } from "react"

export default class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            isToggleOn: true
        };

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

    }

    handleClick = (id, e) => {
        console.log(id)
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        return (
            <div>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
                <a href="#" onClick={this.handleClick.bind(this, this.state.isToggleOn)}>Click me</a>
            </div>
        )
    }
}