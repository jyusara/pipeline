export interface UpdatePurchaseRequestDto {
  id: string;
  products?: {
    name?: string;
    quantity?: number;
    price?: number;
    boxes?: number;
    sku?: string;
  }[];
  referencePurchaseNumber?: string;
  provider?: string;
  storage?: string;
  confirmed?: boolean;
  subTotal?: number;
  total?: number;
  discount?: number;
  observation?: string;
  currency?: string;
  paymentType?: string;
  conditionPayment?: string;
  paymentReference?: string;
  numberOfBoxes?: number;
  active?: boolean;
}
