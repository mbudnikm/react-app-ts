import React from 'react'
import { fetchBenefits, Benefit } from '../../api/benefit';
import { BenefitDetails } from './BenefitDetails';
import { BenefitEditor } from "./BenefitEditor"

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
    } as BenefitContainerState

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
            <BenefitEditor onUpdate={(amount, benefitType) => {
                console.log(amount, benefitType)
            }} />
            {this.state.benefits!.map(benefit => 
                <BenefitDetails benefit={benefit} key={benefit.id} />    
            )}
        </>
    }
}