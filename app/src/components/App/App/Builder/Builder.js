import useMultiStepForm from "core/hooks/useMultiStepForm"
import CpuPicker from "./forms/CpuPicker"
import { useState } from "react"
import CpuCoolerPicker from "./forms/CpuCoolerPicker"
import StepCounter from "components/Design/StepCounter"

const initialData = {
	idCpu: "",
	idCpuCooler: "",
	idMotherboard: "",
	idCase: "",
	idRam: "",
	idGpu: "",
	idPsu: "",
}

const Builder = () => {

	const [data, setData] = useState(initialData)

	const updateFields = (fields) => {
		setData(prev => {
			return {...prev, ...fields}
		})
	}

	const {steps, currentStepIndex, step, isFirstStep, isLastStep,back, next} = 
		useMultiStepForm([
			<CpuPicker {...data} updateFields={updateFields}/>, 
			<CpuCoolerPicker {...data} updateFields={updateFields}/>,
		])


	const onSubmit = (e) => {
		e.preventDefault();
		if (!isLastStep) return next();
		alert("Success")
	}

	return (
		<div className="formWrapper">
			<div className="stepper">
				<StepCounter steps={steps} currentStepIndex={currentStepIndex}/>
			</div>
			
			<div style={{
				position: "relative",
				background: "white",
				border: "1px solid black",
				padding: "2rem",
				margin: "1rem",
				borderRadius: ".5rem",
			}}>
				<form className="builder" onSubmit={onSubmit}>
					<div style={{position: "absolute", top: ".5rem", right:".5rem"}}>
						{currentStepIndex + 1} / {steps.length}
					</div>
					<fieldset>
						<legend>{step}</legend>
						<div className='btnContainer'>
							{!isFirstStep && <button type="button" onClick={back}>Back</button>}
							<button type="submit">{isLastStep ? "Finish" : "Next"}</button>
						</div>
					</fieldset>
				</form>
				{data && (
					<div>
						{Object.entries(data).map(([key, value]) => {
						// hide show id fields
							return (
								<p key={key}>
									{key}: {value}
								</p>
							);
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default Builder