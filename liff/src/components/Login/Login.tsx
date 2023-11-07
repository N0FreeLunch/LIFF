import { useState } from 'react';

import BasicTextField from './BasicTextField';
import PasswordTextFields from './PasswordTextFields';

const Login = () => {    
    return (
        <div>
            <BasicTextField label={"아이디를 입력하세요."} />
            <PasswordTextFields label={"비밀번호를 입력하세요."} />
        </div>
    );
};

export default Login;