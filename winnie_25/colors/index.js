// Make the DIV element draggable:
dragElement(document.getElementById("red_t_block"));
// dragElement(document.getElementById("yellow_light"));
// dragElement(document.getElementById("red_light"));
// dragElement(document.getElementById("green_light"));
// dragElement(document.getElementById("magenta_light"));
// dragElement(document.getElementById("blue_light"));
// dragElement(document.getElementById("teal_light"));


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
    // console.log("Before: " +elmnt.style.left + "," + elmnt.style.top);
    // console.log(elmnt.style.top)
    // console.log(elmnt.offsetTop - pos2)
    ysnap = (elmnt.offsetTop - pos2) % box_size;
    xsnap = (elmnt.offsetLeft - pos1) % box_size;
    elmnt.style.top = ((elmnt.offsetTop - pos2) - ysnap) + baseline_y +  "px";
    elmnt.style.left = ((elmnt.offsetLeft - pos1) - xsnap) + baseline_x + "px";

    // console.log("After: " + elmnt.style.left + "," + elmnt.style.top);

    document.onmouseup = null;
    document.onmousemove = null;
  }
}