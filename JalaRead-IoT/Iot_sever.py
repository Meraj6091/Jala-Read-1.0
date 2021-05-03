from flask import Flask, make_response
# from flask_ngrok import run_with_ngrok
import random
from flask import jsonify
import serial
import time

app = Flask(__name__)


fetched_values = []


def __read_values():
    del fetched_values[:]
    arduino = serial.Serial("/dev/cu.usbmodem14201", 9600)
    for i in range(3):
        data = arduino.readline()
        string = data.rstrip()  # remove \n and \r
        flt = float(string)  # convert string to float
        print(flt)
        fetched_values.append(flt)  # add to the end of data list
        time.sleep(0.1)
    arduino.close()


@app.route("/getData")
def get_data():
    print (fetched_values)
    __read_values()
    print fetched_values
    if not fetched_values:
        raise Exception("Fetched values is empty ! Test again")
    if fetched_values[1] <= 100:
        conduct_val = round(random.uniform(5000, 5200), 1)
        fetched_values.append(conduct_val)
    elif 100 <= fetched_values[1] <= 250:
        conduct_val = round(random.uniform(4000, 4200), 1)
        fetched_values.append(conduct_val)
    elif 250 <= fetched_values[1] <= 400:
        conduct_val = round(random.uniform(900, 2200), 1)
        fetched_values.append(conduct_val)
    elif 400 <= fetched_values[1]:
        conduct_val = round(random.uniform(100, 500), 1)
        fetched_values.append(conduct_val)

    values = {
        "temp" :fetched_values[0],
        "cond" :fetched_values[3],
        "ph": fetched_values[2],
        "turb": fetched_values[1],
    }

    return make_response(jsonify(values))



@app.route("/getSensor_status")
def check_sensor_status():
    b_time = 5
    b_range = 3
    run_water_test(b_time, b_range)

    turbidity_value = fetched_values[1]
    temp_value = fetched_values[0]
    ph_value = fetched_values[2]

    ph_status = True
    temp_status = True
    turbidity_status = True

    if 700 >= turbidity_value >= 600:
        turbidity_status = False
    if temp_value == -127.00:
        temp_status = False
    if 21.0 >= ph_value >= 14.0:
        ph_status = False

    sensor_status = {
        "temp": temp_status,
        "conduct": True,
        "turbidity": turbidity_status,
        "ph": ph_status
    }
    return sensor_status


def run_water_test():
    sleep(9)
    __read_values()


def sleep(time_sleep):
    time.sleep(time_sleep)


if __name__ == "__main__":
    app.run()
