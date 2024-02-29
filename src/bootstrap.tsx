import {createFeatureHub} from '@feature-hub/core';
import {defineExternals, loadAmdModule} from '@feature-hub/module-loader-amd';
import {FeatureAppLoader, FeatureHubContextProvider} from '@feature-hub/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {defineLogger} from "@feature-hub/logger";
// Custom Random Service
import {randomServiceDefinition} from "./apps/random-service";

defineExternals({ react: React });

const {featureAppManager} = createFeatureHub('test:integrator', {
  featureServiceDefinitions: [defineLogger(), randomServiceDefinition],
  moduleLoader: loadAmdModule,
  providedExternals: {
      react: process.env.REACT_VERSION as string
  },
});

ReactDOM.render(
    <div style={{ border: "1px solid black" }}>
    <FeatureHubContextProvider value={{featureAppManager}}>
        <FeatureAppLoader
            featureAppId="test:header-app"
            src="header-app.umd.js"
        />
        <FeatureAppLoader
        featureAppId="test:home-app"
        src="home-app.umd.js"
        />
    </FeatureHubContextProvider>
        <h4>React</h4>
    </div>,

  document.getElementById('app'),
);