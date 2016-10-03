import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import {RegistryActions} from '../actions'

export class Blob extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        const { blobsActions, repository, tag, digest } = this.props;
        blobsActions && blobsActions.getBlob(repository, tag, digest);
    }

    render() {
        
        const { tag, repository, repositories } = this.props;
        const blob = repositories[repository] ? repositories[repository][tag] : {};
        
        return (
            <div>
                <pre>
                    {JSON.stringify(blob, null, 2) }
                </pre>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        repositories: state.registry.blobs.toObject()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blobsActions: bindActionCreators(RegistryActions.blobsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Blob));
