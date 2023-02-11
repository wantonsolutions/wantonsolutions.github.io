// Make the DIV element draggable:

// shapes = ["blue_d", "blue_l", "blue_m", "blue_s", "blue_tl", "green_l", "green_u", "magenta_t", "red_m", "red_s", "red_square", "teal_l", "teal_z", "yellow_d", "yellow_light"];
shapes = [
  "blue_s", 
  "blue_tl", 
  "green_l", 
  "green_u", 
  "magenta_t", 
  "red_m", 
  "red_s", 
  "red_square", 
  "teal_l", 
  "teal_z", 
  "yellow_d"]

// coords ={
//   "red_square":[0,0], 
//   "green_l": [2,0], 
//   "teal_l": [3, 0], 
//   "red_s": [6,0], 
//   "blue_s", 
//   "blue_tl", 
//   "green_u", 
//   "magenta_t", 
//   "red_m", 
//   "teal_z", 
//   "yellow_d"
// }


for (i = 0; i < shapes.length; i++) {
  dragElement(document.getElementById(shapes[i]));
  scatterElement(document.getElementById(shapes[i]));
}

function scatterElement(elmnt) {
  x1 = 400;
  x2 = 1200;
  y1 = 100;
  y2 = 500
  elmnt.style.top =  y1 + (Math.random() * (y2 - y1)) + "px";
  elmnt.style.left =  x1 + (Math.random() * (x2 - x1)) + "px";
  // elmnt.style.top =  top_start + (Math.random() * (screen.height - top_start)) + "px";
  // elmnt.style.left =  left_start + (Math.random() * (screen.width - left_start)) + "px";
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // console.log(elmnt.style.left + "," + elmnt.style.top)
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    first_box = document.getElementById("first_box");
    box_size = first_box.offsetWidth;
    baseline_y = first_box.offsetTop % box_size;
    baseline_x = first_box.offsetLeft % box_size;
    console.log("Before: " +elmnt.style.left + "," + elmnt.style.top);
    // console.log(elmnt.style.top)
    // console.log(elmnt.offsetTop - pos2)
    ysnap = (elmnt.offsetTop - pos2) % box_size;
    xsnap = (elmnt.offsetLeft - pos1) % box_size;
    elmnt.style.top = ((elmnt.offsetTop - pos2) - ysnap) + baseline_y +  "px";
    elmnt.style.left = ((elmnt.offsetLeft - pos1) - xsnap) + baseline_x + "px";

    // console.log("After: " + elmnt.style.left + "," + elmnt.style.top);

    document.onmouseup = null;
    document.onmousemove = null;

    check_complete();
  }

  function check_complete() {
    console.log("Checking complete");
    // for 
    //  = document.getElementById("first_box");
  }
}