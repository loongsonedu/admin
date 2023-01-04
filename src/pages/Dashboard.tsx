import { fetchConsumptionDuration } from '@/services/dashboard';
import { secondsParse } from '@/utils';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Col, Row, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import React from 'react';

const packChartData = (rawData: any) => {
  const list = (rawData?.daySummaryList || []).reverse();

  return {
    tooltip: {
      formatter: ``,
    },
    xAxis: {
      type: 'category',
      data: list.map((item: any) => item.sumDay),
    },
    yAxis: {
      type: 'value',
      interval: 18000,
      axisLabel: {
        formatter: secondsParse,
      },
    },
    series: [
      {
        data: list.map((item: any) => item.timeLong),
        type: 'line',
        smooth: true,
      },
    ],
  };
};

const Dashboard: React.FC = () => {
  const durationData = [
    { title: '购买总时长', value: '已购套餐包：3个', desc: '已购套餐包：3个' },
    { title: '消费总时长', value: '759小时48分', desc: '日平均量：15小时30分' },
    { title: '剩余时长', value: '500小时13分', desc: '已购套餐包：3个' },
  ];
  const { data, loading } = useRequest(fetchConsumptionDuration);

  const columns: ProColumns<any>[] = [
    {
      title: '日期',
      dataIndex: 'sumDay',
    },
    {
      title: '上课教室总数',
      dataIndex: 'roomNum',
    },
    {
      title: '学生总人数',
      dataIndex: 'studentNum',
    },
    {
      title: '教师总人数',
      dataIndex: 'teacherNum',
    },
    {
      title: '消耗总时长',
      dataIndex: 'timeLong',
    },
  ].map((item) => ({ ...item, align: 'center' }));
  return (
    <>
      <PageContainer>
        <ProCard direction="row" ghost gutter={[8, 8]}>
          {durationData.map((item) => (
            <ProCard
              key={item.title}
              colSpan={4}
              title={<Statistic title={item.title} value={item.value} />}
            >
              <Row style={{ color: '#409eff' }} justify="space-between">
                <Col>{item.desc}</Col>
                <Col style={{ cursor: 'pointer' }}>查看详情</Col>
              </Row>
            </ProCard>
          ))}
        </ProCard>
      </PageContainer>
      <PageContainer title="近15天消费时长: 208小时48分" loading={loading}>
        <ProCard direction="row" ghost gutter={[8, 8]}>
          <ProCard colSpan={14}>
            <ReactECharts
              option={packChartData(data)}
              style={{ height: '447px', width: '100%' }}
            />
          </ProCard>
          <ProCard colSpan={10}>
            <ProTable
              rowKey="id"
              pagination={false}
              toolBarRender={false}
              dataSource={data?.daySummaryList}
              search={false}
              columns={columns}
              scroll={{ y: 400 }}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Dashboard;
