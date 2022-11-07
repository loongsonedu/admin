import { addMember, fetchMemberInfo, updateMember } from '@/services/course';
import { requiredRule } from '@/utils';
import {
  DrawerForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useParams, useRequest, useSearchParams } from '@umijs/max';
import { Form, message } from 'antd';
import { isUndefined } from 'lodash';
import { useEffect } from 'react';

export const roles = [
  {
    value: '1',
    label: '学生',
  },
  {
    value: '2',
    label: '教师',
  },
  {
    value: '4',
    label: '助教',
  },
  {
    value: '5',
    label: '管理员',
  },
];

const grade = [
  {
    value: '学前',
    label: '学前',
  },
  {
    value: '1-3年级',
    label: '1-3年级',
  },
  {
    value: '4年级',
    label: '4年级',
  },
  {
    value: '5年级',
    label: '5年级',
  },
  {
    value: '6年级',
    label: '6年级',
  },
  {
    value: '7年级',
    label: '7年级',
  },
  {
    value: '8年级',
    label: '8年级',
  },
  {
    value: '9年级',
    label: '9年级',
  },
  {
    value: '其他',
    label: '其他',
  },
];

export const tags = [
  {
    value: '未订阅通知',
    label: '不订阅通知',
  },
  {
    value: '已订阅短信通知',
    label: '订阅短信通知',
  },
  {
    value: '已订阅电话通知',
    label: '订阅电话通知',
  },
  {
    value: '已订阅全部通知',
    label: '订阅全部通知',
  },
];

export default ({ id, handleClose, tableReload, ...props }) => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const { run } = useRequest(fetchMemberInfo, { manual: true });

  const handleSubmit = async (values) => {
    return (isUndefined(id) ? addMember : updateMember)({
      ...values,
      verify: values.verify ? '1' : '0',
    }).then(() => {
      message.success('保存成功');
      tableReload();
      handleClose();
    });
  };

  useEffect(() => {
    if (isUndefined(id) || !props.visible) return;
    run(id).then(form.setFieldsValue);
  }, [id, props.visible]);

  return (
    <DrawerForm
      {...props}
      form={form}
      drawerProps={{
        maskClosable: false,
        onClose: handleClose,
        destroyOnClose: true,
      }}
      title={isUndefined(id) ? '添加成员' : '编辑成员'}
      grid
      onFinish={handleSubmit}
      initialValues={{
        courseId,
        uniCourseId: searchParams.get('uniCourseId'),
        clientId: '466',
      }}
    >
      <ProFormText
        name="name"
        label="昵称"
        colProps={{ md: 24, xl: 12 }}
        required
        placeholder="请输入"
        rules={requiredRule}
      />
      <ProFormText
        name="phone"
        label="手机号"
        colProps={{ md: 24, xl: 12 }}
        required
        placeholder="请输入"
        rules={requiredRule}
      />
      <ProFormSelect
        name="status"
        label="角色"
        colProps={{ md: 24, xl: 12 }}
        required
        placeholder="请输入"
        rules={requiredRule}
        options={roles}
      />
      <ProFormRadio.Group
        name="gender"
        label="性别"
        colProps={{ md: 24, xl: 12 }}
        options={[
          {
            label: '男',
            value: 'male',
          },
          {
            label: '女',
            value: 'female',
          },
        ]}
      />
      <ProFormSelect
        label="年级"
        name="age"
        colProps={{ md: 24, xl: 12 }}
        placeholder="请选择"
        options={grade}
      />
      <ProFormSwitch
        name="verify"
        label="是否允许进入课堂"
        checkedChildren="允许"
        unCheckedChildren="不允许"
        colProps={{ md: 24, xl: 12 }}
      />
      <ProFormSelect
        label="备注"
        name="tag"
        colProps={{ md: 24, xl: 12 }}
        placeholder="请选择"
        options={tags}
      />
      <Form.Item name="uniCourseId" noStyle />
      <Form.Item name="courseId" noStyle />
      <Form.Item name="clientId" noStyle />
      <Form.Item name="id" noStyle />
    </DrawerForm>
  );
};
