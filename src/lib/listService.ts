import { TableListItem, TableListParams } from '../components/List/types';
import request from '../lib/request';

export async function queryRule(params?: TableListParams) {
    return request('/api/rule', {
        body: JSON.stringify(params),
    });
}

export async function removeRule(params: { key: number[] }) {
    return request('/api/rule', {
        method: 'POST',
        body: JSON.stringify({
            ...params,
            method: 'delete',
        }),
    });
}

export async function addRule(params: TableListItem) {
    return request('/api/rule', {
        method: 'POST',
        body: JSON.stringify({
            ...params,
            method: 'post',
        }),
    });
}

export async function updateRule(params: TableListParams) {
    return request('/api/rule', {
        method: 'POST',
        body: JSON.stringify({
            ...params,
            method: 'update',
        }),
    });
}
