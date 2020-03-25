import {
    DefaultFooter,
    getMenuData,
    getPageTitle,
} from '@ant-design/pro-layout';
import { MessageDescriptor, Route } from '@ant-design/pro-layout/lib/typings';
import { Link } from 'gatsby';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from 'react-i18n-wrapper';
import logo from '../../assets/logo.svg';
import SelectLang from '../../components/SelectLang';
import styles from './UserLayout.module.less';

const UserLayout: React.FC<{ route: Route }> = props => {
    const {
        route = {
            routes: [],
        },
        children,
    } = props;
    const { routes = [] } = route;
    const { translate } = useI18n();

    const formatMessage = useCallback(
        (descriptor: MessageDescriptor) => {
            return translate(descriptor.id);
        },
        [translate]
    );

    const { breadcrumb } = getMenuData(routes);
    const title = getPageTitle({
        pathname: location.pathname,
        formatMessage,
        breadcrumb,
        ...props,
    });

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.lang}>
                    <SelectLang />
                </div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img
                                    alt="logo"
                                    className={styles.logo}
                                    src={logo}
                                />
                                <span className={styles.title}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>
                            Ant Design 是西湖区最具影响力的 Web 设计规范
                        </div>
                    </div>
                    {children}
                </div>
                <DefaultFooter />
            </div>
        </>
    );
};

export default UserLayout;
