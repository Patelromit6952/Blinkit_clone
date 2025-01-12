import axios from 'axios';
import SummaryApi, { baseurl } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL:baseurl,
    withCredentials:true
})
// sending accesstoken in the header
Axios.interceptors.request.use(
    async(config)=>{
        const accesstoken = localStorage.getItem('accesstoken')
        if(accesstoken){
            config.headers.Authorization = `Bearer ${accesstoken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//extend the life span of access token with the help refresh

Axios.interceptors.request.use(
    (res)=>{
        return res
    },
    async (error)=>{
        let origianlrequest = error.config
        if(error.res.status === 401 && !origianlrequest.retry){
            origianlrequest=true;
            const refreshtoken = localStorage.getItem('refreshtoken')
            if(refreshtoken){
                const newaccesstoken = await refreshaccesstoken(refreshtoken)
                if(newaccesstoken){
                    origianlrequest.headers.Authorization = `Bearer ${newaccesstoken}
                    `
                    return Axios(origianlrequest)
                }
            }
        }
        return Promise.reject(error)
    }
)
const refreshaccesstoken = async (refreshtoken) =>{
    try {
        const response = await Axios({
            ...SummaryApi.refreshtoken,
              headers:{
                Authorization:`Bearer ${refreshtoken}`
              }
        })
        const accesstoken = res.data.data.accesstoken;
        localStorage.setItem('accesstoken',accesstoken)
        return accesstoken
    } catch (error) {
        
    }
}
export default Axios;