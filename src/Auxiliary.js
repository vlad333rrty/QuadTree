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

const pseudoDotProduct=(A,B,C)=>{
    return (B.x-A.x)*(C.y-A.y)-(B.y-A.y)*(C.x-A.x)
}