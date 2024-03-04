import cv2
from PIL import Image
import numpy as np
import math 

import tensorflow as tf
from tensorflow import keras

model = tf.keras.models.load_model('./fast_scnn.keras', safe_mode=False)

# takes in image as an array
def getSkyMask(img): 
  imageForMask = img.copy()
  imageForMask = cv2.resize(imageForMask, (1024, 512))
  # maskes prediction from test image
  imageForMask=np.expand_dims(imageForMask, 0)
  prediction = model.predict(imageForMask)
  mask = np.array(prediction[0][:,:,0])


  # turns prediction into mask of 1's and 0's
  def classify(x):
    if x >= 0.5:
      return 255
    else:
      return 0

  vectorizeClassify = np.vectorize(classify)
  mask = vectorizeClassify(mask)

  mask = cv2.resize(mask.astype(np.uint8), (img.shape[1], img.shape[0]))
  return mask 


# gegerates mask for path where values of 255 mark parts of the suns path  
def getPathMask(image):
  newImage = np.zeros((image.shape[0], image.shape[1]))
  for x in range(0, image.shape[0]):
    for y in range(0, image.shape[1]):
      # print(image[x][y][0])
      if (image[x][y] == [227, 227, 227]).all():
        newImage[x][y] = 255
      # else: 
      #   newImage[x][y] = [0
  newImage = Image.fromarray(newImage)
  newImage = np.array(newImage)
  newImage = cv2.medianBlur(newImage,5)
  return newImage


def getShadeFactor(image, hours): 
  # generate masks for the image 
  mask = getSkyMask(image) 
  pathMask = getPathMask(image)
  
  shadeFactors = []
  # loop through each column of the path mask and find out if the path pixel for that collumn is in shade or not
  for y in range(pathMask.shape[1]):
    without = 0
    col = pathMask.T[y]
    top = None
    bottom = None
    for x in range(0, len(col)):
      if (top == None) and (col[x] == 255):
        top = x
        bottom = x
      elif (col[x] == 255):
        bottom += 1
    # if there was no white spots add 1 to the without 
    if top != None: 
      # sets the ammount of pixels to act as the buffer 
      buffer = 20
      maskTop = mask[top - buffer][y]
      maskBottom = mask[bottom + buffer][y]
      
      # sets shade value for that collumn of pixels where 1 means no shade
      shadeFactor = 0.5
      if (maskTop == 255) and (maskBottom == 255):
        shadeFactor = 0
      elif (maskTop == 0) and (maskBottom == 0):
        shadeFactor = 1
      shadeFactors.append(shadeFactor)

  sf = []
  for i in range(0, hours):
    leftPoint = i * len(shadeFactors)//hours
    rightPoint = leftPoint + len(shadeFactors)//hours
    split = shadeFactors[leftPoint:rightPoint]
    split = np.array(split)
    sum = np.sum(split)
    avg = sum/len(split)
    sf.append(avg)

  return sf

# reads in an image through the thingy 
image = cv2.imread('./test2.jpg', 1)
image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
image = Image.fromarray(image)
image = np.array(image)

sf = getShadeFactor(image, 3)
print(sf)