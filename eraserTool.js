function EraserTool(){
    //set an icon and a name for the object
    this.icon = "assets/eraser.png";
    this.name = "eraser";
    this.showOptions = true;

    // create radio elements for different eraser sizes
    this.populateOptions = function(){
        let eraserTool = select('#erasertoolContainer');
        this.radio = createRadio();
        this.radio.option('tiny');
        this.radio.option('small');
        this.radio.option('medium');
        this.radio.option('large');
        this.radio.selected('small');
        this.radio.id('eraser-radio')
        this.radio.parent(eraserTool);
        eraserTool.style("backgroundColor", "#A3D5D6");
    }  

    // remove eraer option when any other tool is clicked
    this.unselectTool = function(){
        let eraserTool = select('#erasertoolContainer');
        this.showOptions = true;
        select('#eraser-radio').remove();
        eraserTool.style("backgroundColor", "#E0FFFF");
    }

    let size = 35; // medium eraser as default

    this.draw = function(){
        if(this.radio.selected() === "tiny"){
        cursor("assets/c4.png", 7, 7);
            size = 14;
        }
        if(this.radio.selected() === "small"){
        cursor("assets/c3.png", 15, 14);
            size = 28;
        }
        if(this.radio.selected() === "medium"){
        cursor("assets/c2.png", 23, 23);
            size = 42;
        }
        if(this.radio.selected() === "large"){
        cursor("assets/c1.png", 30, 30);
            size = 58;
        }
        if(mouseIsPressed){
            fill(255);
            noStroke();
            ellipse(mouseX, mouseY, size);
        }
    };
}
