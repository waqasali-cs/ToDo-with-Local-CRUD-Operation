const apiRequest = async (url, optionsObj, errMsg) => { 
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) {
            throw Error('reload the app');
        }
    } catch (err) {
        errMsg=err.message;
    } finally{
        return errMsg;
        };
}
 export default apiRequest;