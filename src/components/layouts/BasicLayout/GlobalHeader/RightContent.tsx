import React from 'react';
import SelectLang from '../../../SelectLang';
import AvatarDropdown from './AvatarDropdown';
import HeaderSearch from './HeaderSearch';
import styles from './index.module.less';

const GlobalHeaderRight: React.SFC<{
    navTheme: 'dark' | 'light';
    layout: 'sidemenu' | 'topmenu';
}> = props => {
    const { navTheme: theme, layout } = props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
        className = `${styles.right} ${styles.dark}`;
    }

    return (
        <div className={className}>
            <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="Search"
                options={[
                    {
                        label: (
                            <a href="https://umijs.org/zh/guide/umi-ui.html">
                                umi ui
                            </a>
                        ),
                        value: 'umi ui',
                    },
                    {
                        label: <a href="next.ant.design">Ant Design</a>,
                        value: 'Ant Design',
                    },
                    {
                        label: (
                            <a href="https://protable.ant.design/">Pro Table</a>
                        ),
                        value: 'Pro Table',
                    },
                    {
                        label: (
                            <a href="https://prolayout.ant.design/">
                                Pro Layout
                            </a>
                        ),
                        value: 'Pro Layout',
                    },
                ]}
                // TODO
                // onSearch={value => {
                //   //console.log('input', value);
                // }}
            />
            <AvatarDropdown />
            <SelectLang className={styles.action} />
        </div>
    );
};

export default GlobalHeaderRight;
