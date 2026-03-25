"""
Triggers Google Indexing API for newly published pages.
Run via:
  python gsc_index.py --url https://webpinnacles.com/blog/new-post/
Or bulk:
  python gsc_index.py --sitemap https://webpinnacles.com/sitemap.xml
"""

import argparse
import json
from xml.etree import ElementTree as ET

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

SCOPES = ["https://www.googleapis.com/auth/indexing"]
SERVICE_ACCOUNT_FILE = "gsc-service-account.json"


def get_credentials():
    return service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )


def request_indexing(url: str, creds) -> dict:
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    creds.refresh(Request())
    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json",
    }
    payload = {"url": url, "type": "URL_UPDATED"}
    response = requests.post(endpoint, headers=headers, data=json.dumps(payload), timeout=30)
    return response.json()


def get_urls_from_sitemap(sitemap_url: str) -> list[str]:
    response = requests.get(sitemap_url, timeout=30)
    response.raise_for_status()
    tree = ET.fromstring(response.content)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [url.find("sm:loc", namespace).text for url in tree.findall("sm:url", namespace)]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", help="Single URL to index")
    parser.add_argument("--sitemap", help="Sitemap URL for bulk indexing")
    args = parser.parse_args()

    credentials = get_credentials()

    if args.url:
        result = request_indexing(args.url, credentials)
        print(f"Indexed: {args.url} -> {result}")
    elif args.sitemap:
        urls = get_urls_from_sitemap(args.sitemap)
        for index_url in urls:
            request_indexing(index_url, credentials)
            print(f"  ✓ {index_url}")
    else:
        raise SystemExit("Provide --url or --sitemap")
