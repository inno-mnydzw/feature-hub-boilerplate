import React from 'react';
import {FeatureAppDefinition, FeatureServices} from '@feature-hub/core';
import {ReactFeatureApp} from '@feature-hub/react';
import { RandomServiceV1 } from "./random-service";

export interface HeaderFeatureServices extends FeatureServices {
    readonly 'test:random-service': RandomServiceV1;
}

const featureAppDefinition: FeatureAppDefinition<ReactFeatureApp, HeaderFeatureServices> = {
    dependencies: {
        featureServices: {'test:random-service': '^1.0.0'},
    },
    create: ({ featureServices }) => {
        const randomService: RandomServiceV1 = featureServices['test:random-service'];

        const randomNumber = randomService.getRandomNumber();
        const randomName = randomService.getRandomName();

        return {
            render: () => (<div style={{
                margin: '20px',
                border: '2px solid gray',
                background: 'lightblue',
                borderRadius: '6px',
                padding: '4px'
            }}>
                <h3>Feature App Header!</h3>
                <h3> Random Name: {randomName} </h3>
                <h3> Random Number: {randomNumber} </h3>
            </div>)
        }
    },
};

export default featureAppDefinition;