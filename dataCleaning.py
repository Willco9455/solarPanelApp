import os
import pandas as pd
import numpy as np


df = pd.read_csv('./data/imageData.csv')

#   ['Clear' 'Drizzle' 'Fog' 'Freezing Rain' 'Heavy Fog' 'Heavy Rain'
#  'Heavy Snow' 'Light Fog' 'Light Freezing Fog' 'Light Rain'
#  'Light Rain Showers' 'Light Snow' 'Light Thunderstorms and Rain'
#  'Low Drifting Snow' 'Mist' 'Mostly Cloudy' 'NA' 'Overcast' 'Partial Fog'
#  'Partly Cloudy' 'Rain' 'Scattered Clouds' 'Snow' 'Snow Grains'
#  'Thunderstorm' 'Thunderstorms and Rain' 'Unknown' 'nan']
remove_conditions = ['Fog', 'Heavy Fog', 'Heavy Rain', 'Heavy Snow', 
                     'Mist', 'NA', 'Snow Grains', 'Thunderstorm', 'Thunderstorms and Rain' , 
                     'Unknown', 'nan','Light Snow', 'Snow', 'Rain', 'Light Rain']


for dir in os.listdir('./data/images'):
  for image in os.listdir('./data/images/' + dir):
    night = condition = df.loc[df['Filename'] == image, 'night'].item()
    if night >= 0.7:
      os.remove('./data/images/'+dir+'/'+image)
      print('removed: ', image)
    try:
      condition = df.loc[df['Filename'] == image, 'Conds'].item()
      # if image == '20130609_145731.jpg':
      #   print(condition)
    except:
      condition = 'NA'
    if condition in remove_conditions:
      os.remove('./data/images/'+dir+'/'+image)
      print('removed: ', image)