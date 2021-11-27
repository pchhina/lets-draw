//global variables that will store the toolbox colour palette
//and the helper functions
let toolbox = null;
let colourP = null;
let helpers = null;


function setup() {

    //create a canvas to fill the content div from index.html
    const canvasContainer = select('#content');
    const c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new ImageEditTool());
    toolbox.addTool(new StampTool());
    background(255);

}

function draw() {
    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}
