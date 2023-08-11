import BuildsOverview from './BuildsOverview'
import { fetchBuildsOverview } from 'core/modules/Builds/api';

const GeneralBuildsOverview = () => {
  return (
    <BuildsOverview
        fetcher={fetchBuildsOverview}
        title={'Completed builds overview'}
    />
  )
}

export default GeneralBuildsOverview