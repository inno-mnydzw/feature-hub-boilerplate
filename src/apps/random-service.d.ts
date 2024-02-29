import { FeatureServiceBinder, FeatureServiceProviderDefinition, FeatureServices, SharedFeatureService } from '@feature-hub/core';
import { Logger } from '@feature-hub/logger';
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
export declare const randomServiceDefinition: FeatureServiceProviderDefinition<SharedRandomService, RandomServiceDependencies>;
