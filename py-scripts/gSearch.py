from googlesearch import search

searchText = "hello world"

for result in search(searchText, tld="com", num=10, stop=10, pause=2):
    print(result)
