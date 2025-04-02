import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}/${process.env.WEB_CONTAINER_NAME_PORT}/api`,
    timeout: 4000,
});

export default axios;
