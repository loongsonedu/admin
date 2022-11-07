import { addListIndex } from '@/utils';
import { request } from '@umijs/max';
import dayjs from 'dayjs';

export async function fetchCourseList(params) {
  return request(
    '/seller/api/coursesget/getAllCoursesByConditionsWithTotal?clientId=466',
    {
      params: {
        ...params,
        isDelete: 1,
      },
    },
  ).then((res) => ({
    data: addListIndex(res.courseList, params),
    total: res.totalNum,
    success: true,
  }));
}

export async function fetchMemberList(params) {
  return request(
    '/seller/api/students/getAllStudentsByConditionsWithTotal?clientId=466',
    { params },
  ).then((res) => ({
    data: addListIndex(res.studentList, params),
    total: res.totalNum,
    success: true,
  }));
}

export async function addMember(data) {
  return request('/seller/api/students', {
    method: 'post',
    data,
  });
}

export async function updateMember(data) {
  return request('/seller/api/students/update', {
    method: 'post',
    data,
  });
}

export async function fetchMemberInfo(id) {
  return request(`/seller/api/students/${id}`);
}

export async function deleteMember(id) {
  return request(`/seller/api/students/${id}`, { method: 'delete' });
}

const statusFilterMap = {
  ended: (rec) =>
    rec.type === 2 && rec.endAt && dayjs(rec.startAt).isBefore(dayjs()),
  notStarted: (rec) => rec.type === 2 && dayjs().isBefore(rec.startAt),
  ongoing: (rec) =>
    rec.type === 2 && !rec.endAt && dayjs(rec.startAt).isBefore(dayjs()),
  video: (rec) => rec.type === 1,
};

const statusFilter = (status, record) => {
  return status.find((item) => statusFilterMap[item](record));
};

export async function fetchClassroomList({ classroomStatus = [], ...params }) {
  return request(
    '/seller/api/course-classes?page=0&size=1000&clientId.equals=466&sort=startAt,desc&hasHomework=1',
    { params },
  ).then((res) => {
    const data = res.filter((item) => statusFilter(classroomStatus, item));
    return {
      data: addListIndex(data, params),
      success: true,
    };
  });
}

export async function updateClassroomStatus(data) {
  return request('/seller/api/course-classes/update', { method: 'post', data });
}

export async function deleteClassroom(id) {
  return request(`/seller/api/course-classes/delete/${id}`);
}

export async function createCourse(data) {
  return request('/seller/api/courses', {
    method: 'post',
    data: {
      teacher: '',
      clientId: '466',
      client: {},
      isDelete: 1,
      ...data,
    },
  });
}

export async function updateCourse(data) {
  return request('/seller/api/courses/update', {
    method: 'post',
    data,
  });
}

export async function fetchAllCourse() {
  return request(
    '/seller/api/coursesget/getAllCoursesByConditionsWithTotal?clientId=466',
  ).then((res) => res.totalNum);
}

export async function fetchCourseInfo(id) {
  return request(`/seller/api/courses/${id}`).then(({ coverUrl, ...res }) => ({
    coverUrl: [{ url: coverUrl }],
    ...res,
  }));
}

export async function fetchClassroomInfo(id) {
  return request(`/seller/api/course-classes/${id}`);
}

export async function createClassroom(data) {
  return request('/seller/api/course-classes', {
    method: 'post',
    data: { clientId: '466', ...data },
  });
}

export async function updateClassroom(data) {
  return request('/seller/api/course-classes/update', {
    method: 'post',
    data,
  });
}
