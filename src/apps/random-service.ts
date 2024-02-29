import {
    FeatureServiceBinder,
    FeatureServiceProviderDefinition,
    FeatureServices,
    SharedFeatureService,
} from '@feature-hub/core';
import {Logger} from '@feature-hub/logger';

export interface RandomServiceV1 {
    getRandomNumber(): number;
    getRandomName(): string;
}

export interface SharedRandomService extends SharedFeatureService {
    readonly '1.0.0': FeatureServiceBinder<RandomServiceV1>;
}

export interface RandomServiceDependencies extends FeatureServices {
    readonly 's2:logger': Logger;
}

class RandomServiceV1Impl implements RandomServiceV1 {
    public constructor(private readonly logger: Logger) {}

    public getRandomName(): string {
      this.logger.info('Random name generated');
        return "Six";
    }

    public getRandomNumber(): number {
        //this.logger.info('Random number generated');
        return 600;
    }
}

export const randomServiceDefinition: FeatureServiceProviderDefinition<SharedRandomService, RandomServiceDependencies> = {
    id: 'test:random-service',
    dependencies: {
        featureServices: {
            's2:logger': '^1.0.0',
        },
    },
    create: (env) => {
        const logger: Logger = env.featureServices['s2:logger'];
        const randomService: RandomServiceV1Impl = new RandomServiceV1Impl(logger);

        return {
            '1.0.0': () => ({ featureService: randomService }),
        };
    },
};