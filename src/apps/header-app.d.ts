import React from 'react';
declare var featureAppDefinition: {
    dependencies: {
        featureServices: {
            'test:random-service': string;
        };
    };
    create: (_ref: any) => {
        render: () => React.DetailedReactHTMLElement<{
            style: {
                margin: string;
                border: string;
                background: string;
                borderRadius: string;
                padding: string;
            };
        }, HTMLElement>;
    };
};
export default featureAppDefinition;
