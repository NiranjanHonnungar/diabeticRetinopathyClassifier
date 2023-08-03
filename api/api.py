from flask import Flask,request
from flask_cors import CORS
import tensorflow as tf
import efficientnet.tfkeras as efn
import cv2
import time
import os
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import pandas as pd
import cv2
import os

from PIL import Image,ImageFilter



app= Flask(__name__)
CORS(app)

# model = tf.keras.models.load_model('D:/diabetic/api/CNN.model')
filename=''
model=tf.keras.models.load_model("classify.keras")

@app.route('/api/time')
def get_current_time():
    return {'time':time.time()}

@app.route('/api/upload',methods=['GET'])
def get_resp():
    return "Hi"

@app.route('/api/upload', methods=['POST'])
def upload():
    files = request.files.getlist('files[]')
    saved_files=[]
    for file in files:
        file_path = os.path.join('D:/diabetic/api/files', file.filename)
        file.save(file_path)
        saved_files.append(file_path)
    return {'files': files}

@app.route('/api/predict', methods=['POST'] )
def predict():
    res=[]
    files = request.files.getlist('files[]')
    path="D:/diabetic/api/files/"
    for file in files:
        # img = cv2.imread(path+file.filename)
        # RGBImg = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        # RGBImg= cv2.resize(RGBImg,(224,224))
        # image = np.array(RGBImg) / 255.0
        # predict=model.predict(np.array([image]))
        # per=np.argmax(predict,axis=1)
        # if per==1:
        #    res.append({"name":file.filename,
        #                "res":"No DR"})
        # else:
        #    res.append({"name":file.filename,
        #                "res":"DR"})
    # Load an image for prediction
        image_path = path+file.filename
        image = tf.keras.preprocessing.image.load_img(image_path)
        image_array = tf.keras.preprocessing.image.img_to_array(image)
        input_tensor = np.expand_dims(image_array, axis=0)
        input_tensor /= 255.0
        # Make predictions
        predictions = model.predict(input_tensor)
        print(predictions)
        predicted_class = np.argmax(predictions)
        # Get the class label
        class_labels = ["Mild","Moderate","No DR","Proliferative","Severe"]
        class_label = class_labels[predicted_class]
        res.append({"name":file.filename,"res":class_label})
    return res

