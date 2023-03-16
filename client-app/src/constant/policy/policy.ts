export enum TYPE_POLICY {
  FIXED = 1,
  PERCENT = 2,
}

export interface IInputPolicy {
  threshold: number;
  value: number;
  voucher_type_id: TYPE_POLICY;
}
