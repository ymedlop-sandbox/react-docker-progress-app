import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import {RegistryActions} from '../actions'
import Repository from './repository';

export class Catalog extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        const { catalogActions } = this.props;
        catalogActions && catalogActions.list()
    }

    render() {
        const {repositories} = this.props;
        return (
            <div className="registry">
                <ul className="repositories">
                    {
                        repositories.map((item, i) => {
                            return (
                                <Repository repository={item} key={i}/>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        repositories: state.registry.catalog.get('repositories')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        catalogActions: bindActionCreators(RegistryActions.CatalogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Catalog));
