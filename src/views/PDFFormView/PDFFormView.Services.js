import RNFS from "react-native-fs";
import { FORM_REPOSITORY_URL } from './environment'; //TODO Replace with your actual @env module
import { FileIOServices } from '../../services';

const BASE_FILE_NAME = "work-order-form"
const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
export const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;

export const PDFFormViewServices = {
    loadFormTemplate: async (self) => {
        const exists = await RNFS.exists(FORM_PATH_IN_DOCUMENTS);
        if (!exists){
          await RNFS.copyFileAssets(FORM_TEMPLATE_FILE_NAME, FORM_PATH_IN_DOCUMENTS);  
        }     
        self.setState({templateLoaded: true});
    },

    saveForm: async (self) => {
      await self.refs.pdfView.saveCurrentDocument();
      const filepath = FORM_PATH_IN_DOCUMENTS;
      const filename = FORM_TEMPLATE_FILE_NAME;
      const filetype = "application/pdf";
      FileIOServices.uploadFile(`${FORM_REPOSITORY_URL}/documents`, filepath, filename, filetype)      
    }      
}