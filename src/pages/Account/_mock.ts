import { Request, Response } from 'express';

export interface AccountInfoType {
  id: string;
  name: string;
  signature: string;
  avatar: string;
  islandName: string;
  hemisphere: string;
  fruit: string;
  address: string;
  startTime: string;
  sw: string;
  islandImg: string;
  sex: string;
}

function accountInfo(req: Request, res: Response) {
  const account:AccountInfoType = {
    id: 'account-1',
    name: '桃屁屁',
    signature: '桃屁屁是只小短腿',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    islandName: '桃屁屁度假岛',
    hemisphere: '北半球',
    fruit: '桃子',
    address: ['江苏','苏州'],
    startTime: '2020-03-22',
    sw: '123345456567',
    islandImg: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    sex: 'man',
  }

  return res.json(account);
}

function updateInfo(req: Request, res: Response) {
  const random = Math.round(Math.random(0,1));
  const msg = {success:[true,false][random]};
  return res.json(msg);
}

export default {
  'GET  /api/get_account_info': accountInfo,
  'POST  /api/update_account_info': updateInfo,
};
