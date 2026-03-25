"""
Fetch CrUX metrics for an origin.
Requires CRUX_API_KEY in environment.
"""

import argparse
import json
import os

import requests


def fetch_crux(origin: str, api_key: str):
    url = f"https://chromeuxreport.googleapis.com/v1/records:queryRecord?key={api_key}"
    payload = {"origin": origin}
    response = requests.post(url, data=json.dumps(payload), headers={"Content-Type": "application/json"}, timeout=30)
    response.raise_for_status()
    return response.json()


def run(origin: str):
    api_key = os.getenv("CRUX_API_KEY")
    if not api_key:
        raise SystemExit("CRUX_API_KEY is required")

    record = fetch_crux(origin, api_key)
    metrics = record.get("record", {}).get("metrics", {})
    print(f"Origin: {origin}")
    for metric_name in ["largest_contentful_paint", "interaction_to_next_paint", "cumulative_layout_shift"]:
        metric = metrics.get(metric_name, {})
        print(metric_name, "->", metric.get("percentiles", {}))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--origin", required=True)
    args = parser.parse_args()
    run(args.origin)
