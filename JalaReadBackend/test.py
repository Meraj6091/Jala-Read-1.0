import requests

from water_predict import WqiPredict
from datetime import datetime

response_iot = requests.get("http://1b9d0a9c5ed2.ngrok.io/getData")
jason_iot = response_iot.json()
print(jason_iot)
