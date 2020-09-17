import { request } from 'umi';

export interface AnimalParamsType {
  'type': string[];
  'character': string;
  'birthday': string;
  '​sex': string;
}

export async function getAnimalList(params?:AnimalParamsType) {
  return request('/api/animal_list', {
    method: 'GET',
    params: params,
  });
}
