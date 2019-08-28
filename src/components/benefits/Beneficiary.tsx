import React from 'react';

type BeneficiaryProps = {
    employee: string | undefined,
}

export const Beneficiary = ({ employee }: BeneficiaryProps) => {
    return (
        <div>
            Pracownik: {employee}
        </div>
    )
}