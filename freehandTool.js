function FreehandTool(){
    //set an icon and a name for the object
    this.icon = "assets/pen.png";
    this.name = "freehand";
    this.showOptions = true;

    this.populateOptions = function(){
        select('.options').style("display", "block");
        let freehandTool = select('#freehandtoolContainer');
        this.slider = createSlider(2, 14, 4, 2);
        this.slider.id('freehand-slider');
        this.slider.parent(freehandTool);
        freehandTool.style("backgroundColor", "#A3D5D6");

        this.colorPicker = createDiv(`
                    <input type="color" id="color-picker" name="head" value="#e66465">
                    <label for="color-picker">Color Picker</label>
            `);
        this.colorPicker.id('freehand-colorpicker');
        this.colorPicker.parent(freehandTool);
        let cp = document.querySelector("#color-picker");

        cp.addEventListener("change", e => {
            e.preventDefault();
            console.log(e.target.value);
            fill(e.target.value);
            stroke(e.target.value);
        });
    }

    this.unselectTool = function(){
        let freehandTool = select('#freehandtoolContainer');
        select('.options').style("display", "none");
        this.showOptions = true;
        select('#freehand-slider').remove();
        select('#freehand-colorpicker').remove();
        freehandTool.style("backgroundColor", "#E0FFFF");
    }
    //let colorPicker = document.querySelector("#freehand-colorpicker");
    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1;
    var previousMouseY = -1;
    //strokeWeight(5);
    this.draw = function(){
        strokeWeight(this.slider.value());
        //if the mouse is pressed
        if(mouseIsPressed){
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1){
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            //if we already have values for previousX and Y we can draw a line from 
            //there to the current mouse location
            else {
                    line(previousMouseX, previousMouseY, mouseX, mouseY);
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
            }
        //if the user has released the mouse we want to set the previousMouse values 
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
                previousMouseX = -1;
                previousMouseY = -1;
        }
    };
}
