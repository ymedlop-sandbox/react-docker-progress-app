import { update, intlReducer} from 'react-intl-redux';
import {constants} from '../constants';

export default function i18nReducer(state={}, action={}) {
    switch (action.type) {
        case constants.i18nActions.I18N_SET_STATE:
            const
                {locale, messages} = action.state,
                flatMessages = flattenMessages(messages),
                intlAction = update({locale, messages: flatMessages});

            return intlReducer(state, intlAction);
        default:
            return state;
    }
}

function flattenMessages(nestedMessages, prefix='') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}