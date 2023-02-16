
var rows;
var columns;

var source_dir; // = "sad_winnie_3x3"

var currTile;
var otherTile; //blank tile

var turns = 0;
var empty_tile;



function setup_puzzle() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = source_dir + "/" + imgOrder.shift() + ".png";
            document.onkeydown = checkKey;
            document.getElementById("board").append(tile);
        }
    }
}
function load_puzzle(directory, in_rows, in_columns, scramble){
    rows = in_rows;
    empty_tile=(rows-1).toString() + ".png"
    columns = in_columns;
    source_dir = directory;
    turns = 0;
    imgOrder=scramble;
    setup_puzzle();

}

function ids_from_dim(rows, columns) {
    var ids = [];
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
            ids.push(r.toString() + "-" + c.toString());
        }
    }
    return ids;
}

function pngs_from_dim(rows, columns) {
    var pngs = [];
    for (let i=0; i < rows * columns; i++) {
         pngs.push(i.toString());
    }
    return pngs;
}

function check_win() {
    var ids = ids_from_dim(rows, columns);
    var pngs = pngs_from_dim(rows, columns);
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
        window.alert("You Win! If only true happiness was this easy :) Solve one more riddle and then you can move on to the next level!");
        window.location.replace("../slide-password/index.html")
    }
}


function get_element_by_src(source_string){
    var ids = ids_from_dim(rows, columns);
    for (var i =0; i < ids.length; i++) {
        if (document.getElementById(ids[i]).src.includes(source_string)){
            elem = document.getElementById(ids[i]);
            return elem;
        }
    }
}



function checkKey(e) {

    e = e || window.event;

    empty_piece = get_element_by_src(empty_tile)
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