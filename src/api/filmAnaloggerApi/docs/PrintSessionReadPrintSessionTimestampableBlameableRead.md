# PrintSessionReadPrintSessionTimestampableBlameableRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**date** | **string** |  | [default to undefined]
**lab** | **string** |  | [default to undefined]
**number** | **number** |  | [default to undefined]
**enlarger** | **string** |  | [default to undefined]
**temperatureCelsius** | **number** |  | [default to undefined]
**chemicalBaths** | [**Array&lt;ChemicalBathReadPrintSessionTimestampableBlameableRead&gt;**](ChemicalBathReadPrintSessionTimestampableBlameableRead.md) |  | [optional] [default to undefined]
**wash** | **string** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**prints** | [**Array&lt;PrintReadPrintSessionTimestampableBlameableRead&gt;**](PrintReadPrintSessionTimestampableBlameableRead.md) |  | [optional] [default to undefined]
**createdBy** | **string** |  | [optional] [default to undefined]
**updatedBy** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { PrintSessionReadPrintSessionTimestampableBlameableRead } from './api';

const instance: PrintSessionReadPrintSessionTimestampableBlameableRead = {
    id,
    date,
    lab,
    number,
    enlarger,
    temperatureCelsius,
    chemicalBaths,
    wash,
    notes,
    prints,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
