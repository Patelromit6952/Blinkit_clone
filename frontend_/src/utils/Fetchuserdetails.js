import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"
const fetchuserdetails = async  () => {
    try {
        const res = await Axios({
            ...SummaryApi.userdetails
        })
        return res;
    } catch (error) {
        return res.json({
        message:error.message || error,
        error:true,
        success:false,
        })
    }
}
export default fetchuserdetails