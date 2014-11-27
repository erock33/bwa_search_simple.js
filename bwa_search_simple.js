
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
    index.suffixarray = suffixArray(text + '!');

    // Construct BWT array, C and C_ord
    index.bwtarray = [];
    index.c = [];
    index.c_ord = {};
    for(var i=0; i < index.suffixarray.length; i++){

        // Construct BWT array
        if(index.suffixarray[i] == 0){
            index.bwtarray.push(index.suffixarray.length -1);
        } else {
            index.bwtarray.push(index.suffixarray[i] - 1);
        }

        // Construct C and C_ord
        var f_char = text.charAt(index.suffixarray[i]);

        // Add to C if there is nothing in it, or
        // if we have reached a new first character in the
        // suffix array.
        if(index.c.length == 0 ||
            text.charAt(index.suffixarray[i-1]) != f_char){
            index.c.push(i);
            index.c_ord['f_char'] = index.c.length - 1;
        }
    }
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