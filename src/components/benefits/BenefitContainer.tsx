import React from 'react'
import { fetchBenefits, Benefit, patchBenefit } from '../../api/benefit';
import { BenefitDetails } from './BenefitDetails';
import { BenefitEditor } from "./BenefitEditor"
import { produce } from 'immer'

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

    onUpdate = async (amount: number, type: string) => {

        this.setState({ loading: true })

        const promises = this.state.benefits!
            .filter(benefit => benefit.service === type)
            .map(benefit => patchBenefit(benefit.id, { monthlyFee: benefit.monthlyFee + amount }))

        await Promise.all(promises)
        this.setState({ loading: false })

        const state = produce((draft: BenefitContainerState) => {
            draft.benefits!
                .filter(benefit => benefit.service === type)
                .forEach(benefit => benefit.monthlyFee += amount)
        })
        this.setState(state)
    }

    getTotalMonthlyBenefitCost = () => {
        return this.state.benefits!
            .reduce((sum, benefit) => sum + benefit.monthlyFee, 0)
    }

    render() {
        return (
        <> 
            <h1>Employee Benefits!</h1>
            <div>
                <h5>Summary</h5>
                { this.state.loading
                    ? "Loading..." :  
                    <>
                        Total monthly cost: { this.getTotalMonthlyBenefitCost() }
                    </>} 
            </div>
            <BenefitEditor onUpdate={this.onUpdate} />
            { this.state.loading && 'Loading...' }
            { this.state.benefits && this.state.benefits.map(benefit => 
                <BenefitDetails benefit={benefit} key={benefit.id} />    
            ) }
        </>
        )}
}