import { addListIndex } from '@/utils';
import { request } from '@umijs/max';

export async function fetchTeacherList(params) {
  return request(
    '/seller/api/teachers/getAllTeachersByConditionsWithTotal?clientId=466',
    { params },
  ).then((res) => ({
    data: addListIndex(res.teacherList),
    total: res.totalNum,
  }));
}

export async function fetchHomePageConf() {
  return request('/seller/api/homepages?clientId.equals=466').then(([res]) => ({
    ...res,
    aboutUsImgUrl: [{ url: res.aboutUsImgUrl }],
    consultUrl: [{ url: res.consultUrl }],
    coverUrl: [{ url: res.coverUrl }],
  }));
}

export async function updateHomePageConf(data) {
  return request('/seller/api/homepages/update', {
    method: 'post',
    data,
  });
}

export async function fetchTeacherInfo(id) {
  return request(`/seller/api/teachers/${id}`).then((res) => ({
    ...res,
    avatarUrl: [{ url: res.avatarUrl }],
  }));
}

export async function updateTeacherInfo(data) {
  return request('/seller/api/teachers/update', {
    method: 'post',
    data,
  });
}

export async function addTeacherInfo(data) {
  return request('/seller/api/teachers', {
    method: 'post',
    data,
  });
}

export async function deleteTeacherInfo(id) {
  return request(`/seller/api/teachers/${id}`, {
    method: 'delete',
  });
}
