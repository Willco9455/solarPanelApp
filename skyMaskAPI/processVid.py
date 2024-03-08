import cv2
import os, os.path
import numpy as np
from PIL import Image


# gegerates mask for path where values of 255 mark parts of the suns path  
def getPathMask(image):
  # lower and upper limits for the white color
  lower_limit = np.array([210, 210, 210])
  upper_limit = np.array([240, 240, 240])

  # create a mask for the specified color range
  mask = cv2.inRange(image, lower_limit, upper_limit)
  mask = cv2.medianBlur(mask ,5)
  return mask


def loadImagesFromVid(vidPath, targetDir):
  capture = cv2.VideoCapture(vidPath)
  
  frameNr = 0
  imageNum = 0
  while (True):
    success, frame = capture.read()
    if (frameNr % 5 != 0):
      frameNr = frameNr+1
      continue
    if success:
      height = frame.shape[0]
      cropped = frame[200:height-200, :]
      cv2.imwrite(f'./{targetDir}/frame_{imageNum}.jpg', cropped)
      imageNum += 1
    else:
      break
    frameNr = frameNr+1
  capture.release()

# takes in images as numpy array 
def getNumNonArcCols(image):
  nonArcCols = 0
  for colIndex, col in enumerate(np.transpose(image, (1, 0, 2))):
    foundPixel = False
    if not ([227, 227, 277] in col):
      nonArcCols += 1
      
    # if out of loop means there was no arc pixel in that column so increment column counter
    # if not foundPixel: 
  return nonArcCols  

def cleanArcImages(folder_dir): 
  
  deleted = 0
  imageNum = len([name for name in os.listdir(folder_dir)])
  
  # loop until you find which image should be the first image 
  # tries to find the image that has the most of the starting arc in it but still has snome space showing that it is at the start 
  for imageInd in range(0, imageNum): 
    try:
      image = cv2.imread(f'./{folder_dir}/frame_{imageInd}.jpg', 1)
      image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    except: 
      continue
    
    image = Image.fromarray(image)
    image = np.array(image)
    
    nonArcCols = getNumNonArcCols(image)
    # if the image does not contain enough of the arc then remove it, once starting image is found break out if loop
    if nonArcCols >=220: 
      os.remove(f'./{folder_dir}/frame_{imageInd}.jpg')
      deleted += 1
      print('deleted')
    else: 
      break

  for imageInd in range(imageNum, deleted + 1, -1): 
    # break
    try:
      image = cv2.imread(f'./{folder_dir}/frame_{imageInd}.jpg', 1)
      image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    except: 
      continue
    
    image = Image.fromarray(image)
    image = np.array(image)
    
    nonArcCols = getNumNonArcCols(image)
    # if the image does not contain enough of the arc then remove it, once starting image is found break out if loop
    if nonArcCols >=220: 
      os.remove(f'./{folder_dir}/frame_{imageInd}.jpg')
      print('deleted')
    else: 
      break


def filterImages(folder_dir, imagesNeeded=5):
  # number of images needed innbween start and end
  middleImages = imagesNeeded - 2

  imageNum = len([name for name in os.listdir(folder_dir)])
  steps = (imageNum ) // (middleImages + 1)

  print(steps)

  for index, imageFile in enumerate(sorted(os.listdir(folder_dir))):
    # if first or last image then add it to the array 
    if (index == 0 or index == imageNum - 1):
      print('Keeping ', imageFile)
      image = cv2.imread(f'./{folder_dir}/{imageFile}', 1)
      image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
      image = Image.fromarray(image)
      image = np.array(image)
    elif((index % steps) == 0):
      print('Keeping ', imageFile)
      image = cv2.imread(f'./{folder_dir}/{imageFile}', 1)
      image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
      image = Image.fromarray(image)
      image = np.array(image)
    else: 
      print('Removing ', imageFile)
      os.remove(f'./{folder_dir}/{imageFile}')



# final function takes video path and puts the required videos 
def processVid(vidPath, imageNum=5):
  folder_dir = './vidImages'
  loadImagesFromVid(vidPath, folder_dir)
  cleanArcImages(folder_dir)
  filterImages(folder_dir, imageNum)
