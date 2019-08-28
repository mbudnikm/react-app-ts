import React, { useEffect, useState } from 'react';
import { Employee, fetchEmployeeByName } from "../../api/employee"

type BeneficiaryProps = {
    employee: string | undefined,
}

export const Beneficiary = ({ employee }: BeneficiaryProps) => {
    const [employeeData, setEmployeeData] = useState<Employee | undefined>(undefined)

    const [counter, setCount] = useState(0)

    let source
    useEffect(() => {
        if(employee) {
            const request = fetchEmployeeByName(employee)
            request.promise.then(response => setEmployeeData(response))
            source = request.source
        } else {
            setEmployeeData(undefined)
        }

        return () => {
            source.cancel()
        }
    }, [employee])

    return (
        <div>
            Pracownik: {employee}
            { employeeData && 
            <ul>
                <li>{ employeeData.salary }</li>
                <li>{ employeeData.title }</li>
            </ul> }
            {counter} <button onClick={() => setCount(counter => counter + 1)}>+1</button>
        </div>
    )
}