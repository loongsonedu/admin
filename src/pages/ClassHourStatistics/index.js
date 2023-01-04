import { PageContainer } from '@ant-design/pro-components';
import ClassroomClassHourStatistics from './components/ClassroomClassHourStatistics';
import ComprehensiveStatistics from './components/ComprehensiveStatistics';
import StudentClassHourStatistics from './components/StudentClassHourStatistics';
import TeacherClassHourStatistics from './components/TeacherClassHourStatistics';

export default () => {
  return (
    <PageContainer
      tabList={[
        {
          tab: '综合数据统计',
          key: 'ComprehensiveStatistics',
          children: <ComprehensiveStatistics />,
        },
        {
          tab: '教室课时统计',
          key: 'ClassroomClassHourStatistics',
          children: <ClassroomClassHourStatistics />,
        },
        {
          tab: '教师课时统计',
          key: 'TeacherClassHourStatistics',
          children: <TeacherClassHourStatistics />,
        },
        {
          tab: '学生课时统计',
          key: 'StudentClassHourStatistics',
          children: <StudentClassHourStatistics />,
        },
      ]}
    />
  );
};
