'use strict'

let mouse={
    isLeftClicked:false,
    isRightClicked:false,
    clickPosition:new Vector2d(),
    currentPosition:new Vector2d()
};

const mouseListener=(mouse)=>{
    const mouseHandler=(event)=>{
        const state=event.type==='mousedown';
        if (event.which===1){
            mouse.isLeftClicked=state;
        }
        if (event.which===3){
            mouse.isRightClicked=state;
        }
        if (state){
            mouse.clickPosition.set(event.clientX,event.clientY);
        }
    };

    const getPos=(event)=>{
        mouse.currentPosition.set(event.clientX,event.clientY)
    }
    addEventListener('mousedown',mouseHandler);
    addEventListener('mouseup',mouseHandler);
    addEventListener('mousemove',getPos);
};

mouseListener(mouse);

