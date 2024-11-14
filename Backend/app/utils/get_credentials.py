import os
from typing import Optional
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential
from Backend.app.utils.logger import logger


def get_vault_secret(key: str) -> Optional[str]:
    """
        Fetching the database credentials from an Azure Key Vault
    """

    VAULT_URL = r"https://{...}.vault.azure.net/"
    credential = DefaultAzureCredential()

    try:
        client = SecretClient(vault_url=VAULT_URL, credential=credential)
        retrieved_secret = client.get_secret(key)
        return retrieved_secret.value

    except Exception as e:
        logger.error(f"Connection to SecretClient could not be established. Error: {e}")
        return os.getenv(key.upper())