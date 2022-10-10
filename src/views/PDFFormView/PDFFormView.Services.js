import RNFS from "react-native-fs";

const BASE_FILE_NAME = "work-order-form"
export const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
export const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;

export const PDFFormViewServices = {
    loadFormTemplate: async (self) => {
        const exists = await RNFS.exists(FORM_PATH_IN_DOCUMENTS);
        if (!exists){
          await RNFS.copyFileAssets(FORM_TEMPLATE_FILE_NAME, FORM_PATH_IN_DOCUMENTS);  
        }     
        self.setState({templateLoaded: true});
    },

    onSaveFormRequest: (self) => {
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
}