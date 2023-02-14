enum VOUCHER {
  LEVEL_1 = 100000,
  LEVEL_2 = 400000,
  LEVEL_3 = 0.1,
  LEVEL_4 = 0.2,
}

enum POLICY {
  LEVEL_1 = 2000000, // 2m - 100k
  LEVEL_2 = 5000000, // 5m - 400k
  LEVEL_3 = 30000000, // 30m - 10%
  LEVEL_4 = 200000000, // 200m - 20%
}

const ShippingFeeBase: number = 30000;
const DefaultDistance: number = 3;

const calculateShipping = (dis: number) => {
  if (dis <= DefaultDistance) return ShippingFeeBase;
  else return ShippingFeeBase + (dis - DefaultDistance) * 5000;
};

const calculateVoucher = (subTotal: number) => {
  if (subTotal < POLICY.LEVEL_1) {
    return 0;
  }
  if (subTotal < POLICY.LEVEL_2) {
    return VOUCHER.LEVEL_1;
  }
  if (subTotal < POLICY.LEVEL_3) {
    return VOUCHER.LEVEL_2;
  }
  if (subTotal < POLICY.LEVEL_4) {
    return subTotal * VOUCHER.LEVEL_3;
  }
  return subTotal * VOUCHER.LEVEL_4;
};
export { calculateVoucher, calculateShipping };
