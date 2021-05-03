import re
from flask import Flask, json, request, jsonify, make_response
from datetime import datetime
import requests
import pymongo
import bcrypt
import uuid
from water_predict import WqiPredict
from flask_cors import CORS
from water_iot import WaterIoT

CONNECTION_STRING = "mongodb+srv://giVUV61IjHNcTJ8G:giVUV61IjHNcTJ8G@cluster0.gx7el.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

client = pymongo.MongoClient(CONNECTION_STRING, serverSelectionTimeoutMS=2000)
db = client.get_database('JalaRead')
user_collection = pymongo.collection.Collection(db, 'usernames')
test_collections = pymongo.collection.Collection(db, "water_test")


@app.route('/user_total_test', methods=['POST'])
def user_total_test():
    if request.is_json:
        excellent = 0
        normal = 0
        poor = 0


        json_request = request.get_json()
        user_name = str(json_request["user_name"])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            collection = test_collections.find({"user_name": user_name})
            for item in collection:
                if str(item['predicted_water_type']) == "Excellent":
                    excellent += 1
                elif str(item['predicted_water_type']) == "Normal":
                    normal += 1
                elif str(item['predicted_water_type']) == "Poor":
                    poor += 1
                elif str(item['predicted_water_type']) == "Very Poor":
                    poor += 1
                else:
                    poor += 1
            total_test = {
                "Excellent": excellent,
                "Normal": normal,
                "Poor": poor
            }
            return make_response(jsonify(total_test))

        message = 'User not found'
        return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/prediction', methods=['POST'])
def get_prediction():
    if request.is_json:
        response_iot = requests.get("http://1b9d0a9c5ed2.ngrok.io/getData")
        jason_iot = response_iot.json()
        json_request = request.get_json()
        user_name = str(json_request["user_name"])
        water_index = WqiPredict(jason_iot['cond'], jason_iot['ph'])
        test_result = water_index.wqi_predict()
        # tested_location = str(json_request["tested_location"])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            water_test = WaterIoT()
            water_index = WqiPredict(jason_iot['cond'], jason_iot['ph'])
            test_result = water_index.wqi_predict()
            sensor_values = water_test.get_all_sensor()
            sensor_status = water_test.check_device_sensors()

            day = int(datetime.now().day)
            month = int(datetime.now().month)
            year = int(datetime.now().year)

            water_predicted_report = {
                "user_id": str(user_found['user_id']),
                "user_name": str(user_found['user_name']),
                "userFName": str(user_found['user_f_name']),
                "userLName": str(user_found['user_l_name']),
                "location": str(user_found['location']),
                "tested_location": str(user_found['location']),
                "date": day,
                "month": month,
                "year": year,
                "predicted_water_type": str(test_result['wqi_range']),
                "ph": jason_iot['ph'],
                "conductivity": jason_iot['cond'],
                "turbidity": jason_iot['turb'],
                "temperature": jason_iot['temp'],
                "wqi_index": int(test_result['wqi_index'][0]),
                "sensor_status": sensor_status

            }

            test_collections.insert_one(water_predicted_report)
            return make_response(jsonify({
                "user_id": str(user_found['user_id']),
                "user_name": str(user_found['user_name']),
                "predicted_water_type": str(test_result['wqi_range']),
                "ph": sensor_values['ph'],
                "conductivity": jason_iot['cond'],
                "turbidity": jason_iot['turb'],
                "temperature": jason_iot['temp'],
                "date": day,
                "month": month,
                "year": year,
                "wqi_index": int(test_result['wqi_index'][0]),
                "location": str(user_found['location'])
            }))

        message = 'User not found'
        return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/get_all', methods=['GET'])
def get_all():
    data = []
    collection = test_collections.find({})
    for item in collection:
        results = {
            "user_id": str(item['user_id']),
            "user_name": str(item['user_name']),
            "userFName": str(item['userFName']),
            "userLName": str(item['userLName']),
            "tested_location": str(item['location']),
            "date": int(item['date']),
            "month": int(item['month']),
            "year": int(item['year']),
            "predicted_water_type": str(item['predicted_water_type']),
            "conductivity": str(item['conductivity']),
            "turbidity": str(item['turbidity']),
            "temperature": str(item['temperature']),
            "ph": str(item['ph']),
            "wqi_index": str(item['predicted_water_type']),
        }
        data.append(results)
    return make_response(jsonify({"results": data}))


@app.route('/get_individual_report', methods=['POST'])
def get_individual_report():
    data = []
    if request.is_json:
        json_request = request.get_json()
        print(json_request)
        user_name_json = str(json_request["user_name"])
        print(user_name_json)
        user_found = user_collection.find_one({"user_name": user_name_json})
        if user_found:

            collection = test_collections.find({"user_name": user_name_json})
            count = 0
            for item in collection:
                results = {
                    "index_id": count,
                    "user_id": str(item['user_id']),
                    "user_name": str(item['user_name']),
                    "userFName": str(item['userFName']),
                    "userLName": str(item['userLName']),
                    "tested_location": str(item['location']),
                    "date": int(item['date']),
                    "month": int(item['month']),
                    "year": int(item['year']),
                    "predicted_water_type": str(item['predicted_water_type']),
                    "conductivity": str(item['conductivity']),
                    "turbidity": str(item['turbidity']),
                    "temperature": str(item['temperature']),
                    "ph": str(item['ph']),
                    "wqi_index": int(item['wqi_index']),
                }
                count += 1
                data.append(results)

            return make_response(jsonify({"results": data}))
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/get_report', methods=['POST'])
def get_report():
    data = []
    if request.is_json:
        json_request = request.get_json()
        print(json_request)
        user_name_json = str(json_request["user_name"])
        print(user_name_json)
        user_found = user_collection.find_one({"user_name": user_name_json})
        if user_found:
            cas = {
                "user_id": str(user_found['user_id']),
                "user_name": str(user_found['user_name']),
                "userFName": str(user_found['user_f_name']),
                "userLName": str(user_found['user_l_name'])
            }
            collection = test_collections.find({"user_name": user_name_json})
            for item in collection:
                results = {
                    "tested_location": str(item['tested_location']),
                    "date": int(item['date']),
                    "month": int(item['month']),
                    "year": int(item['year']),
                    "predicted_water_type": str(item['predicted_water_type']),
                    "conductivity": str(item['conductivity']),
                    "turbidity": str(item['turbidity']),
                    "temperature": str(item['temperature']),
                    "ph": str(item['ph']),
                    "wqi_index": int(item['wqi_index']),
                }
                data.append(results)

            print(cas)
            return make_response(jsonify({"user": cas, "results": data}))
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


# test to insert data to the data base
@app.route("/test_sensors")
def test_sensors():
    sensor_test = WaterIoT()
    sensor_test_results = sensor_test.check_device_sensors()
    return sensor_test_results


@app.route('/signup', methods=['POST'])
def signup():
    if request.is_json:
        _request_ = request.get_json()
        admin = bool(_request_['admin'])
        email = str(_request_['email'])
        user_name = str(_request_['user_name'])
        user_f_name = str(_request_['user_f_name'])
        user_l_name = str(_request_['user_l_name'])
        password = str(_request_['password'])
        nic_no = str(_request_['nic_no'])
        tele_no = str(_request_['tele_no'])
        location = str(_request_['location'])

        user_found = user_collection.find_one({"user_name": user_name})
        email_found = user_collection.find_one({"email": email})
        nic_no_found = user_collection.find_one({"nic_no": nic_no})

        if user_found:
            print(user_found)
            message = 'There already is a user by that name'
            return make_response(jsonify({"message": message}), 401)
        elif user_f_name.isdigit() or user_l_name.isdigit():
            message = 'First name or Last name cannot contain numbers. '
            return make_response(jsonify({"message": message}), 401)
        elif not email_verify(email):
            message = 'Invalid Email'
            return make_response(jsonify({"message": message}), 401)
        elif not (len(tele_no) == 10 and tele_no.isdigit()):
            message = 'Invalid Number'
            return make_response(jsonify({"message": message}), 401)
        elif not nic_verify(nic_no):
            message = 'Invalid NIC'
            return make_response(jsonify({"message": message}), 401)
        elif email_found:
            message = 'This email already exists in database'
            return make_response(jsonify({"message": message}), 401)
        elif nic_no_found:
            message = 'There NIC already exists in database'
            return make_response(jsonify({"message": message}), 401)
        else:
            user_id = uuid.uuid1()
            hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user_model = {
                "timestamp": str(datetime.now()),
                "user_id": user_id,
                "user_f_name": user_f_name,
                "user_l_name": user_l_name,
                "admin": admin,
                "user_name": user_name,
                "email": email,
                "tele_no": tele_no,
                "nic_no": nic_no,
                "password": hashed_pass,
                "location": location
            }
            message = 'ok'
            body = {
                "user_id": user_id,
                "admin": admin,
                "user_name": user_name
            }

            user_collection.insert_one(user_model)

            return make_response(jsonify({"message": message, "user_details": body}), 202)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/tester', methods=['POST'])
def test_web():
    json_request = request.get_json()

    user_name = str(json_request['nic_no'])

    if nic_verify(user_name):
        return "pk"

    return "false"


@app.route('/delete_user', methods=['POST'])
def delete_user():
    if request.is_json:
        json_request = request.get_json()
        user_name = str(json_request["user_name"])
        user_found = user_collection.find_one({"user_name": user_name})
        if user_found:
            user_collection.delete_one({"user_name": user_name})
            return make_response(jsonify({"message": " ok"}))
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_f_l_name', methods=['POST'])
def change_user_first_last_name():
    if request.is_json:
        json_request = request.get_json()
        user_name = str(json_request["user_name"])
        user_f_name = json_request['user_f_name']
        user_l_name = json_request['user_l_name']
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            user_collection.update_one({"user_name": user_name},
                                       {"$set": {"user_f_name": user_f_name, "user_l_name": user_l_name}}, upsert=True)
            return make_response(jsonify({"message": " ok"}))
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_name', methods=['POST'])
def change_user_name():
    if request.is_json:
        json_request = request.get_json()
        new_user_name = str(json_request['new_user_name'])
        old_user_name = str(json_request["old_user_name"])

        user_found = user_collection.find_one({"user_name": old_user_name})

        if user_found:
            if new_user_name == user_found['user_name']:
                user_collection.update_one({"user_name": old_user_name}, {"$set": {"user_name": new_user_name}},
                                           upsert=True)
                test_collections.update_one()
            else:
                message = 'New username cant be previous username'
                return make_response(jsonify({"message": message}), 401)
            return make_response(jsonify({"message": "ok"}), 202)
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)

    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


def email_verify(email):
    match = re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email)
    if match:
        return True
    return False


def nic_verify(nic):
    verify_nic = str(nic)
    print(len(verify_nic))
    if 10 <= len(verify_nic) <= 12:
        print("went")
        if (nic[:9].isdigit() and (nic[-1] == "V" or nic[-1] == "v")) or nic.isdigit():
            return True
        else:
            return False
    return False


@app.route('/change_user_email', methods=['POST'])
def change_user_email():
    if request.is_json:
        json_request = request.get_json()

        new_email = str(json_request['email'])
        user_name = str(json_request['user_name'])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            if not email_verify(new_email):
                new_email_found = user_collection.find_one({"email": new_email})
                if not new_email_found:
                    user_collection.update_one({"user_name": user_name}, {"$set": {"email": new_email}}, upsert=True)
                    return make_response(jsonify({"message": "ok"}), 202)
                else:
                    message = 'Email Already Taken'
                    return make_response(jsonify({"message": message}), 401)
            else:
                message = 'Invalid Email'
                return make_response(jsonify({"message": message}), 401)

        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_location', methods=['POST'])
def change_user_location():
    if request.is_json:
        json_request = request.get_json()
        user_name = str(json_request['user_name'])
        new_location = str(json_request['location'])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            user_collection.update_one({"user_name": user_name}, {"$set": {"location": new_location}}, upsert=True)
            return make_response(jsonify({"message": "ok"}), 202)
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)

    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_nic', methods=['POST'])
def change_user_nic():
    if request.is_json:
        json_request = request.get_json()
        new_nic = str(json_request['nic_no'])
        user_name = str(json_request['user_name'])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            new_email_found = user_collection.find_one({"nic_no": new_nic})
            if user_found["nic_no"] == new_nic:

                message = 'New Email cant be identical to new one'
                return make_response(jsonify({"message": message}), 401)
            elif nic_verify(new_nic):
                message = 'Invalid NIC'
                return make_response(jsonify({"message": message}), 401)

            elif not new_email_found:
                user_collection.update_one({"user_name": user_name}, {"$set": {"nic_no": new_nic}}, upsert=True)
                return make_response(jsonify({"message": "ok"}), 202)

            else:
                message = 'NIC Already Taken'
                return make_response(jsonify({"message": message}), 401)

        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_number', methods=['POST'])
def change_user_number():
    if request.is_json:
        json_request = request.get_json()
        tele_no = str(json_request['tele_no'])
        user_name = str(json_request['user_name'])
        user_found = user_collection.find_one({"user_name": user_name})

        if user_found:
            if len(tele_no) == 10 and tele_no.isdigit():
                user_collection.update_one({"user_name": user_name}, {"$set": {"tele_no": tele_no}}, upsert=True)
                return make_response(jsonify({"message": "ok"}), 202)
            else:
                message = 'Invalid Number'
                return make_response(jsonify({"message": message}), 401)
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/change_user_pass', methods=['POST'])
def change_user_pass():
    if request.is_json:
        json_request = request.get_json()
        user_name = str(json_request['user_name'])
        password = str(json_request['password'])
        user_found = user_collection.find_one({"user_name": user_name})
        # created =====+++======+++++=====+++++=====++++=====++++='''''''
        # user_id_found = True
        if user_found:
            password_check = user_found['password']
            if not bcrypt.checkpw(password.encode('utf-8'), password_check):
                hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                user_collection.update_one({"user_name": user_found["user_name"]}, {"$set": {"password": hashed_pass}},
                                           upsert=True)
                return make_response(jsonify({"message": "ok"}), 202)
            else:
                message = 'Password cant be Previous '
                return make_response(jsonify({"message": message}), 401)
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)

    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/get_user_details', methods=['POST'])
def get_user_account():
    if request.is_json:
        json_request = request.get_json()
        user_name = str(json_request['user_name'])
        user_found = user_collection.find_one({"user_name": user_name})
        if user_found:
            json_req_object = {
                "user_id": user_found["user_id"],
                "admin": user_found["admin"],
                "user_name": user_found["user_name"],
                "user_f_name": user_found["user_f_name"],
                "user_l_name": user_found["user_l_name"],
                "email": user_found["email"],
                "tele_no": user_found["tele_no"],
                "nic_no": user_found["nic_no"],
                "location": user_found["location"]
            }
            return make_response(jsonify(json_req_object))
        else:
            message = 'User not found'
            return make_response(jsonify({"message": message}), 401)

    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        _request = request.get_json()
        email = str(_request['user_name'])
        password = str(_request['password'])
        email_found = user_collection.find_one({"user_name": email})

        if email_verify(email):
            message = 'Invalid Email'
            return make_response(jsonify({"message": message}), 401)

        elif email_found:
            password_check = email_found['password']

            if bcrypt.checkpw(password.encode('utf-8'), password_check):
                message = 'Authorized'
                body = {
                    "user_id": email_found["user_id"],
                    "admin": email_found["admin"],
                    "user_name": email_found["user_name"]
                }
                return make_response(jsonify({"message": message, "user_details": body}), 202)

            else:
                message = 'Unauthorized'
                return make_response(jsonify({"message": message}), 401)
        else:
            message = 'Unauthorized'
            return make_response(jsonify({"message": message}), 401)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


if __name__ == '__main__':
    print("[SERVER] - Testing Connection with MongoDB Cloud sever ........................")
    try:
        print(client.server_info())
        print("[SEVER] - Testing with Cloud sever completed.")
    except pymongo.errors.ServerSelectionTimeoutError as err:
        print("[SEVER] - Test Failed.")
        print(err)

    app.run(debug=True)
