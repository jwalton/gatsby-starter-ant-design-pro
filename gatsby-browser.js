import 'antd/dist/antd.css';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from 'react-i18n-wrapper';
import { CurrentUserProvider } from './src/components/hooks/useCurrentUser';
import LayouRouter from './src/components/layouts/LayoutRouter';
import './src/styles/global.css';
import translations from './src/translations';

export function wrapRootElement(props) {
    return (
        <CurrentUserProvider user={{ authority: [], name: 'Jason Walton' }}>
            <I18nProvider language="en-US" translations={translations}>
                <HelmetProvider>{props.element}</HelmetProvider>
            </I18nProvider>
        </CurrentUserProvider>
    );
}

export function wrapPageElement({ props, element }) {
    return <LayouRouter {...props}>{element}</LayouRouter>;
}
