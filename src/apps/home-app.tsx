import React from 'react';
import {FeatureAppDefinition} from '@feature-hub/core';
import {ReactFeatureApp} from '@feature-hub/react';

const featureAppDefinition: FeatureAppDefinition<ReactFeatureApp> = {
  create: () => ({
    render: () => (
      <div style={{ margin: '20px', border: '2px solid gray', borderRadius: '6px', padding: '4px' }}>
        <h3>Feature Home App 100!</h3>
      </div>
    ),
  }),
};

export default featureAppDefinition;