import { AppLogo } from '@film-analogger/frontend';

// The real component references /logo*.svg from the app's public/ folder by
// absolute URL rather than importing them as modules, so these images never
// resolve outside the running app (see .design-sync/NOTES.md). The layout
// (box sizing, alt text) still renders correctly.
export const Default = () => <AppLogo />;

export const Compact = () => (
    <AppLogo
        height="32px"
        width="32px"
    />
);
