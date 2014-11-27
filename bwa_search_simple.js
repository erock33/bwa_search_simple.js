
var BWIndex = function(){
    this.txt = null;
    this.bwtarray = null;
    this.suffixarray = null;
    this.ranks = null;
    this.c = null;
    this.c_ord = null;
}

/**
 * Given a string, create and return an index object
 * @param {string} text This is the text to index
 * @return {object} This is an index object that can be used to
 *     search the text.
 */
function createBWIndex(text){
    var index = new BWIndex();

    index.txt = text;
    index.suffixarray = suffixArray(text);

    index.bwtarray = [];
    index.c = [];
    index.c_ord = {};
}

/**
 * Given an index object and search string, find all locations
 * where that string exists in the text.
 * @param {object} index This is an index object with the
 *     necessary information to quickly search the text
 * @param {string} str This is the string to search for in 
 *     the text
 * @return {array} This is an array of all locations that str
 *     appears in the text
 */
function findLocations(index, str){

}