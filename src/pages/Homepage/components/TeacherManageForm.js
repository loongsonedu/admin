import {
  addTeacherInfo,
  fetchTeacherInfo,
  updateTeacherInfo,
} from '@/services/homepage';
import { fileUpload, requiredRule } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Form, message } from 'antd';
import { isUndefined } from 'lodash';
import { useEffect } from 'react';

export default ({ id, handleClose, tableReload, ...props }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isUndefined(id) || !props.visible) return;
    fetchTeacherInfo(id).then(form.setFieldsValue);
  }, [id, props.visible]);
  const handleSubmit = async (values) => {
    const tmp = {
      tag: 'star',
      clientId: '466',
      ...values,
      avatarUrl: values.avatarUrl[0].url,
    };
    return (isUndefined(id) ? addTeacherInfo : updateTeacherInfo)(tmp).then(
      () => {
        message.success('保存成功');
        handleClose();
        tableReload();
      },
    );
  };
  const handleImgUpload = (file) => {
    fileUpload(file).then((res) => {
      form.setFieldsValue({
        avatarUrl: [
          Object.assign(file, {
            url: `https://ssl.cdn.maodouketang.com/${res.key}`,
          }),
        ],
      });
    });
  };
  return (
    <DrawerForm
      {...props}
      form={form}
      drawerProps={{
        maskClosable: false,
        onClose: handleClose,
        destroyOnClose: true,
      }}
      title={isUndefined(id) ? '添加教师' : '编辑教师'}
      grid
      width="35%"
      layout="horizontal"
      onFinish={handleSubmit}
    >
      <ProFormText
        name="name"
        label="姓名"
        labelCol={{ span: 4 }}
        required
        placeholder="请输入"
        rules={requiredRule}
      />
      <ProFormTextArea
        name="info"
        label="教师介绍"
        required
        placeholder="请输入"
        labelCol={{ span: 4 }}
        fieldProps={{ maxLength: 110, showCount: true }}
        rules={requiredRule}
      />
      <ProFormDigit
        name="coursesCount"
        label="课程数"
        required
        labelCol={{ span: 4 }}
        placeholder="请输入"
        rules={requiredRule}
      />
      <ProFormDigit
        name="studentsCount"
        label="学生数"
        required
        labelCol={{ span: 4 }}
        placeholder="请输入"
        rules={requiredRule}
      />
      <ProFormUploadButton
        name="avatarUrl"
        label="教师头像"
        max={1}
        required
        labelCol={{ span: 4 }}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        rules={requiredRule}
        action={handleImgUpload}
        extra="建议图片比例为1:1"
      />
      <Form.Item name="id" noStyle />
    </DrawerForm>
  );
};
