import os
import dotenv
from pydantic import BaseSettings  # A class for managing configuration or environment settings
from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer  # Used to handle OAuth2 authentication for single-tenant applications with AAD
from Backend.app.utils.get_credentials import get_vault_secret


class ADSettings(BaseSettings):
    """
    Azure AD settings

    This class contains the settings for the Azure AD authentication.
    Azure AD is used to manage user identities and permissions for accessing various resoucres and services within the Azure ecosystem.
    """
    
    def __init__(self):
        if os.path.exists(".env"):
            dotenv.load_dotenv(".env")
            self.tenant_id = os.getenv("AZ-TENANT-ID")
            self.client_id = os.getenv("AZ-APP-CLIENT-ID")
        else:
            self.tenant_id = get_vault_secret("AZ-TENANT-ID")
            self.client_id = get_vault_secret("AZ-APP-CLIENT-ID")


ad_settings = ADSettings()

# Azure AD authentication scheme setup - used in the `Security` dependency in the API routes
azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    tenant_id=ad_settings.tenant_id,
    app_client_id=ad_settings.client_id,
    scopes={
        # These are ALL the scopes required for accessing the API endpoints (set up in `Expose an API` in Enterprise App)
        f"api://{ad_settings.client_id}/User.Read": "User.Read",
        f"api://{ad_settings.client_id}/User.Write": "User.Write",
        f"api://{ad_settings.client_id}/User.Delete": "User.Delete",
    }
)
