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

export type PatchableBenefit = Partial<Benefit>

export const fetchBenefits = () => {
  return axios.get<Benefit[]>('http://localhost:3000/benefits')
    .then(res => res.data)
}

export const patchBenefit = (id: Benefit['id'], benefit: Partial<Benefit>) => {
  return axios.patch<void>(`http://localhost:3000/benefits/${id}`, benefit, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.data)
}