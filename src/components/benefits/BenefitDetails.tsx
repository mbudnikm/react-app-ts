import React from 'react';
import { Benefit } from '../../api/benefit';

type BenefitDetailsProps = {
    benefit: Benefit
}

export const BenefitDetails = ({ benefit }: BenefitDetailsProps) => <div>
    <a href={benefit.beneficiary.email}>{benefit.beneficiary.name}</a>
</div>