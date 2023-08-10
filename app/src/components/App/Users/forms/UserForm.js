import * as yup from 'yup';
import { useState, useCallback, useEffect } from 'react';
import Input from 'components/Design/Input';
import Button from 'components/Design/Button';
import RoleSelect from './RoleSelect';
import { getValidationErrors } from 'core/utils/validation';


const createSchema = yup.object().shape({
    email: yup.string().email().required(),
    userName: yup.string().required(),
    password: yup.string()
        .required() 
        .min(5, 'Password is too short - should be 5 chars minimum.'),
    role: yup.string().required().nullable(),
});

const updateSchema = yup.object().shape({
    email: yup.string().email().required(),
    userName: yup.string().required(),
    role: yup.string().required(),
});

const defaultData = {
    email: '',
    userName: '',
    password: '',
    role: '',
}

const UserForm = ({onSubmit, initialData={}, disabled, isNew}) => {

    const [isTouched, setIsTouched] = useState(false);
    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const validate = useCallback((data, onSuccess) => {
        const schema = data.idUsers ? updateSchema : createSchema;
        schema.validate(data, {abortEarly: true})
        .then(() => {
            if(onSuccess) {
                onSuccess();
            }
        })
        .catch((err) => {
            setErrors(getValidationErrors(err));
        });
    }, []);

    useEffect(() => {
        if(isTouched) {
            validate(data);
        }
    }, [validate, isTouched, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTouched(true);
        validate(data, () => onSubmit(data))
    }


    return (
        
        <form noValidate={true} onSubmit={handleSubmit} style={{width:"100%"}}>

            <Input
                label="Email"
                type="email"
                name="email"
                value={data.email}
                disabled={disabled}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                label="Username"
                type="text"
                name="userName"
                value={data.userName}
                disabled={disabled}
                onChange={handleChange}
                error={errors.userName}
            />

            {
                isNew && (
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.password}
                    />
                )
            }

            <RoleSelect
                label="Role"
                name="role"
                value={data.role}
                disabled={disabled}
                onChange={handleChange}
                error={errors.role}
            />

            <Button className='mt-4' type="submit" disabled={disabled}>
                {data.idUsers ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default UserForm;