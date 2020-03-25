import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { useI18n } from 'react-i18n-wrapper';
import classNames from '../../lib/classNames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';

interface SelectLangProps {
    className?: string;
}

const languageLabels = {
    'en-US': 'English',
    'fr-CA': 'Français',
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'pt-BR': 'Português',
} as const;

type LanguageType = keyof typeof languageLabels;

const locales: LanguageType[] = ['en-US', 'fr-CA', 'zh-CN', 'zh-TW', 'pt-BR'];

const languageIcons = {
    'en-US': '🇺🇸',
    'fr-CA': '🇨🇦',
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
    'pt-BR': '🇧🇷',
};

const SelectLang: React.FC<SelectLangProps> = props => {
    const { className } = props;
    const i18n = useI18n();

    const changeLang = ({ key }: ClickParam): void => i18n.setLanguage(key);

    const langMenu = (
        <Menu
            className={styles.menu}
            selectedKeys={[i18n.language]}
            onClick={changeLang}
        >
            {locales.map(locale => (
                <Menu.Item key={locale}>
                    <span role="img" aria-label={languageLabels[locale]}>
                        {languageIcons[locale]}
                    </span>{' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <HeaderDropdown overlay={langMenu} placement="bottomRight">
            <span className={classNames(styles.dropDown, className)}>
                <GlobalOutlined title={i18n.translate('menu.setLanguage')} />
            </span>
        </HeaderDropdown>
    );
};

export default SelectLang;
