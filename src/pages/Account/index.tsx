import { PageContainer, GridContent } from '@ant-design/pro-layout';
import React, { Component, useState, useEffect } from 'react';
import { Avatar, Card, Col, Divider, Input, Row, Modal, Form, Radio, Select, Cascader, DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

import { getAccountInfo, updateAccountInfo } from '@/services/account';
import {
  AntCloudOutlined,
  GlobalOutlined,
  AppleOutlined,
  HomeOutlined,
  FieldTimeOutlined,
  FormOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [tabKey, setTabKey] = useState<string>('lib');
  useEffect(() => {
    getAccountInfo().then((res) => {
      setLoading(false);
      setUserInfo(res);
    });
  }, []);


  const operationTabList = [
    {
      key: 'lib',
      tab: ( <span>图鉴档案</span> ),
    },
    {
      key: 'villagers',
      tab: ( <span>入住村民</span> ),
    },
    {
      key: 'line',
      tab: ( <span>排队</span> ),
    },
  ];

  const onTabChange = (key: string)=>{
    setTabKey(key);
  }

  const renderChildrenByTabKey = (tabKey: string) => {
    if (tabKey === 'lib') {
      console.log('lib');
      // return <Projects />;
    }
    if (tabKey === 'villagers') {
      console.log('villagers');
      // return <Applications />;
    }
    if (tabKey === 'line') {
      console.log('line');
      // return <Articles />;
    }
    return null;
  };

  const onEdit = () => {
    setEditing(true);
  }

  const formatDate = (d) => {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-')
  }

  const handleOk = () => {
    setEditing(false);

    let formValue = form.getFieldsValue();
    const date = formatDate(formValue.startTime._d)
    formValue.startTime = date;

    updateAccountInfo(formValue).then((res)=>{
      if(res.success){
        formValue.id = userInfo.id,
        formValue.avatar = userInfo.avatar,
        formValue.islandImg = userInfo.islandImg,
        setUserInfo(formValue);
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  const handleCancel = () => {
    setEditing(false);
  }

  const disabledDate = (current) => {
    return current < moment(new Date('2020-03-20'))
  }

  const editDialg = (
    <Modal
      title="更新用户信息"
      visible={editing}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        initialValues={{
          name: userInfo.name,
          sex: userInfo.sex,
          address: userInfo.address,
          sw: userInfo.sw,
          islandName: userInfo.islandName,
          hemisphere: userInfo.hemisphere,
          fruit: userInfo.fruit,
          startTime: moment(new Date(userInfo.startTime)),
          signature: userInfo.signature
        }}
      >
        <Form.Item label="昵称" name="name" rules={[{ required: true, message: '昵称不能为空!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value="man">男</Radio>
            <Radio value="woman">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="所在地" name="address">
        <Cascader
        options={[
          {
            value: '江苏',
            label: '江苏',
            children: [
              {
                value: '苏州',
                label: '苏州',
              },
              {
                value: '扬州',
                label: '扬州',
              },
            ],
          },
          {
            value: '浙江',
            label: '浙江',
            children: [
              {
                value: '杭州',
                label: '杭州',
              },
            ],
          },
        ]}
        />
        </Form.Item>
        <Form.Item label="好友编号" name="sw">
          <Input prefix={"SW-"} placeholder="无需写入“-”"/>
        </Form.Item>
        <Divider style={{ marginTop: 16 }} dashed />
        <Form.Item label="岛名" name="islandName">
          <Input/>
        </Form.Item>
        <Form.Item label="所属半球" name="hemisphere">
          <Radio.Group>
            <Radio.Button value="北半球">北半球</Radio.Button>
            <Radio.Button value="南半球">南半球</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="特产水果" name="fruit">
          <Select>
            <Select.Option value="苹果">苹果</Select.Option>
            <Select.Option value="梨">梨</Select.Option>
            <Select.Option value="桃子">桃子</Select.Option>
            <Select.Option value="橘子">橘子</Select.Option>
            <Select.Option value="樱桃">樱桃</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="上岛时间" name="startTime">
          <DatePicker disabledDate={disabledDate}/>
        </Form.Item>
        <Divider style={{ marginTop: 16 }} dashed />
        <Form.Item label="个性签名" name="signature">
          <Input.TextArea maxLength="30"/>
        </Form.Item>
      </Form>
    </Modal>
  )

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={6} md={24} className={styles.userInfo}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={userInfo.avatar} />
                  <div className={styles.name}>
                    {userInfo.name}
                    {userInfo.sex === 'man' ?
                      <ManOutlined style={{color:'#40a9ff',marginLeft:"5px"}}/> :
                      <WomanOutlined style={{color:'#eb2f96',marginLeft:"5px"}}/>}
                  </div>
                  <div>{userInfo.signature}<FormOutlined className={styles.edit} onClick={onEdit}/></div>
                </div>
                { userInfo.sw ? <p className={styles.sw}>SW - {userInfo.sw.slice(0,4)} - {userInfo.sw.slice(4,8)}  - {userInfo.sw.slice(8,12)}</p> : null }
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.detail}>
                  <p>
                    <AntCloudOutlined />
                    <span>{userInfo.islandName}</span>
                  </p>
                  <p>
                    <GlobalOutlined />
                    <span>{userInfo.hemisphere}</span>
                  </p>
                  <p>
                    <AppleOutlined />
                    <span>{userInfo.fruit}</span>
                  </p>
                  <p>
                    <HomeOutlined />
                    <span>{userInfo.address}</span>
                  </p>
                  <p>
                    <FieldTimeOutlined />
                    <span>{userInfo.startTime}</span>
                  </p>
                </div>
                <Divider style={{ marginTop: 16 }} dashed />
                <img alt="岛屿预览图" src={userInfo.islandImg} width="100%"/>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={18} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
      {editDialg}
    </GridContent>
  );
};
