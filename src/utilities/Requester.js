import axios from 'axios';

export default axios.create({
    baseURL : "https://e7gzly.herokuapp.com",
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      }
})