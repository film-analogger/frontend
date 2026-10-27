# ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**context** | [**HydraItemBaseSchemaContext**](HydraItemBaseSchemaContext.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**id** | **string** |  | [optional] [readonly] [default to undefined]
**name** | **string** |  | [default to undefined]
**films** | [**Array&lt;FilmJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead&gt;**](FilmJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**chemistries** | [**Array&lt;ChemistryJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead&gt;**](ChemistryJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**cameras** | [**Array&lt;CameraJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead&gt;**](CameraJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**enlargers** | [**Array&lt;EnlargerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead&gt;**](EnlargerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**photoPapers** | [**Array&lt;PhotoPaperJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead&gt;**](PhotoPaperJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
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
**status** | **string** |  | [default to StatusEnum_Personal]

## Example

```typescript
import { ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead } from './api';

const instance: ManufacturerJsonldReadManufacturerTimestampableBlameableReadTranslatableReadCatalogStatusRead = {
    context,
    id,
    type,
    id,
    name,
    films,
    chemistries,
    cameras,
    enlargers,
    photoPapers,
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
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
