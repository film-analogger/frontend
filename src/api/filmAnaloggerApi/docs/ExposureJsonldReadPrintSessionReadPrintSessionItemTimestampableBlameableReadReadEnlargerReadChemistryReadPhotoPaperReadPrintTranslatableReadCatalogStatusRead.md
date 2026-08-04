# ExposureJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [readonly] [default to undefined]
**order** | **number** |  | [default to undefined]
**kind** | **string** |  | [default to undefined]
**baseSeconds** | **number** |  | [default to undefined]
**stopOffsetNumerator** | **number** |  | [optional] [default to 0]
**stopOffsetDenominator** | **number** |  | [optional] [default to 1]
**grade** | **string** |  | [default to undefined]
**aperture** | **string** |  | [optional] [default to undefined]
**observation** | **string** |  | [optional] [default to undefined]
**effectiveSeconds** | **number** | f-stop printing: adjustments are made in fractions of a stop applied to the base time, not on the lens aperture. E.g. \&quot;32s + 1/3\&quot; (baseSeconds&#x3D;32, stopOffsetNumerator&#x3D;1, stopOffsetDenominator&#x3D;3) gives 32 x 2^(1/3) &#x3D;~ 40.3s. | [optional] [readonly] [default to undefined]

## Example

```typescript
import { ExposureJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead } from './api';

const instance: ExposureJsonldReadPrintSessionReadPrintSessionItemTimestampableBlameableReadReadEnlargerReadChemistryReadPhotoPaperReadPrintTranslatableReadCatalogStatusRead = {
    id,
    order,
    kind,
    baseSeconds,
    stopOffsetNumerator,
    stopOffsetDenominator,
    grade,
    aperture,
    observation,
    effectiveSeconds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
