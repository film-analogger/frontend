// The generated OpenAPI types for these relations describe the write-group
// shape of a *nested* object (e.g. `{ status: '...' }`), but API Platform
// also accepts — and this app always sends — a plain IRI string referencing
// an existing resource (see film/camera handling in NewDevelopmentLogWizard).
// Cast the result at each call site to the specific relation-write type.
export const asIri = (iri: string): unknown => iri;
