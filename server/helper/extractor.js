/* Extract hashtags text from string as an array */
function getHashTags(inputText) {  
    var regex = /\s#([A-z]|_|[\u0600-\u06FF]|[0-9])+/gm;
    var matches = [];

    matches =  (' ' + inputText).match(regex);

    if(matches && matches.length > 0){
        matches = matches.map(item => item.split("#")[1]);
        let unique_array = []
        for(let i = 0;i < matches.length; i++){
            if(unique_array.indexOf(matches[i]) == -1){
                unique_array.push(matches[i])
            }
        }
        
        return unique_array;

    }else{
        return [];
    }

    
}

module.exports = getHashTags;  