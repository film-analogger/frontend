# ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**context** | [**HydraItemBaseSchemaContext**](HydraItemBaseSchemaContext.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**chemistryType** | [**ChemistryTypeJsonldReadChemistryTranslatableReadTimestampableBlameableRead**](ChemistryTypeJsonldReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]
**manufacturer** | [**ManufacturerJsonldReadChemistryTranslatableReadTimestampableBlameableRead**](ManufacturerJsonldReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**dilutions** | [**Array&lt;DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableRead&gt;**](DilutionJsonldReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableRead } from './api';

const instance: ChemistryJsonldReadChemistryTranslatableReadTimestampableBlameableRead = {
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
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
