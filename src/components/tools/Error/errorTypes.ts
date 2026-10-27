import type React from 'react';
import { type ParseKeys } from 'i18next';

export interface ErrorAction {
    readonly labelKey: ParseKeys;
    readonly icon: React.ReactNode;
    readonly to?: string;
    readonly onClick?: () => void;
}

export interface ErrorLink {
    readonly labelKey: ParseKeys;
    readonly icon: React.ReactNode;
    readonly to: string;
}

export interface ErrorSafety {
    readonly icon: React.ReactNode;
    readonly messageKey: ParseKeys;
}
