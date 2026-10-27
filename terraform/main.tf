
terraform {
    required_version = ">= 1.10, < 2.0"

    required_providers {
        keycloak = {
            source  = "keycloak/keycloak"
            version = "5.7"
        }
    }
}


provider "keycloak" {
    client_id     = var.keycloak_realm_master_client_id
    client_secret = var.keycloak_realm_master_client_secret
    url           = var.keycloak_server_url
}

data "keycloak_realm" "film_analogger" {
    realm = "film-analogger"
}