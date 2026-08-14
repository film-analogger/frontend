# ChemistryWriteChemistryCatalogStatusWrite


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**process** | **string** |  | [default to undefined]
**chemistryType** | **string** |  | [default to undefined]
**manufacturer** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**referenceTemperatureMin** | **number** |  | [optional] [default to undefined]
**referenceTemperatureMax** | **number** |  | [optional] [default to undefined]
**openShelfLifeDays** | **number** |  | [optional] [default to undefined]
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
    referenceTemperatureMin,
    referenceTemperatureMax,
    openShelfLifeDays,
    dilutions,
    officialDocumentationUrl,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
