from datetime import datetime  #Importing required libraries and modules.
import json
from time import time
import tensorflow as tf
import numpy as np
import cv2 as cv
from PyQt5.QtCore import QThread

# change the details.json to chan the dir of image save paths
with open("details.json", "r") as read_file:
    save_paths = json.load(read_file)

# this file contains final result
with open("final_result.txt", "w") as file:
    file.write("-----final results-----\n")

# this file contains all the information of saved images
with open("log_details.txt", "w") as file:
    file.write("-----Activity details-----\n")


def draw_rect(image, box):
    """
    This function is used to draw a bounding box around the object
    """
    height, width = image.shape[:2]
    y_min = int(max(1, (box[0] * height)))
    x_min = int(max(1, (box[1] * width)))
    y_max = int(min(height, (box[2] * height)))
    x_max = int(min(width, (box[3] * width)))
    cv.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 255, 0), 1)


def save_image(image, save_path, task):
    """
    This function saves the image to the specified path and writes the details to the log_details.txt file
    """
    now = datetime.now()
    current_time = now.strftime("%H_%M_%S")
    cv.imwrite(save_path + f'/image_{current_time}_.jpg', image)
    with open("log_details.txt", "a") as f:
        f.write(f"Detected {task} at time {current_time}: saved in {save_path + f'/image_{current_time}_.jpg'}\n")


class Process:
    """
    This class combines two main processes of the application i.e face detection and classification
    """
    def __init__(self):
        self.detect_faces = Facedetection()  # init face detection algorithm
        self.classify_image = Classification()  # init classification algorithm


    def start_process(self):
        """
        This method starts the face detection and classification processes in separate threads
        """
        self.detect_faces.start_thread()
        self.classify_image.start_thread()

    
    def get_image(self, image):
        """
        This method passes the input image to the face detection and classification processes for processing
        """
        self.detect_faces.face_detection(image.copy())
        self.classify_image.predict(image.copy())

    
    def get_result(self):
        """
        This method gets the final results from the face detection and classification processes and writes them to the
        final_result.txt file
        """
        self.detect_faces.get_result()
        self.classify_image.get_result()


class Facedetection(QThread):
    """
    This class is responsible for face detection using TensorFlow Object Detection API
    """

    def __init__(self):
        super(Facedetection, self).__init__()

        # initialize variables
        self.image = None
        self.detection_graph = tf.Graph()
        self.image_save_path_face_detection = save_paths["save_paths"]["face_detection"]
        self.zero_face_detected = np.zeros((1, 4))
        self.one_face_detected = np.zeros((1, 4))
        self.multi_face_detected = np.zeros((1, 4))

        # load model into detection graph
        with self.detection_graph.as_default():
            od_graph_def = tf.compat.v1.GraphDef()
            with tf.io.gfile.GFile(save_paths["model_paths"]["face_detection_model"], 'rb') as fid:
                serialized_graph = fid.read()
                od_graph_def.ParseFromString(serialized_graph)
                tf.import_graph_def(od_graph_def, name='')

            self.sess = tf.compat.v1.Session(graph=self.detection_graph)

        # get input/output tensors from detection graph
        self.image_tensor = self.detection_graph.get_tensor_by_name('image_tensor:0')
        self.detection_boxes = self.detection_graph.get_tensor_by_name('detection_boxes:0')
        self.detection_scores = self.detection_graph.get_tensor_by_name('detection_scores:0')
        self.detection_classes = self.detection_graph.get_tensor_by_name('detection_classes:0')
        self.num_detections = self.detection_graph.get_tensor_by_name('num_detections:0')

    
    def start_thread(self):
        """
        This method starts the face detection process in a separate thread
        """
        self.start()


    def face_detection(self, image):
        """
        This method sets the input image for processing by the face detection process
        """
        self.image = image


    def get_result(self):
        """
        This method calculates the time spent on each type of face detection and writes the results to the
        final_result.txt file
        """
        no_face_detected_time = np.sum(self.zero_face_detected, axis=0)[3]
        one_face_detected_time = np.sum(self.one_face_detected, axis=0)[3]
        multi_face_detected_time = np.sum(self.multi_face_detected, axis=0)[3]

        with open("final_result.txt", "a") as f:
            f.write(f"No face detected time   : {round(no_face_detected_time, 3)}s \n"
                    f"One face detected time  : {round(one_face_detected_time, 3)}s \n"
                    f"Multi face detected time: {round(multi_face_detected_time, 3)}s \n")

    def run(self):
        """
        This method runs the face detection process on the input image
        """
        while self.image is not None:
            start_time = time()
            number_of_faces = 0
            detection_vector = np.zeros(4)
            expanded_frame = np.expand_dims(self.image, axis=0)

            # run detection on input image
            (boxes, scores, classes, num_c) = self.sess.run([self.detection_boxes,
                                                             self.detection_scores,
                                                             self.detection_classes,
                                                             self.num_detections],
                                                            feed_dict={self.image_tensor: expanded_frame})

            # loop over detected faces and draw bounding boxes
            for index, score in enumerate(scores[0]):
                if score > 0.8:
                    number_of_faces += 1
                    b_box = boxes[0][index]
                    draw_rect(self.image, b_box)

            detection_vector[3] = time() - start_time

            if number_of_faces == 0:
                detection_vector[0] = 1
                self.zero_face_detected = np.append(self.zero_face_detected, [detection_vector], axis=0)
            elif number_of_faces == 1:
                detection_vector[1] = 1
                self.one_face_detected = np.append(self.one_face_detected, [detection_vector], axis=0)
            else:
                detection_vector[2] = 1
                self.multi_face_detected = np.append(self.multi_face_detected, [detection_vector], axis=0)

            if number_of_faces != 1 and self.image is not None:
                task = f"number of faces {number_of_faces} "
                save_image(self.image, self.image_save_path_face_detection, task)


'''
    - This class defines the image classification process using a pre-trained TensorFlow Lite model.
    - The constructor initializes the variables required for the classification process.
    - The start_thread() method starts the thread.
    - The prediction is done after
'''
class Classification(QThread):

    # Define the constructor method
    def __init__(self):
        super(Classification, self).__init__()

        # Initialize the variables
        self.process_start = False
        self.image = None
        self.output = None
        self.interpreter = tf.lite.Interpreter(model_path=save_paths["model_paths"]["classification_model"])
        self.interpreter.allocate_tensors()
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
        self.image_save_path_cheat_detection = save_paths["save_paths"]["cheat_detection"]
        self.avg_cal_vector_cheated = np.zeros((1, 4))
        self.avg_cal_vector_not_cheated = np.zeros((1, 4))

    # Define a method to start the thread
    def start_thread(self):
        self.start()

    # Define a method to predict image classification
    def predict(self, image):
        self.image = image

    # Define a method to get the result of image classification
    def get_result(self):
        cheated_time = np.sum(self.avg_cal_vector_cheated, axis=0)[3]
        not_cheated_time = np.sum(self.avg_cal_vector_not_cheated, axis=0)[3]

        # Write the result to a file
        with open("final_result.txt", "a") as f:
            f.write(f"Cheated time            : {round(cheated_time,3)}s \n")

    # Define a method to run the thread
    def run(self):
        while self.image is not None:
            start_time = time()
            
            # Initialize the classification vector
            classification_vector = np.zeros(4)

            # Preprocess the input image
            test_image = np.array(cv.resize(self.image, (150, 150)), dtype=np.float32)
            test_image = test_image / 255.0
            test_image = np.expand_dims(test_image, axis=0)
            
            # Set the input tensor to the preprocessed image and invoke the interpreter
            self.interpreter.set_tensor(self.input_details[0]['index'], test_image)
            self.interpreter.invoke()
            
            # Get the output data and probabilities
            output_data = self.interpreter.get_tensor(self.output_details[0]['index'])
            probabilities = np.array(output_data[0])
            
            # Set the classification vector based on the probabilities
            classification_vector[3] = time() - start_time
            if probabilities > 0.1:
                self.output = 1
                classification_vector[0] = 1
                self.avg_cal_vector_not_cheated = np.append(self.avg_cal_vector_not_cheated, [classification_vector],
                                                            axis=0)
            else:
                self.output = 0
                classification_vector[1] = 0
                self.avg_cal_vector_cheated = np.append(self.avg_cal_vector_cheated, [classification_vector], axis=0)

            # Save the image if the output is 0 (cheating detected)
            if self.output == 0 and self.image is not None:
                task = f'cheated activity'
                save_image(self.image, self.image_save_path_cheat_detection, task)


