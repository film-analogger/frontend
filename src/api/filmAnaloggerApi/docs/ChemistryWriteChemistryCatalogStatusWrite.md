# ChemistryWriteChemistryCatalogStatusWrite


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**chemistryType** | [**ChemistryTypeWriteChemistryCatalogStatusWrite**](ChemistryTypeWriteChemistryCatalogStatusWrite.md) |  | [default to undefined]
**manufacturer** | [**ManufacturerWriteChemistryCatalogStatusWrite**](ManufacturerWriteChemistryCatalogStatusWrite.md) |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**dilutions** | [**Array&lt;DilutionWriteChemistryCatalogStatusWrite&gt;**](DilutionWriteChemistryCatalogStatusWrite.md) |  | [optional] [default to undefined]
**officialDocumentationUrl** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [default to StatusEnum_Personal]

## Example

```typescript
import { ChemistryWriteChemistryCatalogStatusWrite } from './api';

const instance: ChemistryWriteChemistryCatalogStatusWrite = {
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
