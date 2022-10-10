/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   View,
   Button
 } from 'react-native';
 import { containerStyle, saveButtonStyle, pdfViewStyle} from './App.style' 
 import PSPDFKitView from 'react-native-pspdfkit';
 
 const DOCUMENT = Platform.OS === 'ios' ? 'work-order-form.pdf' : 'file:///android_asset/work-order-form.pdf';
 
 const onSaveButtonClick = (event) => {

 }
 
 const App = () => {
   const configuration = {
     showThumbnailBar: 'scrollable',
     pageTransition: 'scrollContinuous',
     scrollDirection: 'vertical',
   };
 
   return (
     <View style={containerStyle}>
       <Button style={saveButtonStyle} title='Save' />
       <PSPDFKitView
         document={DOCUMENT}
         configuration={configuration}
         fragmentTag="PDF1"
         style={pdfViewStyle}
       />
     </View>
       
 
   );
 };
 

 export default App;
 