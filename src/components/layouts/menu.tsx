import * as Icons from '@ant-design/icons';
import { Route } from '@ant-design/pro-layout/lib/typings';
import React from 'react';
import BasicLayout from './BasicLayout';
import UserLayout from './UserLayout';

/**
 * This defines how layouts are applied to paths.  When `LayoutRouter` walks
 * down the tree defined below, if it finds a path that matches the current path
 * and the route has a `component`, then the component will be rendered, passing
 * the current route as the `route` prop to the component.
 *
 * Note that `name` here will automatically be prefixed with "menu.", any parent
 * menus and then translated.
 */
export const menu: Route = {
    routes: [
        {
            path: '/login',
            component: UserLayout,
        },
        {
            path: '/',
            component: BasicLayout,
            routes: [
                {
                    path: '/',
                    name: 'welcome',
                    icon: <Icons.HomeOutlined />,
                },
                {
                    path: '/admin',
                    name: 'admin',
                    icon: <Icons.CrownOutlined />,
                    authority: ['admin'],
                    routes: [
                        {
                            path: '/admin/sub-page',
                            name: 'sub-page',
                            icon: <Icons.SmileOutlined />,
                            authority: ['admin'],
                        },
                    ],
                },
                {
                    name: 'table-list',
                    icon: <Icons.TableOutlined />,
                    path: '/list',
                },
            ],
        },
    ],
};
