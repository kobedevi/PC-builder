const StepCounter = ({steps, currentStepIndex}) => {
    const spacing = (100 / (steps.length-1)) ;
    console.log(currentStepIndex)
    

    return (
        <>  
            {steps.map((x, i) =>
                <div className={i >= (currentStepIndex) + 1 ? "stepCount" : "stepCount stepActive"} style={{left: i * spacing +"%", marginLeft:"-.75rem"}} key={i}>{i+1}</div>
            )}
            <div className="stepBar" style={{width: (currentStepIndex) * spacing +"%"}}></div>
        </>
    )
}

export default StepCounter