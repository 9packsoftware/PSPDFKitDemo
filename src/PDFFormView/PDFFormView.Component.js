import React from 'react'

 import {
   View,
   Button
 } from 'react-native';
 import { containerStyle, saveButtonStyle, pdfViewStyle } from './PDFFormView.style'
 import { PDFFormViewServices, FORM_PATH_IN_DOCUMENTS } from './PDFFormView.Services.js';

 import PSPDFKitView from 'react-native-pspdfkit';
 
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
 
   componentDidMount = () =>(async () =>
        await PDFFormViewServices.loadFormTemplate(this)
    )()
   
   render = () => {
     const self = this;
     const onSaveButtonClickProxy = (event) => PDFFormViewServices.onSaveFormRequest(self);
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
 
 
 