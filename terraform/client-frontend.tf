
resource "keycloak_openid_client" "client-frontend" {
    realm_id  = data.keycloak_realm.film_analogger.id
    client_id = "film-analogger-frontend"

    name    = "Film Analogger Frontend"
    enabled = true

    description = "OpenID client for the Film Analogger Frontend"

    access_type           = "PUBLIC"
    standard_flow_enabled = true

    valid_redirect_uris = [
        "http://localhost:3000*",
    ]

    web_origins = [
        "http://localhost:3000",
    ]

    root_url = "http://localhost:3000"

    access_token_lifespan = "60"
}