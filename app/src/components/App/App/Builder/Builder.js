import useMultiStepForm from "core/hooks/useMultiStepForm"
import CpuPicker from "./forms/CpuPicker"
import { useState, useRef, useEffect } from "react"
import CpuCoolerPicker from "./forms/CpuCoolerPicker"
import StepCounter from "components/Design/StepCounter"
import MotherboardPicker from "./forms/MotherboardPicker"
import RamPicker from "./forms/RamPicker"
import GpuPicker from "./forms/GpuPicker"
import CasePicker from "./forms/CasePicker"
import StoragePicker from "./forms/StoragePicker"
import PartsOverview from "./forms/PartsOverview"
import ErrorAlert from "components/shared/ErrorAlert"
import ItemList from "components/Design/ItemList"
import PsuPicker from "./forms/PsuPicker"
import Nav from "../Homepage/Nav"
import { createBuild, updateCurrentBuild } from "../../../../core/modules/Builds/api"
import { useAuth } from "../../../Auth/AuthContainer"
import useNoAuthApi from "core/hooks/useNoAuthApi"
import { useLocation, useNavigate } from "react-router-dom"
import { PossibleRoutes, route } from "core/routing"

const initialData = {
	idCpu: "",
	idCpuCooler: "",
	idMotherboard: "",
	idCase: "",
	idRam: "",
	idGpu: "",
	idPsu: "",

	storage: [],
	smallSlots: 0,
	largeSlots: 0,
	m2Slots: 0,

	idCpuSocket: "",
	idRamType: "",
	cooler: [],
	memorySlots: 0,
	pcieSlots: 0,
	idFormfactor: "",
	maxWidth:0,
	maxHeight:0,
	maxDepth:0,
}

const initialBuild = {
	cpu: {},
	cpucooler: {},
	motherboard: {},
	ram: {},
	storage: [],
	gpu: {},
	psu: {},
	case: {},
	id: '',
	name: '',
}

const Builder = () => {
	const location = useLocation();
	const auth = useAuth();
	const withNoAuth = useNoAuthApi();
	const navigate = useNavigate();
	let totalPrice = 0;

	const setTotalPrice = (newPrice) => {
		totalPrice = parseFloat(newPrice).toFixed(2);
	}

	const [currentBuild, setCurrentBuild] = useState({
		...initialBuild,
		...location.state?.data
	});

	const [data, setData] = useState({
		...initialData,
	});
	const [alert, setAlert] = useState();
	const [strictMode, setStrictMode] = useState(true);

	const builderForm = useRef(null);
	const hiddenInput = useRef(null);

	const updateFields = (fields) => {
		setData(prev => {
			return {...prev, ...fields}
		})
	}

	const updateBuild = (fields) => {
		setCurrentBuild(prev => {
			return {...prev, ...fields}
		})
	}

	// TODO: pagination
	const {steps, currentStepIndex, step, isFirstStep, isLastStep, isFinish, back, next} = 
		useMultiStepForm([
			<CpuPicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>, 
			<CpuCoolerPicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<MotherboardPicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<RamPicker {...data} strictMode={strictMode} setStrictMode={setStrictMode} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<StoragePicker {...data} strictMode={strictMode} setStrictMode={setStrictMode} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<GpuPicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<CasePicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<PsuPicker {...data} hiddenInput={hiddenInput} currentBuild={currentBuild} updateBuild={updateBuild} updateFields={updateFields}/>,
			<PartsOverview data={data} currentBuild={currentBuild}/>,
		])

	useEffect(() =>{
		if(isLastStep) {
			withNoAuth(createBuild(currentBuild, totalPrice, auth?.user))
			.then((res) => {
				updateBuild({
					id: res.id
				})
				next();
			}).catch((err) => setAlert(err));
		}
	},[currentBuild.name])

	const validate = async (e) => {
		e.preventDefault();
		if (isFinish) {
			return navigate(route(PossibleRoutes.BuildDetail, {id: currentBuild.id}), { replace: true });
		}
		if(hiddenInput.current.validity.valid) {
			setAlert(null);
			if (!isLastStep) return next();
			if (currentBuild.id) {
				return withNoAuth(updateCurrentBuild(currentBuild.id, currentBuild, totalPrice, auth?.user))
				.then(() => next())
				.catch((err) => setAlert(err));
			}
			const name = prompt("Please name your build", "");
			updateBuild({
				name
			})
		} else {
			setAlert({builderMsg: "Please pick a component"})
		}
	}

	return (
		<>
			<header>
				<Nav/>
			</header>
			<div className="formWrapper">
				<div className="stepper">
					<StepCounter steps={steps} currentStepIndex={currentStepIndex}/>
				</div>
				
				<div className="builderParent" style={{display:"flex", flexDirection: "column"}}>
					<h1 style={{textAlign:"center", fontWeight:"bold"}}>Builder</h1>
					<form className="builder" ref={builderForm}>
						<div style={{position: "absolute", top: ".5rem", right:".5rem"}}>
							{currentStepIndex + 1} / {steps.length}

						</div>
						<fieldset>
							{alert && 
								<ErrorAlert error={alert}/>
							}
							<legend>{step}</legend>
							<div className='btnContainer'>
								{(!isFirstStep && !isFinish) && <button className="back" type="button" onClick={back}><span>Back </span>&#9668;</button>}
								<button className="next" type="submit" onClick={(e) => validate(e)}><span className={isLastStep ? "finish" : ""}>{isLastStep ? "Finish" : "Next "}</span> &#9654;</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
			{currentBuild && 
				<ItemList color="info" setTotalPrice={setTotalPrice}info={currentBuild}/>
			}
		</>
	)
}

export default Builder