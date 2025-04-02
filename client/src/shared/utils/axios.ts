import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}/${process.env.CONTAINER_NAME}/api`,
    timeout: 4000,
});

export default axios;
