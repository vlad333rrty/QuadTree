'use strict';

class QuadTree{
    constructor(bounds,capacity){
        this.bounds=bounds;
        this.next=new Array(4).fill(null);
        this.objects=[];
        this.capacity=capacity||4;
    }

    divide(){
        const halfHeight=~~this.bounds.height/2;
        const halfWidth=~~this.bounds.width/2;

        this.next[0]=new QuadTree(new Bound(this.bounds.x+halfWidth,this.bounds.y,halfWidth,halfHeight),this.capacity);
        this.next[1]=new QuadTree(new Bound(this.bounds.x,this.bounds.y,halfWidth,halfHeight),this.capacity);
        this.next[2]=new QuadTree(new Bound(this.bounds.x,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity);
        this.next[3]=new QuadTree(new Bound(this.bounds.x+halfWidth,this.bounds.y+halfHeight,halfWidth,halfHeight),this.capacity);
    }

    /**
     * @param {Polygon,Circle} object
     * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
     */
    getEstimation(object){
        const minMaxY=object.getMinMax('y');
        const minMaxX=object.getMinMax('x');

        const xCentre=this.bounds.x+(~~this.bounds.width/2);
        const yCentre=this.bounds.y+(~~this.bounds.height/2);
        return{
            right:minMaxX.min>xCentre,
            left:minMaxX.max<xCentre,
            up:minMaxY.max<yCentre,
            down:minMaxY.min>yCentre
        }
    }

    /**
     * @param {Polygon,Circle} object
     */
    getIndex(object){
        let index;

        const estimation=this.getEstimation(object);

        if (estimation.right){
            if (estimation.up){
                index=0;
            }
            if (estimation.down){
                index=3;
            }
        }else if (estimation.left){
            if (estimation.up){
                index=1;
            }
            if (estimation.down){
                index=2;
            }
        }
        return {
            index:index,
            estimation:estimation
        };
    }

    /**
     * @param {Polygon,Circle} object
     */
    add(object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index.index!==undefined){
                this.next[index.index].add(object);
            }
            else this.objects.push(object);
        }else {
            this.objects.push(object);
            if (this.objects.length>this.capacity){
                this.divide();
                for (let i=0;i<this.objects.length;){
                    const index=this.getIndex(this.objects[i]);
                    if (index.index!==undefined){
                        this.next[index.index].add(this.objects.splice(i,1)[0]);
                    }else {
                        i++;
                    }
                }
            }
        }
    }

    static getIndexes(estimation){
        if (!estimation.up && !estimation.down){
            if (!estimation.right && !estimation.left){
                return [0,1,2,3]
            }
            if (estimation.right) return [0,3]
            if (estimation.left) return [1,2]
        }else if (!estimation.right && !estimation.left){
            if (estimation.up) return [0,1]
            if (estimation.down) return [2,3]
        }
        return [0,1,2,3]
    }

    /**
     * @param {[]} objects
     * @param {Polygon,Circle} object
     */
    retrieve(objects,object){
        if (this.next[0]!=null){
            const index=this.getIndex(object);
            if (index.index!==undefined){
                this.next[index.index].retrieve(objects,object);
            }else {
                const indices=QuadTree.getIndexes(index.estimation)
                for (let i of indices){
                    this.next[i].retrieve(objects,object);
                }
            }
        }
        [].push.apply(objects,this.objects);
        return objects;
    }

    clear(){
        this.objects=[];
        for (let i=0;i<4;i++){
            if (this.next[i]!=null){
                this.next[i].clear();
                this.next[i]=null;
            }
        }
    }

    draw(){
        context.strokeRect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height);
        for (let o of this.objects) {
            if (o instanceof Circle) {
                context.strokeStyle='blue';
                context.beginPath();
                context.arc(o.centre.x, o.centre.y, o.radius, 0, Math.PI * 2, false);
            }else if (o instanceof Polygon){
                context.strokeStyle=colour.get(o.vertices.length)||'purple';
                context.beginPath();
                context.moveTo(o.vertices[0].x,o.vertices[0].y);
                for (let i=1;i<o.vertices.length;i++) {
                    context.lineTo(o.vertices[i].x, o.vertices[i].y);
                }
                context.lineTo(o.vertices[0].x, o.vertices[0].y);
                context.closePath();
            }
            context.stroke();
            context.strokeStyle='black';
        }
        if (this.next[0]!=null){
            for (let i=0;i<4;i++)
                this.next[i].draw();
        }
    }
}





