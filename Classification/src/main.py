import base64
import io
import re
from exam_cheating_detection import Process
import cv2 as cv
from flask import Flask, jsonify, request, json
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

process = Process()



# Take in base64 string and return cv image
def stringToRGB(base64_string):
    image_data = re.sub('^data:image/.+;base64,', '', base64_string)
    decoded = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(decoded)) 
    return image


@app.route('/add_images', methods=['POST'])
def process_json():
    data = request.json
    images = data.get('images')
    for i in images:
        frame = stringToRGB(i)
        process.get_image(frame)
    return ('',200)


@app.route("/process", methods=["GET"])
def cheating_detection():
    result = process.get_result()
    return jsonify({"result": result})


# process = Process()
#     vid = cv.VideoCapture(0)
#     start = True
#     while True:
#         ret, frame = vid.read()
#         if ret:
#             h, w = frame.shape[:2]
#             frame = cv.resize(frame, (int(w * 0.5), int(h * 0.5)))
#             process.get_image(frame)
#             if start:
#                 process.start_process()
#                 start = False
#         if cv.waitKey(1) == 27:
#             result = process.get_result()
#             return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)
