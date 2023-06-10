import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import Input from './Input';
import { getValidationErrors } from '../../core/utils/validation';

const schema = yup.object().shape({
    search: yup.string()
});

const defaultData = {
    search: '',
}

const SearchForm = ({onSubmit, setQuery, initialData={}, disabled, isPublic=false}) => {

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

    const handleEnter = (e) => {
        if (e.which === 13) {
            handleSubmit(e);
        }
    }

    return (
        <>
            { !isPublic && (
                <form className="row align-items-end" onSubmit={handleSubmit}>
                    <p>Private</p>
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

                    </div>
                    <div className="col-md-4">
                        <button type="submit" className='me-2 btn btn-primary'>Search</button>
                        <button type="reset" onClick={handleReset} className='me-2 btn btn-danger'>Reset</button>
                    </div>
                </form>
            )}
            { isPublic && (
                <div className="row align-items-end">
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
                            onKeyDown={handleEnter}
                        />

                    </div>
                    <div className="col-md-4">
                        <button type="button" onClick={handleSubmit} className='me-2 btn btn-primary'>Search</button>
                        <button type="reset" onClick={handleReset} className='me-2 btn btn-danger'>Reset</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchForm;