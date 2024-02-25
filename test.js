import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', // 设置 baseURL
});

// 打印 baseURL
console.log('Axios baseURL:', service.defaults.baseURL);
    ``
// 使用封装的 axios 实例发起 GET 请求
service.get('posts/1')
  .then(response => {
    console.log('Response data:', response.data); // 打印响应数据
  })
  .catch(error => {
    console.error('Request failed:', error); // 打印错误信息
  });
