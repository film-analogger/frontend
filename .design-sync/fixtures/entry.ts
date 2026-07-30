// The design-sync bundle entry (wired via cfg.entry). Every component here
// is a default export in the app repo, so each is re-exported under its real
// name — a synth-entry `export * from` blanket scan would silently drop all
// of them (ES modules never re-export `default` through `export *`).
// Keep in sync with `componentSrcMap` in ../config.json whenever a component
// is added to or removed from the synced scope.
//
// Side-effect import: normally done once in the app's root.tsx. Every
// preview uses useTranslation(), so without this they render raw i18n keys
// (e.g. "components.footer.copyright") instead of real text.
import '~/i18n/i18n';

export { AppLogo } from '~/components/Widgets/AppLogo/AppLogo';
export { FilmCard } from '~/components/Widgets/FilmCard/FilmCard';
export { FilmName } from '~/components/Widgets/FilmName/FilmName';
export { IsoChip } from '~/components/Widgets/IsoChip/IsoChip';
export { ProcessChip } from '~/components/Widgets/ProcessChip/ProcessChip';
export { default as Footer } from '~/components/Layout/Parts/Footer/Footer';
export { default as OpenSource } from '~/components/Layout/Parts/OpenSource/OpenSource';
export { default as SideMenu } from '~/components/Layout/Parts/SideMenu/SideMenu';
export { default as Error } from '~/components/tools/Error/Error';
export { default as IconComponent } from '~/Theme/Components/IconComponent';
export { default as LinkBehavior } from '~/Theme/Components/LinkBehavior';
// Provider only — not a cataloged component, so it's not in componentSrcMap.
export { default as AppTheme } from '~/Theme/Theme';
