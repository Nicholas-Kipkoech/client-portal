export interface Imotor {
  model: string;
  reqNumber: string;
  value: number;
  use: string;
  yearOfManufacture: number;
}

export interface IQuotes {
  model: string;
  reqNumber: string;
  use: string;
  yearOfManufacture: number;
  premium: number;
  stamp_duty: number;
  trainning_levy: number;
  PHCfund: number;
}
