import { StyleSheet, Text, View } from 'react-native';
// tensorflow imports
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';
import { useEffect, useState } from 'react';


export default function CNN() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelJson = require('../models/jsModel/model.json');
  const modelWeights = [require('../models/jsModel/group1-shard1of2.bin'), require('../models/jsModel/group1-shard2of2.bin')] ;

  async function bundleResourceIOExample() {
    await tf.ready() 
    console.log('here')
    const model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));

    const imageUri = 'https://t4.ftcdn.net/jpg/03/19/04/73/360_F_319047351_wb8hrWjRVMIxVBwM4SqGsNazr68i1rAn.jpg';
    const response = await fetch(imageUri, {}, { isBinary: true });
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);
    imageTensor = decodeJpeg(imageData);
    imageTensor = tf.cast(imageTensor, 'float32')
    imageTensor = tf.image.resizeNearestNeighbor(imageTensor, [512, 1024])
    // const img = tf.reshape(imageTensor, [1,512,1024,3])
    console.log('Outer')
    console.log(imageTensor)
    console.log('About to Predict')
    // const prediction = model.predict(tf.randomNormal([1, 512, 1024, 3]))
    const prediction = model.predict(imageTensor)
    console.log('passed prediction')
    // const prediction2 = await model.predict(tf.randomNormal([1, 512, 1024, 3]))
    // console.log(model.predict(tf.randomNormal([1, 512, 1024, 3])))
    console.log('Hello Again')
    console.log(prediction)

    
    imageTensor = decodeJpeg(imageData);
    // model.predict
    //  const res = model.predict(tf.randomNormal([1, 28, 28, 1]));
  }
  
  useEffect(() => {
    bundleResourceIOExample()
    // setModelLoaded(true);
  }, [])

  return(
    <View style={styles.container}>
      <Text>Hello! There</Text>
      <Text>Model Loaded Status:{String(modelLoaded)}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  }
})