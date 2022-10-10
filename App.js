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
import { containerStyle, saveButtonStyle, pdfViewStyle } from './App.style'
import PSPDFKitView from 'react-native-pspdfkit';
import RNFS from "react-native-fs";

const BASE_FILE_NAME = "work-order-form"
const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
const DOCUMENT_FILE_NAME = `${BASE_FILE_NAME}-filled.pdf`
const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;
const DOCUMENT_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + DOCUMENT_FILE_NAME;

const onSaveButtonClick = (self, event) => {
  console.log(DOCUMENT_PATH_IN_DOCUMENTS)

}

const copyFormToDocuments = async () => {
  //REMARKS:  FORM_TEMPLATE_FILE_NAME == `file:///android_asset/${FORM_TEMPLATE_FILE_NAME}`;
  await RNFS.copyFileAssets(FORM_TEMPLATE_FILE_NAME, FORM_PATH_IN_DOCUMENTS);  
};

const configuration = {
  showThumbnailBar: 'scrollable',
  pageTransition: 'scrollContinuous',
  scrollDirection: 'vertical',
  disableAutomaticSaving: true
};

export class App extends React.Component {
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

export default App;
