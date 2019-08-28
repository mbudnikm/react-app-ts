import React from 'react';
import { Benefit } from '../../api/benefit';

type StringToString = {
    [key: string]: string
}

const icons = {
    'healthcare': '💊',
    'lunch-card': '🍗',
    'sport-system': '⚽',
    'cafeteria.io': '☕',
}

type BenefitIconProps = {
    service: Benefit['service']
}

export const BenefitIcon = ({ service }: BenefitIconProps) => {
    return (
        <span aria-label={service}>{ icons[service] }</span>
    )
}