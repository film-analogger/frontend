#/bin/bash

curl -s -H 'Accept: application/vnd.openapi+json' http://localhost:1080/docs > openapi.json

docker run --rm \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    -v $(pwd):/local \
    openapitools/openapi-generator-cli:v7.20.0 generate \
    -i /local/openapi.json \
    -g typescript-axios \
    -o /local/src/api/filmAnaloggerApi \
    -p variableNamingConvention=camelCase \
    -p useSingleRequestParameter=true \
    --skip-validate-spec

rm openapi.json