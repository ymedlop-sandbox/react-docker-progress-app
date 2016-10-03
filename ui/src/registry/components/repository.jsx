import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import {RegistryActions} from '../actions'
import Tag from './tag';

export class Repository extends Component {

    state = {
        show: false
    }
    
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    componentDidMount() {
        const { tagsActions, repository } = this.props;
        tagsActions && tagsActions.list(repository)
    }
    
    onClick() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const {repository, repositories} = this.props;
        const tags = repositories[repository];

        return (

            <li onClick={this.onClick.bind(this)}>
                <span>
                    {tags ? tags.length : 0} {repository}
                </span> 
                
                {
                    this.state.show
                        
                        ?
                            <ul>
                                {
                                    tags.map((item, i) => {
                                        return (
                                            <Tag repository={repository} tag={item} key={i}/>
                                        )
                                    })
                                }
                            </ul>
                        
                        : <div></div>
                }
                
            </li>
        );
    }
}


function mapStateToProps(state) {
    return {
        repositories: state.registry.tags.toObject()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tagsActions: bindActionCreators(RegistryActions.tagsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Repository));

