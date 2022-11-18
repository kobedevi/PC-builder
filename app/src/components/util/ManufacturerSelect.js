import { useState, useEffect } from 'react';
import Select from '../Design/Select';
import useNoAuthApi from '../../core/hooks/useNoAuthApi';
import { fetchManufacturers } from '../../core/modules/Manufacturer/api';

const ManufacturerSelect = (props) => {
    const withNoAuth = useNoAuthApi();

    const [manufacturers, setManufacturers] = useState();

    useEffect(() => {
        withNoAuth(fetchManufacturers())
            .then((data) => setManufacturers(data))
            .catch((error) => {
                console.log(error)
            });
    }, [withNoAuth]);

    const options = manufacturers
        ? manufacturers.map((m) => ({ value: m.idManufacturer, label: m.manufacturerName }))
        : null;

    return (
        <>
            <Select options={options} {...props} />
            <a>Link that disables above field and lets you add a manufacturer</a>
        </>
    )
};

export default ManufacturerSelect;