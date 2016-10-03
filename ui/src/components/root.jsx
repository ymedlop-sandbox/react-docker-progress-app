import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class Root extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}