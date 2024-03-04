import cv2
from PIL import Image
import numpy as np
from flask import Flask, request, jsonify, send_file

import os
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt

app = Flask(__name__)


from testing import getShadeFactor


@app.route("/getShadeFactor", methods=["POST"])
def generateSf():
    file = request.files['image']
    file.save('./recived.jpg')
    
    image = cv2.imread('./recived.jpg', 1)
    image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    image = Image.fromarray(image)
    image = np.array(image)
    

    image = cv2.imread('./recived.jpg', 1)
    image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    image = Image.fromarray(image)
    image = np.array(image)
    
    sf = getShadeFactor(image, 3)

    os.remove('./recived.jpg')
    return jsonify({'shadeFactor': sf})




if __name__ == "__main__":
    app.run(debug=True)
    
    
