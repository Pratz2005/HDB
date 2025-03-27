import requests
      
url = "https://www.onemap.gov.sg/api/common/elastic/search?searchVal=5 MARSILING DRIVE&returnGeom=Y&getAddrDetails=Y&pageNum=1"
      
headers = {"Authorization": "Bearer **********************"}
      
response = requests.get(url, headers=headers)
      
print(response.text)