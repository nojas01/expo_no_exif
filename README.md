# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

open the app on a device
press the take photo button
take a photo
 - the console will log the exif data with the additionalExif included. something like:
```
// Note the second key is the additional exif added to the camera options
{"SubSecTimeDigitized":"315","UserComment":"This is a valid exif field","ApertureValue":1.69,"ImageLength":3024,"LightSource":0,"ColorSpace":1,"Flash":2,"YCbCrPositioning":1,"Orientation":6,"ResolutionUnit":2,"FocalLengthIn35mmFilm":26,"SubSecTime":"315","MeteringMode":2,"DateTimeDigitized":"2024:05:16 10:52:38","ExposureProgram":2,"SceneCaptureType":0,"WhiteBalance":0,"ComponentsConfiguration":"???","Make":"samsung","DateTimeOriginal":"2024:05:16 10:52:38","ExposureTime":0.02,"SubSecTimeOriginal":"315","YResolution":72,"ImageWidth":4032,"ExifVersion":"0220","FNumber":1.8,"Model":"SM-G991B","MaxApertureValue":1.8,"ISOSpeedRatings":80,"FocalLength":5.4,"XResolution":72,"Software":"G991BXXSAFXCL","DateTime":"2024:05:16 10:52:38","ImageUniqueID":"R12LLMF00SM R12LLMF00SM?"}
```

then manipulateAsync does its think and we create an assest to retrieve the exif data from the formatted photo and it will log something like
```
// Note the absence of most data
{"LightSource":0,"ImageLength":0,"Orientation":0,"ImageWidth":0}
```
