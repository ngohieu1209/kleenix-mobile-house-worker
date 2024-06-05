import axiosInstance, { endpoints } from '../../utils/axios';

const scheduleApi = {
  getListSchedule: async(startDate=null, endDate=null) => {
    // console.log('winter-startDate', startDate)
    // console.log('winter-endDate', endDate)
    const { data } = await axiosInstance.get(`${endpoints.schedule.listAssignment}?startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`);
    return data.result;
  },
}

export default scheduleApi;