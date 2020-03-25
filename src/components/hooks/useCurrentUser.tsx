import React, { useState, useContext } from 'react';

export interface CurrentUser {
    /** List of permissions the current user has. */
    authority: string[];
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    userid?: string;
    unreadCount?: number;
}

interface CurrentUserContext {
    currentUser?: CurrentUser;
    setCurrentUser(currentUser: CurrentUser | undefined): void;
}

const CurrentUserContext = React.createContext<CurrentUserContext>({
    currentUser: undefined,
    setCurrentUser: () => {
        throw new Error('No CurrentUserProvider set.');
    },
});

export interface CurrentUserProviderProps {
    user?: CurrentUser;
    children: React.ReactNode | React.ReactNode[];
}

/**
 * Provides the CurrentUserContext.
 */
export function CurrentUserProvider(props: CurrentUserProviderProps) {
    const [currentUser, setCurrentUser] = useState(props.user);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </CurrentUserContext.Provider>
    );
}

/**
 * Used to fetch/set the current user.
 */
export function useCurrentUser() {
    return useContext(CurrentUserContext);
}
