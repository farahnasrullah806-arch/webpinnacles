"""
Basic schema audit utility:
Fetches pages from sitemap and verifies JSON-LD script presence.
"""

import argparse
import xml.etree.ElementTree as ET

import requests
from bs4 import BeautifulSoup


def parse_sitemap(sitemap_url: str) -> list[str]:
    response = requests.get(sitemap_url, timeout=30)
    response.raise_for_status()
    tree = ET.fromstring(response.content)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [node.find("sm:loc", namespace).text for node in tree.findall("sm:url", namespace)]


def has_json_ld(url: str) -> bool:
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    return soup.find("script", attrs={"type": "application/ld+json"}) is not None


def run(sitemap_url: str):
    urls = parse_sitemap(sitemap_url)
    missing = []
    for url in urls:
        if not has_json_ld(url):
            missing.append(url)
            print(f"[MISSING] {url}")
        else:
            print(f"[OK] {url}")

    print("\nSummary")
    print(f"Total URLs: {len(urls)}")
    print(f"Missing JSON-LD: {len(missing)}")
    if missing:
        raise SystemExit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--sitemap", required=True)
    args = parser.parse_args()
    run(args.sitemap)
