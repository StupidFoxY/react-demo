import { request } from 'umi';

export async function getAccountInfo(params) {
  return request('/api/get_account_info', {
    method: 'GET',
    params: params,
  });
}

export async function updateAccountInfo(params) {
  return request('/api/update_account_info', {
    method: 'POST',
    params: params,
  });
}
