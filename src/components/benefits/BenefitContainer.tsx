import React from 'react'
import { fetchBenefits, Benefit } from '../../api/benefit';
import { BenefitDetails } from './BenefitDetails';

type BenefitContainerProps = {
}

type BenefitContainerState = {
    benefits: Benefit[] | undefined,
    loading: boolean
}

export class BenefitContainer extends React.Component<
    BenefitContainerProps,
    BenefitContainerState
> {
    state = {
        benefits: undefined,
        loading: true
    }

    async componentDidMount() {
        const benefits = await fetchBenefits()
        this.setState({
            benefits,
            loading: false
        })
    }

    render() {
        return this.state.loading
        ? "Loading..." : 
        <> 
            <h1>Employee Benefits!</h1>
            {this.state.benefits.map(benefit => 
                <BenefitDetails benefit={benefit} />    
            )}
        </>
    }
}