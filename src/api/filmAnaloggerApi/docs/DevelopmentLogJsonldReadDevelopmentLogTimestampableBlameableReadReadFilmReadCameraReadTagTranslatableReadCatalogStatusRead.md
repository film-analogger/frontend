# DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**context** | [**HydraItemBaseSchemaContext**](HydraItemBaseSchemaContext.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**id** | **string** |  | [optional] [readonly] [default to undefined]
**film** | [**FilmJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead**](FilmJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead.md) |  | [default to undefined]
**camera** | [**CameraJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead**](CameraJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**shotAt** | [**ApproximateDateJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead**](ApproximateDateJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead.md) |  | [default to undefined]
**isoShotAt** | **number** |  | [default to undefined]
**shootingNotes** | **string** |  | [optional] [default to undefined]
**process** | **string** |  | [default to undefined]
**developedAt** | **string** |  | [default to undefined]
**steps** | [**Array&lt;DevelopmentStepJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead&gt;**](DevelopmentStepJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**developmentNotes** | **string** |  | [optional] [default to undefined]
**rating** | **number** |  | [optional] [default to undefined]
**tags** | [**Array&lt;TagJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead&gt;**](TagJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead.md) |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]
**pushPullStops** | **number** | Exposure index relative to the film\&#39;s nominal sensibility, in stops (e.g. +1.0 &#x3D; pushed one stop). | [optional] [readonly] [default to undefined]

## Example

```typescript
import { DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead } from './api';

const instance: DevelopmentLogJsonldReadDevelopmentLogTimestampableBlameableReadReadFilmReadCameraReadTagTranslatableReadCatalogStatusRead = {
    context,
    id,
    type,
    id,
    film,
    camera,
    shotAt,
    isoShotAt,
    shootingNotes,
    process,
    developedAt,
    steps,
    developmentNotes,
    rating,
    tags,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    pushPullStops,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
