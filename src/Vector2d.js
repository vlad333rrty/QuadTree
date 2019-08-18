'use strict';

/**
 * Constructor receives either vector or two numbers.
 * If no parameters were passed, fields would be initialized
 * with zeroes
 */
class Vector2d{
    /**
     * @param {Vector2d,Number,undefined} vector2d_or_x
     * @param {Number,undefined} y
     */
    constructor(vector2d_or_x=undefined,y=undefined){
        if (arguments.length===0){
            this.y=this.x=0;
        }else {
            this.set(vector2d_or_x,y);
        }
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Vector2d,Number,undefined} y_or_res
     * @param {Vector2d ,undefined} res
     * Method can receive either vector or two numbers.
     * In both cases passing vector-"container" as last
     * parameter is possible, in this case vector-"container"
     * will be returned and the vector which method was called
     * will remain the same.
     */
    add(vector2d_or_x,y_or_res=undefined,res=undefined){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x+=vector2d_or_x.x;
                this.y+=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.add(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x+=vector2d_or_x;
                this.y+=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.add(vector2d_or_x,y_or_res);
            }
        }
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Vector2d,Number,undefined} y_or_res
     * @param {Vector2d ,undefined} res
     * Method can receive either vector or two numbers.
     * In both cases passing vector-"container" as a last
     * parameter is possible, in this case vector-"container"
     * will be returned and the vector which method was called
     * will remain the same.
     */
    sub(vector2d_or_x,y_or_res=undefined,res=undefined){
        if (vector2d_or_x instanceof Vector2d){
            if (y_or_res===undefined){
                this.x-=vector2d_or_x.x;
                this.y-=vector2d_or_x.y;
                return this;
            }
            if (y_or_res instanceof Vector2d){
                y_or_res.set(this.x,this.y);
                return y_or_res.sub(vector2d_or_x);
            }
        }
        if (Number.isFinite(vector2d_or_x) && Number.isFinite(y_or_res)){
            if (res===undefined){
                this.x-=vector2d_or_x;
                this.y-=y_or_res;
                return this;
            }
            if (res instanceof Vector2d){
                res.set(this.x,this.y);
                return res.sub(vector2d_or_x,y_or_res);
            }
        }
    }

    /**
     * @param {Number} number
     * @param {Vector2d ,undefined} res
     * Multiplication by number.
     * Method can receive vector-"container" as a last
     * parameter. If vector-"container" was passed,
     * it would be returned as a result and the vector
     * which method was called would remain the same.
     */
    mul(number,res=undefined){
        if (res===undefined){
            this.x*=number;
            this.y*=number;
            return this;
        }
        if (res instanceof Vector2d){
            res.set(this.x,this.y);
            return res.mul(number);
        }
    }

    /**
     * @param {Vector2d,Number} vector2d_or_x
     * @param {Number,undefined} y
     * Receives either vector or two numbers
     */
    set(vector2d_or_x,y=undefined){
        if (y===undefined){
            this.x=vector2d_or_x.x;
            this.y=vector2d_or_x.y;
        }else {
            this.x=vector2d_or_x;
            this.y=y;
        }
    }


    /**
     * @param {Vector2d} vector2d
     */
    dotProduct(vector2d){
        return this.x*vector2d.x+this.y*vector2d.y;
    }


    lengthSquared(){
        return this.x*this.x+this.y*this.y;
    }


    length(){
        return Math.sqrt(this.lengthSquared());
    }

    /**
     * Normalizes the vector
     */
    normalize(){
        return this.mul(1.0/this.length());
    }

    /**
     * @param {Vector2d} vector_to_project_on
     * Receives a vector to project on
     */
    vectorProjection(vector_to_project_on){
        return this.dotProduct(vector_to_project_on.normalize());
    }

    /**
     * Returns new vector orthogonal to this
     */
    normal(){
        return new Vector2d(-this.y,this.x);
    }
}