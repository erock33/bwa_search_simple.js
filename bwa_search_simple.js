
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

    index.txt = text + '!';
    index.suffixarray = suffixArray(index.txt);

    // Construct BWT array, C and C_ord
    index.bwtarray = index.suffixarray.slice(0);
    index.c = [];
    index.c_ord = {};
    index.ranks = [];
    for(var i=0; i < index.bwtarray.length; i++){

        // Construct C and C_ord
        var f_char = index.txt.charAt(index.bwtarray[i]);

        // Add to C if there is nothing in it, or
        // if we have reached a new first character in the
        // suffix array.
        if(index.c.length == 0 ||
            index.txt.charAt(index.bwtarray[i-1]) != f_char){
            index.c.push(i);
            index.c_ord[f_char] = index.c.length - 1;
        }

        var l_char = (index.bwtarray[i] == 0) ?
            index.txt.charAt(index.txt.length - 1) : 
            index.txt.charAt(index.bwtarray[i]-1);
        
        var rank = {};
        if( i > 0 ){
            rank = Object.create(
                index.ranks[ index.ranks.length -1]);
        } 
        if(l_char in rank){
            rank[l_char]++;
        } else {
            rank[l_char] = 1;
        }
        index.ranks.push(rank);
    }

    return index;
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
    var start = null;
    var end = null;
    var rank_start = null;
    var rank_end = null;


    var chr = str.substring(str.length - 1, str.length);
    var chr_ord = index.c_ord[chr];
    start = index.c[chr_ord] + 1;
    end = (chr_ord == index.c.length - 1) ?
        index.bwtarray.length : index.c[ chr_ord+1 ];

    for(var i=0; i < str.length -1; i++){
        var next_chr = str.substring(str.length-i-2, 
            str.length-i-1);
        rank_start = (isNaN(index.ranks[start-2][next_chr])) ? 
            0 : index.ranks[start-2][next_chr];

        rank_end = (isNaN(index.ranks[end-1][next_chr])) ?
            0 : index.ranks[end-1][next_chr];

        start = index.c[ index.c_ord[next_chr] ] + 
            rank_start + 1;
        end = index.c[ index.c_ord[next_chr] ] +
            rank_end;
    }
    return [start-1, end-1];
}