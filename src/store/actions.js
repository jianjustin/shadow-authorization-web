// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'
import Qs from 'qs'

function login ({ commit }, userData) {
  return new Promise((resolve, reject) => {
    commit('auth_request');
    var params = {
      'username': userData.username,
      'password': userData.password
    }
    axios({
      method: 'POST',
      url: '/login', 
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: Qs.stringify(params)
    }).then(response => {
        const token = response.data;
        
        if(token.indexOf('Bearer')> -1){
          localStorage.setItem('token', token);
          localStorage.setItem('user', userData.username);
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', { token, userData })
          resolve(response)
        }else{
          commit('auth_error')
          reject("login error")
        }
      }).catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject("login error")
      })
  })
}

function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
}

function refreshtoken ({ commit }) {
  axios.get('/refresh')
    .then(response => {
      const token = response.data.access_token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      commit('auth_success', { token })
    })
    .catch(error => {
      console.log('refresh token error')
      commit('logout')
      localStorage.removeItem('token')
      console.log(error)
    })
}


export default {login, logout, refreshtoken};
