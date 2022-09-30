let CONSULTAS_BACKEND_URL
if (process.env.VUE_APP_BACKEND_URL)
  CONSULTAS_BACKEND_URL = `${location.protocol}//${process.env.VUE_APP_BACKEND_URL}`
    if(process.env.VUE_APP_CONSULTAS_SUBPATH)
      CONSULTAS_BACKEND_URL += `/${process.env.VUE_APP_CONSULTAS_SUBPATH}`
else
  CONSULTAS_BACKEND_URL = 'http://localhost:5000/api'


export default {
  CONSULTAS_BACKEND_URL: CONSULTAS_BACKEND_URL,
  CONSULTAS_SUBPATH: process.env.VUE_APP_CONSULTAS_SUBPATH,
  AUTH_URL: '/login'
}
