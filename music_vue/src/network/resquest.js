import axios from 'axios'
import Vue from 'vue'

let userId = 599
const data = axios.create({
    baseURL:'http://localhost:8081',
})

data({
    url:'/LookListSong'+'/'+userId,
}).then(res => {
    console.log(res)
})
.catch(err => {
    console.log('错误'+err);
})