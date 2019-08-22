'use strict';
let q=new QuadTree(new Bound(0,0,canvas.width-100,canvas.height-100),3);

let array=[];
let c=new Circle(new Vector2d(100,230),56);
array.push(new Circle(new Vector2d(20,320),10));
array.push(new Circle(new Vector2d(30,30),20));
array.push(new Circle(new Vector2d(304,330),40));
array.push(new Circle(new Vector2d(100,430),22));
array.push(new Circle(new Vector2d(759,20),19));
array.push(c);
array.push(new Polygon([
    new Vector2d(50,50),
    new Vector2d(75,25),
    new Vector2d(100,50),
    new Vector2d(75,75),
]))
const triangle=new Polygon([
    new Vector2d(150,250),
    new Vector2d(250,250),
    new Vector2d(200,150)
])

array.push(triangle)
for (const a of array){
    q.add(a);
}
q.draw();



const render=()=>{
    if (mouse.isLeftClicked){
        if (buttons.deleteIsPressed) {
            const t=q.getElementByClick(mouse.currentPosition)
            if (t!==undefined)
                q.delete(t)
        }else if (mouse.currentPosition.x<q.bounds.width && mouse.currentPosition.y<q.bounds.height && buttons.addIsPressed)
         q.add(new Circle(new Vector2d(mouse.currentPosition),10))
    }
    context.clearRect(0,0,canvas.width,canvas.height)
    q.draw()
    requestAnimationFrame(render)
}
render()