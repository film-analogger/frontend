# ChemistryReadChemistryTranslatableReadTimestampableBlameableRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**chemistryType** | [**ChemistryTypeReadChemistryTranslatableReadTimestampableBlameableRead**](ChemistryTypeReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]
**manufacturer** | [**ManufacturerReadChemistryTranslatableReadTimestampableBlameableRead**](ManufacturerReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**dilutions** | [**Array&lt;DilutionReadChemistryTranslatableReadTimestampableBlameableRead&gt;**](DilutionReadChemistryTranslatableReadTimestampableBlameableRead.md) |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ChemistryReadChemistryTranslatableReadTimestampableBlameableRead } from './api';

const instance: ChemistryReadChemistryTranslatableReadTimestampableBlameableRead = {
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
