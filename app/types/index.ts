export interface Imotor {
  model: string;
  reqNumber: string;
  value: number;
  yearOfManufacture: number;
}

export interface IQuotes {
  model: string;
  reqNumber: string;
  yearOfManufacture: number;
  premium: number;
  stamp_duty: number;
  trainning_levy: number;
  PHCfund: number;
  totalPremium: number;
  days: number;
  value?: number;
}
