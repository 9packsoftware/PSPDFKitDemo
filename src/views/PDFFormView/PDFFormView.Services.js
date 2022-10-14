import RNFS from "react-native-fs";
import { FORM_REPOSITORY_URL } from './environment'; //TODO Replace with your actual @env module
import { FileIOServices } from '../../services';

const BASE_FILE_NAME = "work-order-form"
const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
export const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;

const extractFormFields = async (pdfView) => {
  const response = await pdfView.getAnnotations(0, 'all');  
  const annotations = response.annotations;
  const form = {};  
  

  for(let i = 0; i < annotations.length; i++) {
    const formFieldName = annotations[i].formFieldName;
    const formFieldValue =  await pdfView.getFormFieldValue(formFieldName)
    
    
    if(formFieldValue.value) {
      console.log(formFieldName, formFieldValue.value)
      form[formFieldName] =  formFieldValue.value;
    }    
  }
  
  return form;
}


export const PDFFormViewServices = {
    loadFormTemplate: async (self) => {
        await RNFS.copyFileAssets(FORM_TEMPLATE_FILE_NAME, FORM_PATH_IN_DOCUMENTS);  
        self.setState({templateLoaded: true});
    },
    
    saveForm: async (self) => {
      self.setState({templateLoaded: true});
      await self.refs.pdfView.saveCurrentDocument();
      const metadata = await extractFormFields(self.refs.pdfView);
      
      const filepath = FORM_PATH_IN_DOCUMENTS;
      const filename = FORM_TEMPLATE_FILE_NAME;
      const filetype = "application/pdf";      
      FileIOServices.uploadFile(`${FORM_REPOSITORY_URL}/documents`, filepath, filename, filetype, metadata)      
    }      
}