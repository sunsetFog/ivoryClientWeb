/*
    用于跳转
    这里方式1，不是全局的
    方式2: react-router-dom版本6 全局注入history

    使用：
    import history from '@/utils/history';
    history.push(value.key);
    问题：
    react-router-dom版本6中，跳转不重新渲染，没用这个跳
*/
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

export default history;
