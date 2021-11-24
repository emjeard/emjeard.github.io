import fetch from 'auth/FetchInterceptor'

const exampleService = {}

exampleService.getPost = function (params) {
  return fetch({
    url: '/posts/1',
    method: 'get',
    params
  })
}

exampleService.setPost = function (data) {
  return fetch({
    url: '/admin/user/login',
    method: 'post',
    data: data
  })
}

export default exampleService