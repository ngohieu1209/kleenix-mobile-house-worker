const colorStatus = (status) => {
  if(status === 'PENDING') 
    return {
      color: '#FFE866',
      body: 'Đang chờ xác nhận'
    };
  if(status === 'DELIVERY') 
    return {
      color: '#FFE866',
      body: 'Đang di chuyển'
    };
  if(status === 'WORKING') 
    return {
      color: '#FFE9D0',
      body: 'Đang làm việc'
    };
  if(status === 'COMPLETED') 
    return {
      color: '#BFFBFF',
      body: 'Đã hoàn thành'
    };
  if(status.includes('CANCELLED')) {
    let body = 'Đã hủy';
    if(status === 'CANCELLED_BY_CUSTOMER') body = 'Đã hủy bởi khách hàng';
    if(status === 'CANCELLED_BY_PROVIDER') body = 'Đã hủy bởi Kleenix';
    return {
      color: '#FFE3EA',
      body
    };
  }
  if(status === 'CONFIRMED') 
    return {
      color: '#D3FADE',
      body: 'Đã xác nhận'
    };
  return {
    color: 'text-white',
    body: ''
  };
}

export default colorStatus;