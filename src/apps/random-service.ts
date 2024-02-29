import {
    FeatureServiceBinder,
    FeatureServiceProviderDefinition,
    FeatureServices,
    SharedFeatureService,
} from '@feature-hub/core';
import {Logger} from '@feature-hub/logger';

interface Car {
    type: string;
    model: string;
    year: number;
}

const listOfCars: Car[] = [
    { type: "Toyota", model: "Corolla", year: 2009 },
    { type: "Ford", model: "Mustang", year: 1969 },
    { type: "Chevrolet", model: "Impala", year: 1959 },
    { type: "Honda", model: "Civic", year: 2019 },
    { type: "BMW", model: "3 Series", year: 2020 },
    { type: "Audi", model: "A4", year: 2018 },
    { type: "Mercedes-Benz", model: "E-Class", year: 2021 },
    { type: "Nissan", model: "Altima", year: 2022 },
    { type: "Subaru", model: "Outback", year: 2017 },
    { type: "Volkswagen", model: "Golf", year: 2020 },
    { type: "Hyundai", model: "Elantra", year: 2015 },
    { type: "Kia", model: "Soul", year: 2016 },
    { type: "Lexus", model: "ES", year: 2019 },
    { type: "Infiniti", model: "Q50", year: 2018 },
    { type: "Volvo", model: "XC90", year: 2021 },
    { type: "Aston Martin", model: "DB11", year: 2019 }
];

export interface RandomServiceV1 {
    getRandomNumber(): number;
    getRandomCarName(): string;
}

export interface SharedRandomService extends SharedFeatureService {
    readonly '1.0.0': FeatureServiceBinder<RandomServiceV1>;
}

export interface RandomServiceDependencies extends FeatureServices {
    readonly 's2:logger': Logger;
}

class RandomServiceV1Impl implements RandomServiceV1 {
    public constructor(private readonly logger: Logger) {}


    private getRandomItem<T>(arr: T[]): T | undefined {
        if (arr.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    public getRandomCarName(): string {
        const randomName = this.getRandomItem(listOfCars);
      this.logger.info('Random name generated');
        return `${randomName.year} - ${randomName.type} - ${randomName.model}`;
    }

    public getRandomNumber(): number {
        this.logger.info('Random number generated');
        return Math.floor(Math.random() * (1000)) + 1;
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