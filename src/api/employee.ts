import axios from 'axios'

const CancelToken = axios.CancelToken

export type ContractType = "contract" | "permanent";

export type Employee = {
  "id": number;
  "nationality": string,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": number;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": string;
  "hiredAt": string;
  "expiresAt": string;
  "personalInfo": {
    "age": number;
    "phone": string;
    "email": string;
    "dateOfBirth": string;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": string[];
  "bio": string;
  "imgURL": string;
};

export const fetchEmployeeByName = (beneficiary: string) => {
  const source = CancelToken.source() // axios cancellation

  const [firstName, lastName] = beneficiary.split(' ')
  const promise = axios.get<Employee[]>(`http://localhost:3000/employees?firstName_like=${firstName}&lastName_like=${lastName}`, {
    cancelToken: source.token
  })
    .then(res => res.data[0])
  return { promise, source }
}