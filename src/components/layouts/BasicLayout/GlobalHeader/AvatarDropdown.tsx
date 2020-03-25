import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { navigate } from 'gatsby';
import React, { useCallback } from 'react';
import { Translate } from 'react-i18n-wrapper';
import HeaderDropdown from '../../../HeaderDropdown';
import { CurrentUser, useCurrentUser } from '../../../hooks/useCurrentUser';
import styles from './index.module.less';

export interface AvatarDropdownProps {
    // TODO: Provide currentUser
    currentUser?: CurrentUser;
    menu?: boolean;
}

export default function AvatarDropdown(props: AvatarDropdownProps) {
    const { currentUser, setCurrentUser } = useCurrentUser();

    const onMenuClick = useCallback(
        (event: ClickParam) => {
            const { key } = event;

            if (key === 'logout') {
                setCurrentUser(undefined);
                navigate('/login');
            } else {
                navigate(`/account/${key}`);
            }
        },
        [setCurrentUser]
    );

    // TODO: Fix translations
    const { menu } = props;
    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            {menu && (
                <Menu.Item key="center">
                    <UserOutlined />
                    个人中心
                </Menu.Item>
            )}
            {menu && (
                <Menu.Item key="settings">
                    <SettingOutlined />
                    个人设置
                </Menu.Item>
            )}
            {menu && <Menu.Divider />}

            <Menu.Item key="logout">
                <LogoutOutlined />
                <Translate message="logout" />
            </Menu.Item>
        </Menu>
    );

    if (currentUser) {
        return (
            <HeaderDropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar
                        size="small"
                        className={styles.avatar}
                        src={currentUser.avatar}
                        alt="avatar"
                    />
                    <span className={styles.name}>{currentUser.name}</span>
                </span>
            </HeaderDropdown>
        );
    } else {
        return (
            <span className={`${styles.action} ${styles.account}`}>
                <Spin
                    size="small"
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                />
            </span>
        );
    }
}
