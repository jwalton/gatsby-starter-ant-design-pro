import { Alert, Button, Card, Typography } from 'antd';
import React from 'react';
import { useCurrentUser } from '../components/hooks/useCurrentUser';
import { CodePreview } from '../components/utils/CodePreview';

export default function Welcome() {
    const { setCurrentUser } = useCurrentUser();

    return (
        <Card>
            <Alert
                message="Gatsby/Ant Design Pro Setup!"
                type="success"
                showIcon
                banner
                style={{
                    margin: -12,
                    marginBottom: 24,
                }}
            />
            <Typography.Text>Run this project with:</Typography.Text>
            <CodePreview>npm run develop</CodePreview>
            <Button
                onClick={() =>
                    setCurrentUser({ name: 'Mr. Admin', authority: ['admin'] })
                }
            >
                Switch to Admin
            </Button>
        </Card>
    );
}
