export enum USER {
  DELIVERING = 1, // đang vận chuyển
  DELIVERED = 2, // đã vận chuyển
  REJECTED = 3, // bị từ chối bán hàng
  RETURNED = 4, // bị người dùng trả hảng
  CANCEL = 5, // bị người dùng hủy đơn hàng
}

export enum SELLER {
  SUCCESS = "success",
  WARNING = "warning",
}
