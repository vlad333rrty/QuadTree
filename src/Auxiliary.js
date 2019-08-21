'use strict'
/**
 *
 * @param {Polygon,Circle} object
 * @return {boolean}
 */
Array.prototype.remove=function (object) {
    let i
    for (i=0;i<this.length;i++)
        if (this[i]===object) break
    if (i<this.length){
        this.splice(i,1)
        return true
    }
}