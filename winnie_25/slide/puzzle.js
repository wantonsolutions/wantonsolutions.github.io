
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

//var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
//var imgOrder = ["1", "3", "2", "4", "5", "6", "7", "8", "9"];
// var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var imgOrder = ["3", "1", "7", "4", "0", "5", "6", "8", "2"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            document.onkeydown = checkKey;

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("2.png")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

    win();

}

function check_win() {
    var ids = ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-0", "2-1", "2-2"];
    var pngs = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    for (var i =0; i < ids.length; i++) {
        if (document.getElementById(ids[i]).src.includes(pngs[i] + ".png")){
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}

function win() {
    if(check_win()){
        window.alert("CONGRATULATIONS You win!");
    }
}


function get_element_by_src(source_string){
    var ids = ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-0", "2-1", "2-2"];
    for (var i =0; i < ids.length; i++) {
        if (document.getElementById(ids[i]).src.includes(source_string)){
            elem = document.getElementById(ids[i]);
            return elem;
        }
    }
}



function checkKey(e) {

    e = e || window.event;

    empty_piece = get_element_by_src("2.png")
    console.log(empty_piece.id)

    let currCoords = empty_piece.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);
    pressed=false;


    if (e.keyCode == '38' || e.keyCode == '87') {
        console.log("up");
        r2=r1+1
        c2=c1
        pressed=true;
    }
    else if (e.keyCode == '40' || e.keyCode == '83') {
        console.log("down");
        r2=r1-1
        c2=c1
        pressed=true;
        // down arrow
    }
    else if (e.keyCode == '37' || e.keyCode == '65') {
        console.log("left");
        r2=r1
        c2=c1+1
        pressed=true;
       // left arrow
    }
    else if (e.keyCode == '39' || e.keyCode == '68') {
        console.log("right");
        r2=r1
        c2=c1-1
        pressed=true;
       // right arrow
    }

    if (pressed){
        move_id = r2.toString() + "-" + c2.toString();
        console.log(move_id);
        mover=document.getElementById(move_id);
        if ( mover!=null){
            let currImg = empty_piece.src;
            let otherImg = mover.src;

            empty_piece.src = otherImg;
            mover.src = currImg;

            turns += 1;
            document.getElementById("turns").innerText = turns;
        }
            //do the move
        console.log(mover);
        console.log("Calculating move")
    }

    win();


}