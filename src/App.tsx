import React from 'react';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

import { PointsOfInterest } from './components/Map/PointsOfInterest';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { Provider } from 'react-redux';
import store from './store/store';
import { processorFunctions } from './common/dataProcessingUtils';

const App = () => {
  const pathname = window.location.pathname;

  if (pathname.startsWith('/processdata')) {
    const processor = pathname.split('/')[2];
    processorFunctions[processor]();
    return;
  }

  return (
    <Provider store={store}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={12}
          defaultCenter={{ lat: 41.8781, lng: -87.6298 }}
          mapId='hidden-chicago'
        >
          <PointsOfInterest />
        </Map>

        <ControlPanel />
      </APIProvider>
    </Provider>
  );
};

export default App;
