import { useState } from "react"

// https://www.youtube.com/watch?v=uDCBSnWkuH0

const useMultiStepForm = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const next = () => {
        setCurrentStepIndex(i => {
            if(i >= steps.length - 1) return i;
            return i + 1;
        })
    }
    
    const back = () => {
        setCurrentStepIndex(i => {
            if(i <= 0) return i;
            return i - 1;
        })
    }

    const goTo = (index) => {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length -1,
        goTo,
        next,
        back,
    }
}

export default useMultiStepForm