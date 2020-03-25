import { Route } from '@ant-design/pro-layout/lib/typings';
import { Result } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import React from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

export type AuthorityType = string | string[] | undefined;

export interface AuthorizedProps {
    authority?: AuthorityType;
    children: React.ReactNode | React.ReactNode[];
}

function hasRequiredAuthority(
    requirement: string,
    userAuthority: AuthorityType
): boolean {
    if (Array.isArray(userAuthority)) {
        return userAuthority.includes(requirement);
    } else if (typeof userAuthority === 'string') {
        return userAuthority === requirement;
    } else {
        return false;
    }
}

/**
 * Returns true if `userAuthority` has all the authorities listed in `requiredAuthority`,
 * or if `requiredAuthority` is undefined or an empty array.  Returns false otherwise.
 */
export function isAuthorized(
    requiredAuthority: AuthorityType,
    userAuthority: AuthorityType
): boolean {
    if (!requiredAuthority) {
        return true;
    } else if (typeof requiredAuthority === 'string') {
        return hasRequiredAuthority(requiredAuthority, userAuthority);
    } else if (Array.isArray(requiredAuthority)) {
        return (
            requiredAuthority.length === 0 ||
            requiredAuthority.every(requirement =>
                hasRequiredAuthority(requirement, userAuthority)
            )
        );
    } else {
        return false;
    }
}

export const getAuthorityFromRouter = <T extends Route>(
    router: T[] = [],
    pathname: string
): T | undefined => {
    const authority = router.find(
        ({ routes, path = '/' }) =>
            (path && pathToRegexp(path).exec(pathname)) ||
            (routes && getAuthorityFromRouter(routes, pathname))
    );
    return authority;
};

export default function Authorized({ children, authority }: AuthorizedProps) {
    const { currentUser } = useCurrentUser();
    const authorized = isAuthorized(authority, currentUser?.authority);

    if (authorized) {
        return <>{children}</>;
    } else {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        );
    }
}
