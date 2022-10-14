import RNFS from "react-native-fs";

const metaDataSuffix = ".metadata.json";

export const FileIOServices = {
    
    uploadFile: async (url, filepath, filename, filetype, metadata) => {      
      try {
        
        const metaDataFileName = filename + metaDataSuffix;
        const metaDataFilePath = filepath + metaDataSuffix;
        await RNFS.writeFile(metaDataFilePath, JSON.stringify(metadata), 'utf8')
        const response = (async () => (await RNFS.uploadFiles({
          toUrl: url,
          files: [
            {
              name: metaDataFileName,
              filename: metaDataFileName,
              filepath: metaDataFilePath,
              filetype: "application/json"
            },            
          {
            name: filename,
            filename: filename,
            filepath: filepath,
            filetype: filetype
          }],
          method: 'POST',
          headers: {
            'Accept': 'text/plain',
          },
        }).promise)) ();
        
        
      }catch(exception) {
        throw exception;        
      }
      
    }      
}