import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: `${window.location.origin}/api`,
    timeout: 4000,
});

export default axios;
