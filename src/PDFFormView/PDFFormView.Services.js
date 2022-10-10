import RNFS from "react-native-fs";

const BASE_FILE_NAME = "work-order-form"
const FORM_TEMPLATE_FILE_NAME = `${BASE_FILE_NAME}.pdf`
const FORM_PATH_IN_DOCUMENTS = RNFS.DocumentDirectoryPath + FORM_TEMPLATE_FILE_NAME;

const PDFFormViewServices = {
    loadFormTemplate: async (self) => {
        copyFormToDocuments();
        self.setState({templateLoaded: true});
    }
}