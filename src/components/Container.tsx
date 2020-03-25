import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

export default function Container({ children }: ContainerProps) {
    return <div className={styles.container}>{children}</div>;
}
