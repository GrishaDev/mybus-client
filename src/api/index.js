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
    {id: '3294a', name: "haha", mail: "blabla@bla.com", rule: {hour: 9, minute: 15}, bus: 126, station: 3359, paused: true},
    {id: '925bamba28', name: "arbuz23", mail: "blablaaa@bla.com", rule: {hour: 15, minute: 0}, bus: 171, station: 1000, scheduleTrigger: 12},
    {id: 'k0edCov0L', name: "arbuz", mail: "blablaaa@bla.com", rule: {hour: 15, minute: 22}, bus: 171, station: 1000},
    {id: 'UV2TWMXak', name: "arbuz", mail: "blablaaa@bla.com", rule: {hour: 15, minute: 22}, bus: 171, station: 1000},
    {id: 'xGEzN-iNG', name: "arbuz", mail: "blablaaa@bla.com", rule: {hour: 15, minute: 22}, bus: 171, station: 1000}
]

// const create = {id: '223', mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}};
const update = {status: 200, data: {id: '3294a', mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}}};

const loginApi = async (data) => {
    if(config.isMock) { await wait(250); return {data: '392A8349ABs9359SA'} };
    const res = await request.post('login', data).catch(err => { throw (err.response) });
    return res;
}

const getSchedulesApi = async (mail) => {
    if(config.isMock) { await wait(300); return {data: mockSchedules}; } //mockSchedules  or []
    const res = await request.get(`schedules/mail/${mail}`).catch(err => { throw (err.response) });
    return res;
}

const createScheduleApi = async (data) => {
    if(config.isMock) { await wait(300); return {status: 200, data: {id: shortid.generate(), mail: "bla213bla@bla.com", rule: {hour: 52, minute: 5}, bus: 271, station: 5, name: "test"}}; }
    // await wait(1000);
    const res = await request.post(`schedule`, data).catch(err => { throw (err.response)});
    return res;
}

const updateScheduleApi = async (id, data) => {
    if(config.isMock) { await wait(250); return update; }
    const res = await request.put(`schedule/${id}`, data).catch(err => { throw (err.response)});
    return res;
}

const deleteScheduleApi = async (id) => {
    if(config.isMock) { await wait(250); return {status: 200}; }
    const res = await request.delete(`schedule/${id}`).catch(err => { throw (err.response) });
    return res;
}

const getBusTimesApi = async (station, bus) => {
    if(config.isMock) { await wait(250); return randomBusTimes(); }
    const res = await request.get(`bustime/${station}/${bus}`).catch(err => { throw (err.response) });
    return res;
}

const randomBusTimes = () => {
    let x  = Math.floor((Math.random() * 60) + 1);
    let y  = Math.floor((Math.random() * 60) + 1);
    let z  = Math.floor((Math.random() * 60) + 1);

    return `${x}, ${y}, ${z}`;
}
export { loginApi, getSchedulesApi, createScheduleApi, updateScheduleApi, deleteScheduleApi, getBusTimesApi };