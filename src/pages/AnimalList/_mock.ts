import { Request, Response } from 'express';

export interface AnimalDataType {
  id: string;
  name: string;
  enName: string;
  birthday: string;
  type: string;
  character: string;
  mantra: string;
  motto: string;
  hobby: string;
  cd: string;
  color: string;
  clothes: string;
  image: string;
}

const name = [ '阿邦','阿笨','阿富','阿猪' ];
const enName = [ 'Tom','Walker','Bones','Hugh' ];
const sex = ['man','man','woman','woman']
const birthday = [ '12月10日','6月10日','8月4日','12月30日' ];
const type = [ 'cat','dog','dog','pig' ];
const character = [ '暴躁','悠闲','悠闲','悠闲' ]
const mantra = [ '切','咆','对吧','懒懒' ]
const motto = [
  '必杀技是猫猫拳',
  '不动如山',
  '愚者只看结果，智者究其原因',
  '睡得香甜，工作辛苦'
]
const hobby = [ '读书,逛博物馆','火影跑','火影跑','火影跑' ]
const cd = [ 'K.K.摇滚','前天','K.K.练习曲','我的归所' ]
const color = [ '黑色,灰色','橘色,红色','米色,棕色','米色,黄色' ]
const clothes = [ '酷感,简约','简约','简约,可爱','简约,活力' ]

const images = [
  'http://img1.ali213.net/glpic/upload/20200402/DA5EF2DF.jpg',
  'http://img1.ali213.net/glpic/upload/20200402/5CB7F942.jpg',
  'http://img1.ali213.net/glpic/upload/20200402/CEBA73CB.jpg',
  'http://img1.ali213.net/glpic/upload/20200402/776C9402.jpg',
];

function animalList(req: Request, res: Response) {
  const params = req.query;
  const list = [];

  for(let i = 0; i < 10; i++){
    const curSex = sex[i % 4];
    const curBirthday = birthday[i % 4];
    const curType = type[i % 4];
    const curCharacter = character[i % 4];

    let ifPush = true;
    if (params.sex){
      ifPush = ifPush && params.sex === curSex;
    }
    if(params.birthday) {
      ifPush = ifPush && curBirthday.startsWith(params.birthday);
    }
    if(params.character){
      ifPush = ifPush && params.character === curCharacter;
    }
    if(params.type){
      ifPush = ifPush && (params.type.includes(curType) || params.type === curType)
    }

    if(ifPush){
      list.push({
        id: `fake-list-${i}`,
        name: name[i % 4],
        enName: enName[i % 4],
        sex: curSex,
        birthday: curBirthday,
        type: curType,
        character: curCharacter,
        mantra: mantra[i % 4],
        motto: motto[i % 4],
        hobby: hobby[i % 4],
        cd: cd[i % 4],
        color: color[i % 4],
        clothes: clothes[i % 4],
        image: images[i %  4],
      });
    }
  }

  return res.json(list);
}

export default {
  'GET  /api/animal_list': animalList,
};
