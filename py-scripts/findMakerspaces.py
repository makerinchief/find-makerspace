from requests import get
from bs4 import BeautifulSoup
import json
from time import sleep
import os

state_list = [
    "alabama",
    "alaska",
    "arizona",
    "arkansas",
    "california",
    "colorado",
    "connecticut",
    "delaware",
    "florida",
    "georgia",
    "hawaii",
    "idaho",
    "illinois",
    "indiana",
    "iowa",
    "kansas",
    "kentucky",
    "louisiana",
    "maine",
    "maryland",
    "massachusetts",
    "michigan",
    "minnesota",
    "mississippi",
    "missouri",
    "montana",
    "nebraska",
    "nevada",
    "new Hampshire",
    "new Jersey",
    "new Mexico",
    "new York",
    "north Carolina",
    "north Dakota",
    "ohio",
    "oklahoma",
    "oregon",
    "pennsylvania",
    "rhode Island",
    "south Carolina",
    "south Dakota",
    "tennessee",
    "texas",
    "utah",
    "vermont",
    "virginia",
    "washington",
    "west Virginia",
    "wisconsin",
    "wyoming",
]

maker_list = {}


def filter_results(raw_html):
    soup = BeautifulSoup(raw_html, "html.parser")
    result_block = soup.find_all("div", attrs={"class": "g"})
    search_results = []
    print(len(result_block))
    for result in result_block:
        link = result.find("a", href=True)
        title = result.find("h3")
        if link and title:
            print(f"FOUND:\nTITLE: {title.text} \nLINK: {link['href']}")
            arr = [title.text, link["href"]]
            search_results.append(arr)

    return search_results


def search_google(state, num_results):
    user_agent = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/61.0.3163.100 Safari/537.36"
    }

    search_term = state + "+makerspace"
    google_url = "https://www.google.com/search?q={}&num={}&hl={}".format(
        search_term, num_results, "en"
    )
    print(google_url)
    response = get(google_url, headers=user_agent, proxies=None)
    response.raise_for_status()
    return response.text


for state in state_list:
    print(f"Finding spaces in {state}")
    state_spaces = filter_results(search_google(state, 25))
    maker_list[state] = state_spaces

    print(f"Saving {state} to JSON...")
    with open("./py-scripts/spaceList.json", "r+") as json_file:
        json.dump(maker_list, json_file)
    sleep(4)
