"""
Generate XML sitemap from API data.
"""

import argparse
from datetime import datetime, timezone
from xml.etree.ElementTree import Element, SubElement, ElementTree

import requests


def add_url(parent: Element, loc: str, changefreq: str, priority: str):
    node = SubElement(parent, "url")
    SubElement(node, "loc").text = loc
    SubElement(node, "lastmod").text = datetime.now(timezone.utc).date().isoformat()
    SubElement(node, "changefreq").text = changefreq
    SubElement(node, "priority").text = priority


def fetch_json(url: str):
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    body = response.json()
    if not body.get("ok"):
        raise RuntimeError(f"API returned error for {url}")
    return body["data"]


def generate(base_url: str, api_url: str, output: str):
    urlset = Element(
        "urlset",
        {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"},
    )

    static_paths = [
        ("/", "weekly", "1.0"),
        ("/services/", "weekly", "0.9"),
        ("/services/case-studies/", "weekly", "0.8"),
        ("/about/", "monthly", "0.7"),
        ("/blog/", "daily", "0.8"),
        ("/contact/", "monthly", "0.8"),
        ("/privacy-policy/", "yearly", "0.3"),
    ]

    for path, freq, priority in static_paths:
        add_url(urlset, f"{base_url}{path}", freq, priority)

    services = fetch_json(f"{api_url}/public/services")
    for service in services:
        add_url(urlset, f"{base_url}/services/{service['slug']}/", "weekly", "0.85")

    blog_result = fetch_json(f"{api_url}/public/blog?page=1&pageSize=200")
    for post in blog_result["items"]:
        add_url(urlset, f"{base_url}/blog/{post['slug']}/", "weekly", "0.75")

    tree = ElementTree(urlset)
    tree.write(output, encoding="utf-8", xml_declaration=True)
    print(f"Sitemap written to {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default="https://webpinnacles.com")
    parser.add_argument("--api-url", default="http://localhost:4000")
    parser.add_argument("--output", default="./sitemap.xml")
    args = parser.parse_args()
    generate(args.base_url.rstrip("/"), args.api_url.rstrip("/"), args.output)
