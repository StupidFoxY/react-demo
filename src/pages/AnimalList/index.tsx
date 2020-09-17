import { PageContainer } from '@ant-design/pro-layout';
import React, { Component, useState, useEffect } from 'react';
import { Card, Col, Form, List, Row, Select, Typography, Modal, Descriptions } from 'antd';
import styles from './index.less';

import StandardFormRow from './StandardFormRow';
import TagSelect from './TagSelect';
import { getAnimalList } from '@/services/animal';
import {
  HeartOutlined,
  HomeOutlined,
  EllipsisOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [animal, setAnimal] = useState<any>({});
  useEffect(() => {
    getAnimalList().then((res) => {
      setLoading(false);
      setList(res)
    });
  }, []);

  const animalTypes = {
    cat:'猫',
    dog:'狗',
    pig:'猪',
  }

  const month = [
    {value:'1月',label:'一月'},
    {value:'2月',label:'二月'},
    {value:'3月',label:'三月'},
    {value:'4月',label:'四月'},
    {value:'5月',label:'五月'},
    {value:'6月',label:'六月'},
    {value:'7月',label:'七月'},
    {value:'8月',label:'八月'},
    {value:'9月',label:'九月'},
    {value:'10月',label:'十月'},
    {value:'11月',label:'十一月'},
    {value:'12月',label:'十二月'},
  ];

  const cardList = (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        column: 5
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.name} src={item.image} />}
            actions={[
              <HeartOutlined key="heart" />,
              <HomeOutlined key="home" />,
              <EllipsisOutlined key="more" onClick={() => onMore(item)}/>,
            ]}
          >
            <Card.Meta
              title={
                <div>
                  <span className={styles.cardName}>{item.name}</span>
                  <span>
                    {item.sex === 'man' ? <ManOutlined style={{color:'#40a9ff'}}/> : <WomanOutlined style={{color:'#eb2f96'}}/>}
                  </span>
                </div>
              }
              description={
                <div>
                  <span>{item.birthday}</span>
                  <div>
                    <span className={styles.cardCharacter}>{item.character}</span>
                    <span>{animalTypes[item.type]}</span>
                  </div>
                </div>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const onMore = (item) => {
    setVisible(true);
    setAnimal(item);
  }

  const handleCancel = () => setVisible(false);

  const dialog = (
    <Modal
      visible={visible}
      title="Title"
      onCancel={handleCancel}
    >

      <Descriptions
        bordered={true}
        title={<img alt={animal.name} src={animal.image} />}
        size={"middle"}
        column={2}
        >
        <Descriptions.Item
          label={
            <div>
              <span className={styles.desName}>{animal.name}</span>
              <span>
                {animal.sex === 'man' ? <ManOutlined style={{color:'#40a9ff'}}/> : <WomanOutlined style={{color:'#eb2f96'}}/>}
              </span>
            </div>
          }
          span={2}
        >{animal.enName}(英)</Descriptions.Item>
        <Descriptions.Item label="生日">{animal.birthday}</Descriptions.Item>
        <Descriptions.Item label="种族">{animalTypes[animal.type]}</Descriptions.Item>
        <Descriptions.Item label="性格">{animal.character}</Descriptions.Item>
        <Descriptions.Item label="口头禅">{animal.mantra}</Descriptions.Item>
        <Descriptions.Item label="座右铭" span={2}>{animal.motto}</Descriptions.Item>
        <Descriptions.Item label="爱好" span={2}>{animal.hobby}</Descriptions.Item>
        <Descriptions.Item label="喜欢的唱片" span={2}>{animal.cd}</Descriptions.Item>
        <Descriptions.Item label="喜欢的颜色" span={2}>{animal.color}</Descriptions.Item>
        <Descriptions.Item label="喜欢的服饰" span={2}>{animal.clothes}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const selectStyle = {
    maxWidth: 200,
    minWidth: 70,
    width: '100%'
  }

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          onValuesChange={(e) => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            setLoading(true);
            getAnimalList(form.getFieldsValue()).then((res) => {
              setLoading(false);
              setList(res)
            });
          }}
        >
          <StandardFormRow title="种类" block style={{ paddingBottom: 11 }}>
            <Form.Item name="type">
              <TagSelect expandable>
                {
                  Object.keys(animalTypes).map(key => (
                    <TagSelect.Option value={key} key={key}>{animalTypes[key]}</TagSelect.Option>
                  ))
                }
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} label="性别" name="sex">
                  <Select placeholder="不限" style={selectStyle} allowClear>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} label="性格" name="character">
                  <Select placeholder="不限" style={selectStyle} allowClear>
                    <Option value="暴躁">暴躁</Option>
                    <Option value="悠闲">悠闲</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} label="生日" name="birthday">
                  <Select placeholder="不限" style={selectStyle} allowClear>
                    {
                      month.map(mon => (
                        <Option value={mon.value} key={mon.value}>{mon.label}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      {dialog}
    </div>
  );
};
