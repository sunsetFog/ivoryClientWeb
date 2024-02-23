//  获取渠道来源
import dayjs from 'dayjs';

// 设置agent_code
export function setAgentCode(value: any) {
    if (!value) return;
    return localStorage.setItem(
        'agent_code',
        JSON.stringify({
            time: dayjs(),
            agent_code: value
        })
    );
}

// 获取agent_code
export function getAgentCode() {
    const code = localStorage.getItem('agent_code');
    const {time, agent_code} = JSON.parse(code || '{}');
    if (!agent_code) {
        return '';
    }
    if (dayjs(time).add(12, 'hours').isBefore(dayjs())) {
        removeAgentCode();
        return '';
    }
    return agent_code;
}

// 移除agent_code
export function removeAgentCode() {
    return localStorage.removeItem('agent_code');
}
