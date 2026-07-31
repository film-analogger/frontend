import type {
    ExposureWritePrintGradeEnum,
    ExposureWritePrintKindEnum,
    PrintWritePrintFocalLengthEnum,
    PrintWritePrintNegativeFormatEnum,
    PrintWritePrintPaperBaseEnum,
    PrintWritePrintPaperBrandEnum,
    PrintWritePrintPaperSurfaceEnum,
} from '~/api/filmAnaloggerApi';
import { getDefaultEnlarger, getDefaultLab } from '~/domain/preferences';

export interface WizardBath {
    key: string;
    chemistryId: string;
    dilutionOverride: string;
    durationSeconds: string;
}

export interface WizardExposure {
    key: string;
    order: number;
    kind: ExposureWritePrintKindEnum;
    baseSeconds: string;
    stopOffsetNumerator: string;
    stopOffsetDenominator: string;
    grade: ExposureWritePrintGradeEnum;
    aperture: string;
    observation: string;
}

export interface WizardPrint {
    key: string;
    negativeNumber: string;
    filmFormat: string;
    paperBrand: PrintWritePrintPaperBrandEnum | '';
    paperModel: string;
    paperBase: PrintWritePrintPaperBaseEnum | '';
    paperSurface: PrintWritePrintPaperSurfaceEnum | '';
    negativeFormat: PrintWritePrintNegativeFormatEnum | '';
    focalLength: PrintWritePrintFocalLengthEnum | '';
    columnHeightCm: string;
    borderCm: string;
    copies: string;
    notes: string;
    exposures: WizardExposure[];
}

export interface WizardState {
    step: number;
    date: string;
    number: string;
    lab: string;
    enlarger: string;
    temperatureCelsius: string;
    wash: string;
    notes: string;
    baths: WizardBath[];
    prints: WizardPrint[];
}

let keySeed = 0;
export const nextKey = (): string => {
    keySeed += 1;
    return `k${String(keySeed)}`;
};

export const createExposure = (order: number): WizardExposure => ({
    key: nextKey(),
    order,
    kind: 'base',
    baseSeconds: '12',
    stopOffsetNumerator: '0',
    stopOffsetDenominator: '1',
    grade: '2',
    aperture: '',
    observation: '',
});

export const createPrint = (): WizardPrint => ({
    key: nextKey(),
    negativeNumber: '',
    filmFormat: '',
    paperBrand: '',
    paperModel: '',
    paperBase: '',
    paperSurface: '',
    negativeFormat: '',
    focalLength: '',
    columnHeightCm: '',
    borderCm: '',
    copies: '1',
    notes: '',
    exposures: [createExposure(1)],
});

export const createBath = (): WizardBath => ({
    key: nextKey(),
    chemistryId: '',
    dilutionOverride: '',
    durationSeconds: '',
});

export const createInitialState = (): WizardState => ({
    step: 0,
    date: new Date().toISOString().slice(0, 10),
    number: '',
    lab: getDefaultLab(),
    enlarger: getDefaultEnlarger(),
    temperatureCelsius: '20',
    wash: '',
    notes: '',
    baths: [createBath()],
    prints: [createPrint()],
});
