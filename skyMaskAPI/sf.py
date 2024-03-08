import cv2
from PIL import Image
import numpy as np
import math 
import os

import tensorflow as tf
from tensorflow import keras

# takes in image as an array
def getSkyMask(img, model): 
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
def getPathMask(image,):
  # lower and upper limits for the white color
  lower_limit = np.array([210, 210, 210])
  upper_limit = np.array([240, 240, 240])

  # create a mask for the specified color range
  mask = cv2.inRange(image, lower_limit, upper_limit)
  mask = cv2.medianBlur(mask ,5)
  return mask

# Dont really need anymore
def getShadeFactor(image, hours, model): 
  # generate masks for the image 
  mask = getSkyMask(image, model) 
  pathMask = getPathMask(image)
  
  shadeFactors = []
  # loop through each column of the path mask and find out if the path pixel for that collumn is in shade or not
  for y in range(pathMask.shape[1]):
    without = 0
    col = pathMask.T[y]
    top = None
    bottom = 0
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


def getSFMultiImage(folder_dir, hours, model):
  sfPerPixel = []
  
  for index, imageFile in enumerate(sorted(os.listdir(folder_dir))):
    # reads in an image through the thingy 
    image = cv2.imread(f'{folder_dir}/{imageFile}', 1)
    image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    image = Image.fromarray(image)
    image = np.array(image)
    
    mask = getSkyMask(image, model) 
    pathMask = getPathMask(image)
    
    for y in range(pathMask.shape[1]):
      without = 0
      col = pathMask.T[y]
      top = None
      bottom = 0
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
        sfPerPixel.append(shadeFactor)
        
  # here sfPerPixel is calculated 
  sf = []
  step = len(sfPerPixel) // hours
  sf = [sfPerPixel[x*step:(x+1)*step] for x in range(hours)]
  sf = [np.mean(sf[x]) for x in range(hours)]
  
  return sf


# # reads in an image through the thingy 
# image = cv2.imread('./stitch/frame_16.jpg', 1)
# # image = cv2.imread('./test2.jpg', 1)
# image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
# image = Image.fromarray(image)
# image = np.array(image)

# pathMask = getPathMask(image)
# # cv2.imwrite('pathMaskTest.jpg', pathMask)
# print('mask written')

