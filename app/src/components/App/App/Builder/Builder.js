import useMultiStepForm from "core/hooks/useMultiStepForm"
import CpuPicker from "./forms/CpuPicker"
import { useState } from "react"
import CpuCoolerPicker from "./forms/CpuCoolerPicker"

const initialData = {
	idcpu: "",
	idcooler: "",
	idmotherboard: "",
	idcase: "",
	idram: "",
	idgpu: "",
	idpsu: "",
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
			<CpuCoolerPicker {...data} updateFields={updateFields}/>
		])


	const onSubmit = (e) => {
		e.preventDefault();
		next()
	}

	return (
		<div style={{
			position: "relative",
			background: "white",
			border: "1px solid black",
			padding: "2rem",
			margin: "1rem",
			borderRadius: ".5rem",
		}}>
			<form className="builder" noValidate={true} onSubmit={e => e.preventDefault()}>
				<div style={{position: "absolute", top: ".5rem", right:".5rem"}}>
					{currentStepIndex + 1} / {steps.length}
				</div>
				<fieldset>
					<legend>{step}</legend>
					<div className='btnContainer'>
						{!isFirstStep && <button type="button" onClick={back}>Back</button>}
						<button type="submit" onClick={onSubmit}>{isLastStep ? "Finish" : "Next"}</button>
					</div>
				</fieldset>
			</form>
		</div>
	)
}

export default Builder