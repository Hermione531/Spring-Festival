import axios from 'axios'

const hostname = window.location.origin;
export const address = {
  login: hostname + '/spring-festival/person/login',
  uploadpic: hostname + '/spring-festival/activity/image',
  completeNum: hostname + '/spring-festival/statistic/completedNum',
  getActivityPhoto: hostname + '/spring-festival/activity',
  updateImg: hostname + '/spring-festival/activity/image',
}


const HEADERS = {'content-type': 'application/json'};

export const loginSystem = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      headers: HEADERS,
      url: address.login,
      data: JSON.stringify(data),
      dataType: 'json'
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

// 员工登陆后展示的页面，展示所有已传照片
export const getActivityPhoto = (personCode) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${address.getActivityPhoto}/${personCode}`
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

export const getImgByDate = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: address.uploadpic,
      data: data
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

export const updateImg = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: address.updateImg,
      data: data
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

export const getNumByDate = (date) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/spring-festival/statistic/completedNum/${date}`
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

export const getNumByDateEnd = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: address.completeNum
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}

export const getStatistics = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: '/spring-festival/activity/export'
    }).then((json) => {
      resolve(json.data);
    }).catch(e => {
      reject(e);
    })
  })
}
