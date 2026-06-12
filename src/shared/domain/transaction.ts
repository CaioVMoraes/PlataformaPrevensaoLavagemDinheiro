export interface Transaction {
  id: string;
  amount: number;
  occurredAt: string;
  channel: string;
  counterparty: string;
}
