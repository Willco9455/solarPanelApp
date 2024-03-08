import cv2
from PIL import Image
import numpy as np
from flask import Flask, request, jsonify, send_file

import os
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt

from sf import getSFMultiImage
from processVid import processVid
app = Flask(__name__)

glob_model = tf.keras.models.load_model('./fast_scnn.keras', safe_mode=False)
print('model Loaded')

@app.route("/getShadeFactor", methods=["POST"])
def generateSf():
    file = request.files['vid']
    folder_dir = './vidImages'
    vid_path = './testVid.mp4'
    
    file.save(vid_path)
    
    hours = 9
    processVid(vid_path)
    sf = getSFMultiImage(folder_dir, hours, glob_model)

    # os.remove('./recived.jpg')
    return jsonify({'shadeFactor': sf})




if __name__ == "__main__":
    app.run(debug=True)
    
    
