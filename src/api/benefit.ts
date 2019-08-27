import axios from 'axios'

export type Benefit = {
  "id": string;
  "beneficiary": {
    name: string;
    email: string;
  };
  "country": string;
  "city": string;
  "service": string;
  "monthlyFee": number;
  "subscribedAtDate": string;
};


// export const fetchBenefits = (): Promise<Benefit[]> => {
export const fetchBenefits = () => {
  return axios.get<Benefit[]>('http://localhost:3000/benefits')
    .then(res => res.data)
}