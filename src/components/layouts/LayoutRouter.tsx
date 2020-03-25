import { Route } from '@ant-design/pro-layout/lib/typings';
import React from 'react';
import { menu } from './menu';

/**
 * This walks down the routes in `menu` and, for each level, if the path matches
 * the current path and there's a `component` defined, wrap `children` in the
 * component and pass the child `route` to the component as a prop.
 *
 * This is basically trying to recreate how umi applies layout components to
 * higher level pages.
 */
export default function LayoutRouter(props: {
    route?: Route;
    path: string;
    children: React.ReactNode | React.ReactNode[];
}) {
    const route = props.route || menu;
    let result: JSX.Element | undefined;

    for (const childRoute of route.routes || []) {
        if (childRoute.path && props.path.startsWith(childRoute.path)) {
            if (childRoute.component) {
                const Wrapper = childRoute.component;
                result = (
                    <Wrapper route={childRoute}>
                        <LayoutRouter {...props} route={childRoute} />
                    </Wrapper>
                );
            } else {
                result = <LayoutRouter {...props} route={childRoute} />;
            }
            break;
        }
    }

    return result || <>{props.children}</>;
}
