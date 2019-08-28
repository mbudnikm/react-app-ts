import axios from 'axios'

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
  const [firstName, lastName] = beneficiary.split(' ')
  return axios.get<Employee>(`http://localhost:3000/employees?firstName_like=${firstName}&lastName_like=${lastName}`)
    .then(res => res.data)
}