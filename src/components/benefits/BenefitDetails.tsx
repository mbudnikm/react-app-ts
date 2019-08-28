import React from 'react';
import { Benefit } from '../../api/benefit';
import { BenefitIcon } from './BenefitIcon';

type BenefitDetailsProps = {
    benefit: Benefit
}

export const BenefitDetails = ({ benefit }: BenefitDetailsProps) => <div>
    <a href={benefit.beneficiary.email}>{benefit.beneficiary.name}</a>, 
    { benefit.service } <BenefitIcon service={benefit.service}/>, ${ benefit.monthlyFee }
</div>