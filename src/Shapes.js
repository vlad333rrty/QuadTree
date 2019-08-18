'use strict';

class Bound{
    constructor(a,b,width,height){
        this.x=a;
        this.y=b;
        this.width=width;
        this.height=height;
    }
}

class Polygon{
    /**
     * @param {Vector2d[]} vertices
     */
    constructor(vertices){
        if (vertices.length<2) {
            alert('Invalid number of vertices!')
            throw 'Invalid number of vertices!'
        }
        this.vertices=vertices;
    }

    getMinMax(x_or_y){
        let min,max;
        min=max=this.vertices[0][x_or_y];
        for (let i=1;i<this.vertices.length;i++){
            if (this.vertices[i][x_or_y]>max){
                max=this.vertices[i][x_or_y]
            }
            if (this.vertices[i][x_or_y]<min){
                min=this.vertices[i][x_or_y];
            }
        }
        return {
            max:max,
            min:min
        }
    }
}

class Circle{
    /**
     * @param {Vector2d} centre
     * @param {Number} radius
     */
    constructor(centre,radius){
        this.centre=centre;
        this.radius=radius;
    }

    getMinMax(x_or_y){
        return {
            max:this.centre[x_or_y]+this.radius,
            min:this.centre[x_or_y]-this.radius
        }
    }
}

