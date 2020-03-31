import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8081/auth/register';
const USER_API_LOGIN_URL = 'http://localhost:8081/auth/login';
const USER_API_SUM_URL = 'http://localhost:8081/api/sum';


const
  headers= {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  }

class ApiService {

   

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user,{timeout:2000});
    }
    loginUser(user) {
        return axios.post(""+USER_API_LOGIN_URL, user,{timeout:2000});
    }

    getSum(value) {
        //return axios.post(""+USER_API_SUM_URL, value,{timeout:2000});
        return axios({
  'method': 'post',
  'url': USER_API_SUM_URL,
  'headers': headers, 
  'data': value
});
    }
    

}

export default new ApiService();