import {
  fetchCourseDateRec,
  fetchCourseList,
  fetchCourseStatisticData,
} from '@/services/classHourStatistics';
import { fetchClassroomList } from '@/services/course';
import { secondsParse } from '@/utils';
import { ProTable } from '@ant-design/pro-components';
import { DatePicker } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useRef, useState } from 'react';

let isSortAction = false;
let dataSource = [];

const onCell = ({ dataLength }, index) =>
  dataLength - 1 === index ? { colSpan: 0 } : {};

const render = (val, row, index) => {
  return row.dataLength - 1 === index ? <strong>{val}</strong> : val;
};

const packColumns = (dateRec) =>
  [
    {
      title: '角色',
      dataIndex: 'role',
      hideInTable: true,
      search: true,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '老师', value: 'teacher' },
          { label: '学生', value: 'student' },
          { label: '助教', value: 'ta' },
        ],
      },
    },
    {
      title: '教室',
      dataIndex: 'roomId',
      hideInTable: true,
      search: true,
      valueType: 'select',
      request: fetchCourseList,
    },
    {
      title: '学生数',
      dataIndex: 'minStudent',
      hideInTable: true,
      search: true,
    },
    {
      title: '当日课程时长',
      dataIndex: 'minRoomTime',
      hideInTable: true,
      search: true,
      initialValue: 15 * 60,
      valueType: 'select',
      request: async () => [
        { label: '大于15分钟', value: 15 * 60 },
        { label: '大于30分钟', value: 30 * 60 },
        { label: '大于45分钟', value: 45 * 60 },
        { label: '大于60分钟', value: 60 * 60 },
      ],
    },
    {
      title: '用户上课时长',
      dataIndex: 'minUserTime',
      hideInTable: true,
      search: true,
      valueType: 'select',
      search: {
        transform: (val) => ({ minTeacherTime: val, minStudentTime: val }),
      },
      request: async () => [
        { label: '大于15分钟', value: 15 * 60 },
        { label: '大于30分钟', value: 30 * 60 },
        { label: '大于45分钟', value: 45 * 60 },
        { label: '大于60分钟', value: 60 * 60 },
      ],
    },
    {
      title: '时间',
      dataIndex: 'timeRange',
      hideInTable: true,
      search: true,
      valueType: 'dateRange',
      colSize: 2,
      initialValue: [moment().add(-1, 'd'), moment().add(-1, 'd')],
      fieldProps: {
        allowClear: false,
      },
      search: {
        transform: ([start, end]) => ({
          startTime: start,
          endTime: end,
        }),
      },
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 80,
      onCell,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 80,
      onCell: ({ dataLength }, index) => {
        if (dataLength - 1 === index) {
          return {
            colSpan: 4,
          };
        }
      },
    },
    {
      title: '出勤次数',
      dataIndex: 'times',
      align: 'center',
      width: 80,
      defaultSortOrder: 'descend',
      sorter: {
        compare: (x, y) => x.times - y.times,
      },
      onCell,
    },
    {
      title: '上课时长',
      dataIndex: 'duration',
      align: 'center',
      width: 80,
      renderText: secondsParse,
      onCell,
    },
    ...dateRec.map((item) => ({
      title: item[0],
      dataIndex: item[0],
      width: 100,
      renderText: secondsParse,
    })),
  ].map((item) => ({
    search: false,
    ...item,
    render,
  }));

export default () => {
  const [timeRange, setTimeRange] = useState({});
  const [dateRec, setDateRec] = useState([]);
  const columns = packColumns(dateRec);
  const scrollX = columns
    .map((item) => item.width)
    .reduce((pre = 0, curr = 0) => pre + curr);

  return (
    <ProTable
      bordered
      rowKey="index"
      columns={columns}
      search={{ labelWidth: 100 }}
      request={async (params) => {
        if (isSortAction) {
          isSortAction = false;
          return dataSource;
        }
        fetchCourseDateRec(params).then((recs) =>
          setDateRec(Object.entries(recs)),
        );
        dataSource = await fetchCourseStatisticData(params);
        return dataSource;
      }}
      headerTitle={
        <span style={{ color: '#1890ff' }}>时长统计 79小时10分9秒</span>
      }
      pagination={false}
      defaultSize="small"
      scroll={{ x: `calc(${scrollX}px + 50%)` }}
      onChange={(_p, _f, sorter) => {
        if (!isEmpty(sorter)) {
          isSortAction = true;
        }
      }}
    />
  );
};
