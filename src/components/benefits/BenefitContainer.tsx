import React from 'react'
import { fetchBenefits, Benefit } from '../../api/benefit';
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

    onUpdate = (amount: number, type: string) => {
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
        return this.state.loading
        ? "Loading..." : 
        <> 
            <h1>Employee Benefits!</h1>
            <div>
                <h5>Summary</h5>
                Total monthly cost: { this.getTotalMonthlyBenefitCost() }
            </div>
            <BenefitEditor onUpdate={this.onUpdate} />
            {this.state.benefits!.map(benefit => 
                <BenefitDetails benefit={benefit} key={benefit.id} />    
            )}
        </>
    }
}