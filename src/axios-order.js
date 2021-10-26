import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-by-burger-d4958-default-rtdb.firebaseio.com/'
})

export default instance;