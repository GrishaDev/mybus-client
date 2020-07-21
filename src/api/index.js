import axios from 'axios';
import config from 'config';
import shortid from "shortid";
import wait from 'utils/wait';

// httpsAgent: new https.Agent({  
//     rejectUnauthorized: false
//   }),

const request = axios.create({
    baseURL: config.serverUrl,
    headers: {auth: localStorage.token}
});

const mockSchedules = [
    {id: '3294a', mail: "blabla@bla.com", rule: {hour: 5, minute: 5}},
    {id: '3294b', mail: "blablaaa@bla.com", rule: {hour: 15, minute: 22}}
]

const create = {id: '223', mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}};
const update = {id: '3294a', mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}};

const loginApi = async (data) => {
    if(config.isMock) { await wait(250); return '392A8349ABs9359SA' };
    const res = await request.post('login', data).catch(err => { throw new Error(err) });
    return res;
}

const getSchedulesApi = async (mail) => {
    if(config.isMock) { await wait(250); return mockSchedules; }
    const res = await request.get(`schedules/mail/${mail}`).catch(err => { throw new Error(err) });
    return res;
}

const createScheduleApi = async (data) => {
    if(config.isMock) { await wait(250); return {id: shortid.generate(), mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}}; }
    const res = await request.post(`schedule`, data).catch(err => { throw new Error(err) });
    return res;
}

const updateScheduleApi = async (id, data) => {
    if(config.isMock) { await wait(250); return update; }
    const res = await request.put(`schedule/${id}`, data).catch(err => { throw new Error(err) });
    return res;
}

const deleteScheduleApi = async (id) => {
    if(config.isMock) { await wait(250); return true; }
    const res = await request.delete(`schedule/${id}`).catch(err => { throw new Error(err) });
    return res;
}

export { loginApi, getSchedulesApi, createScheduleApi, updateScheduleApi, deleteScheduleApi };