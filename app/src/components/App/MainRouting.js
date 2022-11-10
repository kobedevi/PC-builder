import { Route, Routes, Navigate } from 'react-router-dom';
import { PossibleRoutes } from '../../core/routing';
import CpuOverview from './Cpus/CpuOverview';
import CreateCpu from './Cpus/CreateCpu';
import GeneralOverview from './GeneralOverview/GeneralOverview';

const MainRouting = () => {   
    
    return (
        <Routes>
            <Route path={PossibleRoutes.PartsOverview} element={<GeneralOverview />}/>
            <Route path={PossibleRoutes.Cpus} element={<CpuOverview />}/>
            <Route path={PossibleRoutes.CpuCreate} element={<CreateCpu />}/>
            <Route path="*" element={<Navigate to={PossibleRoutes.PartsOverview} replace />}/>
        </Routes>
    );
};

export default MainRouting;
