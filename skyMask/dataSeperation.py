# Seperates the large amount of data into a set size of divisions each with the same amount of cams just with
# less images for each cam in each data split
import os
import pandas as pd
import numpy as np
from distutils.dir_util import copy_tree
import shutil

# sets the number of folders the main data is split into
divisions = 10

for i in range(10):
  # creates the folders for the new split data
  newPath = f'./splits/data{i + 1}'
  if not os.path.exists(newPath):
    os.makedirs(newPath)
  if not os.path.exists(newPath):
    os.makedirs(newPath + '/images')
  
  # copies the masks into the mask folder for each split
  from_directory = "./data/masks"
  copy_tree(from_directory, newPath + '/masks')
  
# adds cam images to correct folders cam by cam
for cam in os.listdir('./data/images'):
  # adds the path for the cam in all the data secition
  for i in range(1,11):
    newCamPath = f'./splits/data{i}/images/{cam}'
    if not os.path.exists(newCamPath):
      os.makedirs(newCamPath)
  
  _, _, images = next(os.walk(f"./data/images/{cam}"))
  image_count = len(images)
  imagesPer = image_count//divisions

  for i in range(image_count):
    imagePackage = (i//imagesPer) + 1
    if imagePackage > divisions:
      break
    shutil.copyfile(f"./data/images/{cam}/{images[i]}",f"./splits/data{imagePackage}/images/{cam}/{images[i]}")
    