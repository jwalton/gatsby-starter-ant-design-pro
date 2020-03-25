import { Typography } from 'antd';
import React from 'react';
import styles from './CodePreview.module.less';

export const CodePreview: React.FC<{}> = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);
