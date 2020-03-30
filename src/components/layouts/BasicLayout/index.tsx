/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
    BasicLayoutProps as ProLayoutProps,
    MenuDataItem,
} from '@ant-design/pro-layout';
import { MessageDescriptor, Route } from '@ant-design/pro-layout/lib/typings';
import { useLocation } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useCallback, useState } from 'react';
import { useI18n } from 'react-i18n-wrapper';
import antdSettings from '../../../antdSettings';
import logo from '../../../assets/logo.svg';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Authorized, {
    getAuthorityFromRouter,
    isAuthorized,
} from '../../utils/Authorized';
import { menu } from '../menu';
import Footer from './Footer';
import RightContent from './GlobalHeader/RightContent';

/**
 * This is the layout used for most pages in the manager UI - it has a
 * navigation header, sidebar, and notifications.  Pretty much the only time
 * this isn't used is when no user is logged in.
 */
export interface BasicLayoutProps extends ProLayoutProps {
    route?: Route;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { children } = props;
    const { translate } = useI18n();
    const routes = props.route || menu;
    const location = useLocation();
    const { currentUser } = useCurrentUser();

    const [menuCollapsed, handleMenuCollapse] = useState(false);

    const formatMessage = useCallback(
        (descriptor: MessageDescriptor) => translate(descriptor.id),
        [translate]
    );

    const data = useStaticQuery(graphql`
        query HeaderQuery {
            site {
                siteMetadata {
                    title
                    layout
                    primaryColor
                    fixedHeader
                    fixSiderbar
                    autoHideHeader
                    navTheme
                    primaryColor
                    contentWidth
                }
            }
        }
    `);

    const { title, ...gatsbySettings } = data.site.siteMetadata;
    const currentRoute = getAuthorityFromRouter(
        routes?.routes,
        location.pathname || '/'
    ) || {
        authority: undefined,
    };

    const menuDataRender = useCallback(
        (menuList: MenuDataItem[]): MenuDataItem[] =>
            menuList
                .filter(child =>
                    isAuthorized(child.authority, currentUser?.authority)
                )
                .map(item => {
                    return {
                        ...item,
                        children: item.children
                            ? menuDataRender(item.children)
                            : [],
                    };
                }),
        [currentUser]
    );

    return (
        <ProLayout
            logo={logo}
            title={title}
            formatMessage={formatMessage}
            menuHeaderRender={(logoDom, titleDom) => (
                <Link to="/">
                    {logoDom}
                    {titleDom}
                </Link>
            )}
            onCollapse={handleMenuCollapse}
            collapsed={menuCollapsed}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (
                    menuItemProps.isUrl ||
                    menuItemProps.children ||
                    !menuItemProps.path
                ) {
                    return defaultDom;
                }

                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routes = []) => [
                {
                    path: '/',
                    breadcrumbName: translate('menu.home'),
                },
                ...routes,
            ]}
            itemRender={(route, _params, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            footerRender={Footer}
            menuDataRender={menuDataRender}
            rightContentRender={() => (
                <RightContent
                    navTheme={gatsbySettings.navTheme}
                    layout={gatsbySettings.layout}
                />
            )}
            {...antdSettings}
            {...gatsbySettings}
            route={routes}
        >
            <Authorized authority={currentRoute.authority}>
                {children}
            </Authorized>
        </ProLayout>
    );
};

const BasicLayoutWrapper: React.FC<BasicLayoutProps> = props => (
    <BasicLayout {...props} />
);

export default BasicLayoutWrapper;
