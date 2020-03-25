import {
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useCurrentUser } from '../components/hooks/useCurrentUser';
import LoginFrom from '../components/Login';
import * as loginService from '../lib/loginService';
import styles from './login.module.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

interface State {
    submitting: boolean;
    status?: 'ok' | 'error';
    type?: string;
}

const Login: React.FC<{}> = props => {
    const [autoLogin, setAutoLogin] = useState(true);
    const [type, setType] = useState<string>('account');

    const [loginState, setLoginState] = useState<State>({ submitting: false });
    const { setCurrentUser } = useCurrentUser();

    const handleSubmit = (values: loginService.LoginParamsType) => {
        setLoginState({
            submitting: true,
            type,
        });

        Promise.resolve()
            .then(async () => {
                const result = await loginService.fakeAccountLogin(values);
                console.log('OK', result);
                setLoginState({
                    submitting: false,
                    status: 'ok',
                    type,
                });
                setCurrentUser(result);
            })
            .catch(err => {
                console.log('err', err);
                setLoginState({ submitting: false, status: 'error', type });
            });
    };

    const { status, type: loginType, submitting } = loginState;

    return (
        <div className={styles.main}>
            <LoginFrom
                activeKey={type}
                onTabChange={setType}
                onSubmit={handleSubmit}
            >
                <Tab key="account" tab="Account password login">
                    {status === 'error' &&
                        loginType === 'account' &&
                        !submitting && (
                            <LoginMessage content="Account or password error（admin/ant.design）" />
                        )}

                    <UserName
                        name="userName"
                        placeholder="Username: admin or user"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="Password: ant.design"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                    />
                </Tab>
                <Tab key="mobile" tab="Mobile number login">
                    {status === 'error' &&
                        loginType === 'mobile' &&
                        !submitting && (
                            <LoginMessage content="Verification code error" />
                        )}
                    <Mobile
                        name="mobile"
                        placeholder="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter phone number!',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: 'Malformed phone number!',
                            },
                        ]}
                    />
                    <Captcha
                        name="captcha"
                        placeholder="Verification code"
                        countDown={120}
                        getCaptchaButtonText=""
                        getCaptchaSecondText="second"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter verification code!',
                            },
                        ]}
                    />
                </Tab>
                <div>
                    <Checkbox
                        checked={autoLogin}
                        onChange={e => setAutoLogin(e.target.checked)}
                    >
                        Remember Me
                    </Checkbox>
                    <a
                        href="#forgot"
                        style={{
                            float: 'right',
                        }}
                    >
                        Forgot Password
                    </a>
                </div>
                <Submit loading={submitting}>Log in</Submit>
                <div className={styles.other}>
                    Other login methods
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                    <Link className={styles.register} to="/user/register">
                        Register
                    </Link>
                </div>
            </LoginFrom>
        </div>
    );
};

export default Login;
