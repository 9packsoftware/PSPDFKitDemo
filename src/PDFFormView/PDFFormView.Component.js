import React from 'react'

import {PDFFormViewServices} from './PDFFormView.Services.js';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import {
   View,
   Button
 } from 'react-native';
 import { containerStyle, saveButtonStyle, pdfViewStyle } from './PDFFormView.style'
 import PSPDFKitView from 'react-native-pspdfkit';
 import RNFS from "react-native-fs";
 
 const BASE_FILE_NAME = "work-order-form"
 const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
 const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;
 
 const onSaveButtonClick = (self, event) => {
   self.refs.pdfView
   .saveCurrentDocument()
   .then(saved => {
     if (saved) {
       alert('Successfully saved current document.');
     } else {
       alert('Document was not saved as it was not modified.');
     }
   })
   .catch(error => {
     alert(JSON.stringify(error));
   });
 }
 
 const copyFormToDocuments = async () => {
     const exists = await RNFS.exists(FORM_PATH_IN_DOCUMENTS);
     if (!exists){
       await RNFS.copyFileAssets(FORM_TEMPLATE_FILE_NAME, FORM_PATH_IN_DOCUMENTS);  
     }  
 };
 
 const configuration = {
   showThumbnailBar: 'scrollable',
   pageTransition: 'scrollContinuous',
   scrollDirection: 'vertical',
   disableAutomaticSaving: true
 };
 
 export class PDFFormViewComponent extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       templateLoaded: false
     };
   }
 
   componentDidMount() {
     (async (self) => {
       copyFormToDocuments();
       self.setState({templateLoaded: true});
     })(this)
   }
 
   render() {
     const self = this;
     const onSaveButtonClickProxy = (event) => onSaveButtonClick(self, event);
     const templateLoaded = this.state.templateLoaded
     return (
       templateLoaded ? 
       (
         <View style={containerStyle}>
           <Button style={saveButtonStyle} title='Save' onPress={onSaveButtonClickProxy} />
           <PSPDFKitView
             ref="pdfView"
             document={FORM_PATH_IN_DOCUMENTS}
             configuration={configuration}
             fragmentTag="PDF1"
             style={pdfViewStyle}
           />
         </View>
       )
       : (
         <></>
       )
     );
   };
 }
 
 
 