# ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**context** | [**HydraItemBaseSchemaContext**](HydraItemBaseSchemaContext.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**chemistryType** | [**ChemistryTypeJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead**](ChemistryTypeJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead.md) |  | [default to undefined]
**manufacturer** | [**ManufacturerJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead**](ManufacturerJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead.md) |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**dilutions** | [**Array&lt;DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead&gt;**](DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [default to StatusEnum_Personal]

## Example

```typescript
import { ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead } from './api';

const instance: ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableReadCatalogStatusRead = {
    context,
    id,
    type,
    id,
    name,
    process,
    chemistryType,
    manufacturer,
    description,
    dilutions,
    officialDocumentationUrl,
    translations,
    isTranslated,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
