var context;
var x=[250, 100, 50, 75, 200];
var y=[50, 100, 60, 15, 200];
var dx=[20, 15, 5, 10,10];
var dy=[21, 10, 5, 20, 10];
var radius=[20, 10, 15, 5];
var style=["#0000ff","#ff0000","#00ff00", "0f00f0"]

var min_x = 0;
var min_y = 0;
var max_x = 500;
var max_y = 500;

function init()
{
  //context= myCanvas.getContext('2d');
  //setInterval(draw,100);
  initpictures();
  setInterval(drawpictures,100);
}

var divs=[document.createElement('div'),document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
var ids=["pencil","book", "typewriter","paper", "quill"];
var divx=[250, 100, 50, 75, 200];
var divy=[50, 100, 60, 15, 200];
var divdx=[20, 15, 5, 10, 10];
var divdy=[21, 10, 10, 20, 10];
var box=[70, 60, 80, 50, 70];

function initpictures () {
    for (i=0;i<ids.length;i++){
        divs[i].id = ids[i];
        divs[i].style.position = 'absolute';
        divs[i].style.left = divx[i].toString() + 'px';
        divs[i].style.top = divy[i].toString() + 'px';
        divs[i].style.width = box[i].toString() + 'px';
        divs[i].style.height = box[i].toString() + 'px';
        //myLayer.style.padding = '10px';
        //myLayer.style.background = '#00ff00';
        divs[i].innerHTML = '<img src="' + ids[i] + '.png" />';
        document.body.appendChild(divs[i]);
    }
}

function setIds(IDs) {
    ids=[]
    for (i=0;i<IDs.length;i++) {
        ids.push(IDs[i]);
    }
    for (i=0;i<divs.length;i) {
        divs[i].innerHTML = '<img src="' + ids[i] + '.png" />';
    }
}


function drawpictures() {

    for (i=0;i<divs.length;i++){
        document.body.removeChild(divs[i]);
    }

  for (i=0;i<divs.length;i++){
        if( divx[i] < 0 || divx[i]+box[i]>window.innerWidth ) divdx[i]=-divdx[i]; 
        if( divy[i] < 0 || divy[i]+box[i]>window.innerHeight ) divdy[i]=-divdy[i]; 
        divx[i]+=divdx[i]; 
        divy[i]+=divdy[i];
        divs[i].style.left = divx[i].toString() + 'px';
        divs[i].style.top = divy[i].toString() + 'px';

   }

   for (i=0;i<divs.length;i++) {
       for(j=i+1;j<divs.length;j++) {
           var xh = (divx[i] + (box[i]/2)) - (divx[j] + box[j]/2);
           var yh = (divy[i] + (box[i]/2)) - (divy[j] + box[j]/2);
           var yh2 = yh * yh;
           var xh2 = xh * xh;

           var distance = ((box[i]/2)* (box[i]/2)) + ((box[j]/2) * (box[j]/2));
           if (distance > yh2 + xh2) {
               var differencex = divdx[i] - divdx[j];
               var differencey = divdy[i] - divdy[j];
               divdx[i] = divdx[i] - differencex;
               divdy[i] = divdy[i] - differencey;

               divdx[j] = divdx[j] + differencex;
               divdy[j] = divdy[j] + differencey;

           }

       }
   }

    for (i=0;i<divs.length;i++){
        document.body.appendChild(divs[i]);
    }
}
/*
var myLayer = document.createElement('div');
myLayer.id = 'bookingLayer';
myLayer.style.position = 'absolute';
myLayer.style.left = '10px';
myLayer.style.top = '10px';
myLayer.style.width = '50px';
myLayer.style.height = '50px';
//myLayer.style.padding = '10px';
//myLayer.style.background = '#00ff00';
myLayer.innerHTML = '<img src="pencil.png" />';
document.body.appendChild(myLayer);
*/
function draw()
{
  context.clearRect(min_x,min_y, max_x,max_y);
  context.beginPath();
  context.fillStyle="#0000ff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  for (i=0;i<x.length;i++){
    context.arc(x[i],y[i],radius[i],0,Math.PI*2,true);
  }
  context.fillStyle=style[0];
  context.closePath();
  context.fill();
  // Boundary Logic
  for (i=0;i<x.length;i++){
        if( x[i]-radius[i]<min_x - 20 || x[i]+radius[i]>max_x + 20 ) dx[i]=-dx[i]; 
        if( y[i]-radius[i]<min_y - 20 || y[i]+radius[i] > max_y + 20 ) dy[i]=-dy[i]; 
        x[i]+=dx[i]; 
        y[i]+=dy[i];
   }

   for (i=0;i<x.length;i++) {
       for(j=i+1;j<x.length;j++) {
           var xh = x[i] - x[j];
           var yh = y[i] - y[j];
           var yh2 = yh * yh;
           var xh2 = xh * xh;

           var distance = (radius[i]* radius[i]) + (radius[j] * radius[j]);
           if (distance > yh2 + xh2) {
               var differencex = dx[i] - dx[j];
               var differencey = dy[i] - dy[j];
               dx[i] = dx[i] - differencex;
               dy[i] = dy[i] - differencey;

               dx[j] = dx[j] + differencex;
               dy[j] = dy[j] + differencey;

           }

       }
   }

}

