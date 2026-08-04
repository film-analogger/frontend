# ManufacturerReadManufacturerTimestampableBlameableReadTranslatableRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**films** | [**Array&lt;FilmReadManufacturerTimestampableBlameableReadTranslatableRead&gt;**](FilmReadManufacturerTimestampableBlameableReadTranslatableRead.md) |  | [optional] [default to undefined]
**chemistries** | [**Array&lt;ChemistryReadManufacturerTimestampableBlameableReadTranslatableRead&gt;**](ChemistryReadManufacturerTimestampableBlameableReadTranslatableRead.md) |  | [optional] [default to undefined]
**primaryColor** | **string** |  | [optional] [default to undefined]
**secondaryColor** | **string** |  | [optional] [default to undefined]
**tertiaryColor** | **string** |  | [optional] [default to undefined]
**website** | **string** |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { ManufacturerReadManufacturerTimestampableBlameableReadTranslatableRead } from './api';

const instance: ManufacturerReadManufacturerTimestampableBlameableReadTranslatableRead = {
    id,
    name,
    films,
    chemistries,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    website,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    translations,
    isTranslated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
