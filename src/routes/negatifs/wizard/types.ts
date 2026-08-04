import type { DevelopmentLogWriteDevelopmentLogProcessEnum } from '~/api/filmAnaloggerApi';

export interface WizardStep {
    key: string;
    chemistryId: string;
    chemistryParts: string;
    waterParts: string;
    temperature: string;
    durationSeconds: string;
    agitationNote: string;
}

export interface WizardState {
    step: number;
    filmId: string;
    cameraId: string;
    shotYear: string;
    shotMonth: string;
    shotDay: string;
    isoShotAt: string;
    process: DevelopmentLogWriteDevelopmentLogProcessEnum | '';
    developedAt: string;
    shootingNotes: string;
    binderId: string;
    contactSheetNumber: string;
    steps: WizardStep[];
    rating: number;
    tagIds: string[];
    developmentNotes: string;
}

let keySeed = 0;
export const nextKey = (): string => {
    keySeed += 1;
    return `k${String(keySeed)}`;
};

export const createStep = (): WizardStep => ({
    key: nextKey(),
    chemistryId: '',
    chemistryParts: '1',
    waterParts: '4',
    temperature: '20',
    durationSeconds: '',
    agitationNote: '',
});

export const createInitialState = (): WizardState => ({
    step: 0,
    filmId: '',
    cameraId: '',
    shotYear: '',
    shotMonth: '',
    shotDay: '',
    isoShotAt: '',
    process: '',
    developedAt: new Date().toISOString().slice(0, 10),
    shootingNotes: '',
    binderId: '',
    contactSheetNumber: '',
    steps: [createStep()],
    rating: 0,
    tagIds: [],
    developmentNotes: '',
});
