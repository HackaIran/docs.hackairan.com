/* Extract hashtags text from string as an array */
function getHashTags(inputText) {  
    var regex = /#([A-z]|_|[\u0600-\u06FF])+/gm;
    var matches = [];

    matches =  inputText.match(regex);

    console.log(matches);
    // if(){

    //     matches = matches.map(item => item.slice(1, item.length))

    //     return matches;

    // }else{
    //     return [];
    // }

    
}

module.exports = getHashTags;  