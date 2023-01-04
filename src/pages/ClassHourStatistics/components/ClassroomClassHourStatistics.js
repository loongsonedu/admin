import { ProTable } from '@ant-design/pro-components';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'index',
    align: 'center',
    width: 80,
  },
  {
    title: '出勤次数',
    dataIndex: 'index',
    align: 'center',
    width: 80,
  },
  {
    title: '上课时长',
    dataIndex: 'index',
    align: 'center',
    width: 80,
  },
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: 80,
  },
];

export default () => {
  return <ProTable search={false} columns={columns} />;
};
