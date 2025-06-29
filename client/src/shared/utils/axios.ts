import axiosBase from 'axios';

import { origin } from './constants';

const axios = axiosBase.create({
    baseURL: `${origin}/api`,

    timeout: 4000,
});

export default axios;
