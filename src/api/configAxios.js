import axios from 'axios';

export const baseURL = "http://127.0.0.1:8000/api";

const clientHTTP = axios.create({ baseURL });

export default clientHTTP;