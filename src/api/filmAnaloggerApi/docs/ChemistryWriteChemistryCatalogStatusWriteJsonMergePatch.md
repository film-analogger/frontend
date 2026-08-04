# ChemistryWriteChemistryCatalogStatusWriteJsonMergePatch


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**process** | **string** |  | [optional] [default to undefined]
**chemistryType** | [**ChemistryTypeWriteChemistryCatalogStatusWrite**](ChemistryTypeWriteChemistryCatalogStatusWrite.md) |  | [optional] [default to undefined]
**manufacturer** | [**ManufacturerWriteChemistryCatalogStatusWrite**](ManufacturerWriteChemistryCatalogStatusWrite.md) |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**dilutions** | [**Array&lt;DilutionWriteChemistryCatalogStatusWrite&gt;**](DilutionWriteChemistryCatalogStatusWrite.md) |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to StatusEnum_Personal]

## Example

```typescript
import { ChemistryWriteChemistryCatalogStatusWriteJsonMergePatch } from './api';

const instance: ChemistryWriteChemistryCatalogStatusWriteJsonMergePatch = {
    name,
    process,
    chemistryType,
    manufacturer,
    description,
    dilutions,
    officialDocumentationUrl,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
