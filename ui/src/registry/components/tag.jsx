import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import {RegistryActions} from '../actions'
import Blob from './blob';

export class Tag extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        const { manifestsActions, repository, tag } = this.props;
        manifestsActions && manifestsActions.manifest(repository, tag)
    }

    DeleteTag() {
        const { repositories, repository, tag, manifestsActions } = this.props;
        const digest = repositories[repository][tag] ? repositories[repository][tag].digest : false;
        manifestsActions && digest && manifestsActions.deleteTag(repository, tag, digest)
    }

    render() {
        
        const { repositories, repository, tag } = this.props;
        let digest = false;

        if (repositories[repository] && repositories[repository][tag] && repositories[repository][tag].config_digest) {
            digest = repositories[repository][tag].config_digest;
        }
        
        return (
            <li>
                {tag} <button onClick={this.DeleteTag.bind(this)}>Delete</button>
                {
                    digest 
                        ? <Blob repository={repository} tag={tag} digest={digest} />
                        : <div></div>
                }
            </li>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        repositories: state.registry.manifests.toObject()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        manifestsActions: bindActionCreators(RegistryActions.manifestsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Tag));
