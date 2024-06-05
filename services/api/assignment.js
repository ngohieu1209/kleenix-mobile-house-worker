import axiosInstance, { endpoints } from '../../utils/axios';

const assignmentApi = {
  getListBooking: async(status, startDate=null, endDate=null) => {
    const { data } = await axiosInstance.get(`${endpoints.assignment.listBooking}?status=${status}&startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`);
    return data.result;
  },
  acceptBooking: async(bookingId) => {
    const { data } = await axiosInstance.post(endpoints.assignment.acceptBooking, { bookingId });
    return data.result;
  },
  updateStatusBooking: async(bookingId) => {
    const { data } = await axiosInstance.post(endpoints.assignment.updateStatusBooking, { bookingId });
    return data.result;
  },
  completedBooking: async(bookingId) => {
    const { data } = await axiosInstance.post(endpoints.assignment.completedBooking, { bookingId });
    return data.result;
  },
}

export default assignmentApi;