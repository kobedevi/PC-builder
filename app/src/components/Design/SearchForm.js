import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import Input from './Input';
import { getValidationErrors } from 'core/utils/validation';

const schema = yup.object().shape({
    search: yup.string()
});

const defaultData = {
    search: '',
}

const SearchForm = ({onSubmit, setQuery, initialData={}, disabled}) => {

    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    const [isTouched, setIsTouched] = useState(false);

    const validate = useCallback((data, onSuccess) => {
        schema.validate(data, {abortEarly: false})
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
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const newData = {
            ...data,
            [e.target.name]: e.target.value,
        };
        setData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTouched(true);
        onSubmit(data);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setQuery('');
        setData({
            search: '',
        });
    }

    return (
        <form className="row align-items-end" onSubmit={handleSubmit}>
            <div className="col-md-6">

                <Input
                    label="search"
                    type="search"
                    name="search"
                    value={data.search}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.search}
                    placeholder='Search...'
                />

                {/* <input value={data.search} onChange={handleChange} className="form-control" type="search" placeholder="Search..." id="search" name="search"/> */}
            </div>
            <div className="col-md-4">
                <button type="submit" className='me-2 btn btn-primary'>Search</button>
                <button onClick={handleReset} className='btn btn-danger'>Reset</button>
            </div>
        </form>
    )
}

export default SearchForm;