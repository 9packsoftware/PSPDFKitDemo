import RNFS from "react-native-fs";
export const FileIOServices = {
    
    uploadFile: async (url, filepath, filename, filetype) => {      
      try {
        const response = await RNFS.uploadFiles({
          toUrl: url,
          files: [{
            name: filename,
            filename: filename,
            filepath: filepath,
            filetype: filetype
          }],
          method: 'POST',
          headers: {
            'Accept': 'text/plain',
          },
        }).promise;

        
      }catch(exception) {
        throw exception;        
      }
      
    }      
}