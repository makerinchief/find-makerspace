from googlesearch import search
import json
from time import sleep

makerspaceList = {
    "Alabama": [],
    "Alaska": [],
    "Arizona": [],
    "Arkansas": [],
    "California": [],
    "Colorado": [],
    "Connecticut": [],
    "Delaware": [],
    "Florida": [],
    "Georgia": [],
    "Hawaii": [],
    "Idaho": [],
    "Illinois": [],
    "Indiana": [],
    "Iowa": [],
    "Kansas": [],
    "Kentucky": [],
    "Louisiana": [],
    "Maine": [],
    "Maryland": [],
    "Massachusetts": [],
    "Michigan": [],
    "Minnesota": [],
    "Mississippi": [],
    "Missouri": [],
    "Montana": [],
    "Nebraska": [],
    "Nevada": [],
    "New Hampshire": [],
    "New Jersey": [],
    "New Mexico": [],
    "New York": [],
    "North Carolina": [],
    "North Dakota": [],
    "Ohio": [],
    "Oklahoma": [],
    "Oregon": [],
    "Pennsylvania": [],
    "Rhode Island": [],
    "South Carolina": [],
    "South Dakota": [],
    "Tennessee": [],
    "Texas": [],
    "Utah": [],
    "Vermont": [],
    "Virginia": [],
    "Washington": [],
    "West Virginia": [],
    "Wisconsin": [],
    "Wyoming": [],
}


print(makerspaceList.keys(), makerspaceList.values())

googleSearch = ""

for key in makerspaceList.keys():
    currentState = key
    googleSearch = currentState + " makerspace"
    print(f"Searching for {googleSearch} space in {currentState}")

    for j in search(googleSearch, tld="com", num=20, stop=20, pause=4):
        print(currentState, j)
        makerspaceList[key].append(j)

    print(f"Saving JSON")
    with open("stateList.json", "r+") as json_file:
        json.dump(makerspaceList, json_file)

    print(key, " FOUND")
    sleep(2)
