# FilmReadFilmTranslatableReadTimestampableBlameableRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**emulsionType** | **string** |  | [optional] [default to undefined]
**inversible** | **boolean** |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**sensibility** | **number** |  | [default to undefined]
**primaryColor** | **string** |  | [optional] [default to undefined]
**secondaryColor** | **string** |  | [optional] [default to undefined]
**tertiaryColor** | **string** |  | [optional] [default to undefined]
**manufacturer** | [**ManufacturerReadFilmTranslatableReadTimestampableBlameableRead**](ManufacturerReadFilmTranslatableReadTimestampableBlameableRead.md) |  | [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { FilmReadFilmTranslatableReadTimestampableBlameableRead } from './api';

const instance: FilmReadFilmTranslatableReadTimestampableBlameableRead = {
    id,
    name,
    description,
    process,
    emulsionType,
    inversible,
    officialDocumentationUrl,
    sensibility,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    manufacturer,
    translations,
    isTranslated,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
