export const idFromIri = (iri: string): string => iri.slice(iri.lastIndexOf('/') + 1);
