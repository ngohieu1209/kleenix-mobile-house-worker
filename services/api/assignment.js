import axiosInstance, { endpoints } from '../../utils/axios';

const assignmentApi = {
  getListBooking: async(status, startDate=null, endDate=null) => {
    const { data } = await axiosInstance.get(`${endpoints.assignment.listBooking}?status=${status}&startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`);
    return data.result;
  },
  newBooking: async(eventData) => {
    const { data } = await axiosInstance.post(endpoints.assignment.new, eventData);
    return data.result;
  }
}

export default assignmentApi;