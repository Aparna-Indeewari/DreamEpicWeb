import tensorflow as tf
import numpy as np
import cv2 as cv

interpreter = tf.lite.Interpreter(model_path="models/converted_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print(input_details)
print(output_details)


def predict(image):
    image = np.array(cv.resize(image, (150, 150)), dtype=np.float32)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    interpreter.set_tensor(input_details[0]['index'], image)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    probabilities = np.array(output_data[0])
    if probabilities > 0.1:
        output = 1
    else:
        output = 0
    return output
