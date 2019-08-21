'use strict';
let canvas=document.getElementById('canvas');
let context=canvas.getContext('2d');
let deleteButton=document.getElementById('delete')
let addButton=document.getElementById('add')

const colour=new Map();
colour.set(4,'red');
colour.set(3,'green');
