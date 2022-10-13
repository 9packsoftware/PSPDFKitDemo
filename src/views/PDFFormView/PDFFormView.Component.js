import React from 'react'

 import {
   View,
   Button
 } from 'react-native';
 import { containerStyle, saveButtonStyle, pdfViewStyle } from './PDFFormView.style'
 import { PDFFormViewServices, FORM_PATH_IN_DOCUMENTS } from './PDFFormView.Services';
 import PSPDFKitView from 'react-native-pspdfkit';
 
 const configuration = {
   showThumbnailBar: 'scrollable',
   pageTransition: 'scrollContinuous',
   scrollDirection: 'vertical',
   disableAutomaticSaving: true
 };
 
 export class PDFFormView extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       templateLoaded: false
     };
   }
 
   componentDidMount = () =>(async () =>
        await PDFFormViewServices.loadFormTemplate(this)
    )()
   
  onPress = () => {
    const self = this;
    (async () => {
      try {
        await PDFFormViewServices.saveForm(self);
        alert("❤️ Saved! ❤️");
      }catch(error) {
        alert(`💀 ${error.toString()} 💀`)
      }
    })()
  }

   render = () => {
     const self = this;    
     
     return (
      this.state.templateLoaded ? 
       (
         <View style={containerStyle}>
           <Button style={saveButtonStyle} title='Save' onPress={() => this.onPress()} />
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
 
 
 