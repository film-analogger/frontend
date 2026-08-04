# CameraReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**manufacturer** | [**ManufacturerReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead**](ManufacturerReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead.md) |  | [default to undefined]
**filmFormat** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**translations** | **Array&lt;string | null&gt;** | array of TranslatedField objects, each containing the name of the translated field and the locale it was translated into | [optional] [default to undefined]
**isTranslated** | **boolean** |  | [optional] [default to false]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [default to StatusEnum_Personal]

## Example

```typescript
import { CameraReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead } from './api';

const instance: CameraReadCameraTranslatableReadTimestampableBlameableReadCatalogStatusRead = {
    id,
    name,
    manufacturer,
    filmFormat,
    description,
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
