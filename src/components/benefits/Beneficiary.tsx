import React, { useEffect, useState } from 'react';
import { Employee, fetchEmployeeByName } from "../../api/employee"
import { CancelTokenSource } from 'axios';

type BeneficiaryProps = {
    employee: string | undefined,
}

type PromiseFn<T, A> = (arg: A) => {
    promise: Promise<T>,
    source: CancelTokenSource
}
const useJest = <T, A>(promiseFn: PromiseFn<T, A>, param: A | undefined) => {
    const [data, setData] = useState<T | undefined>(undefined)

    let source: CancelTokenSource
    useEffect(() => {
        if(param) {
            const request = promiseFn(param)
            request.promise.then(response => setData(response))
            source = request.source
        } else {
            setData(undefined)
        }

        return () => {
            if(source) {
                source.cancel()
            }
        }
    }, [param])

    return data
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
            if(source) {
                source.cancel()
            }
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