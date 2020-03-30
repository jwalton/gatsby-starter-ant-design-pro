import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import React from 'react';

export default function AdminSubPage() {
    return (
        <PageHeaderWrapper>
            <Card>
                <Typography.Text>A sub-page.</Typography.Text>
            </Card>
        </PageHeaderWrapper>
    );
}
