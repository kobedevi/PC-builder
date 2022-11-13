import Alert from "../Design/Alert";

const ErrorAlert = ({error}) => {
    if(!error){
        return null
    }

    return <Alert color='danger'> {error.message || 'Something went wrong'} </Alert>
}

export default ErrorAlert;