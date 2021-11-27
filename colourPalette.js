//Displays and handles the colour palette.
function ColourPalette() {
    this.colours = [
        "indianred",
        "lightcoral",
        "salmon",
        "darksalmon",
        "lightsalmon",
        "crimson",
        "red",
        "firebrick",
        "darkred",
        "pink",
        "lightpink",
        "hotpink",
        "deeppink",
        "mediumvioletred",
        "palevioletred",
        "coral",
        "tomato",
        "orangered",
        "darkorange",
        "orange",
        "gold",
        "yellow",
        "lightyellow",
        "lemonchiffon",
        "lightgoldenrodyellow",
        "papayawhip",
        "moccasin",
        "peachpuff",
        "palegoldenrod",
        "khaki",
        "darkkhaki",
        "lavender",
        "thistle",
        "plum",
        "violet",
        "orchid",
        "fuchsia",
        "magenta",
        "mediumorchid",
        "mediumpurple",
        "rebeccapurple",
        "blueviolet",
        "darkviolet",
        "darkorchid",
        "darkmagenta",
        "purple",
        "indigo",
        "slateblue",
        "darkslateblue",
        "mediumslateblue",
        "greenyellow",
        "chartreuse",
        "lawngreen",
        "lime",
        "limegreen",
        "palegreen",
        "lightgreen",
        "mediumspringgreen",
        "springgreen",
        "mediumseagreen",
        "seagreen",
        "green",
        "darkgreen",
        "yellowgreen",
        "olivedrab",
        "olive",
        "darkolivegreen",
        "mediumaquamarine",
        "darkseagreen",
        "lightseagreen",
        "darkcyan",
        "teal",
        "aqua",
        "cyan",
        "lightcyan",
        "paleturquoise",
        "aquamarine",
        "turquoise",
        "mediumturquoise",
        "darkturquoise",
        "cadetblue",
        "steelblue",
        "powderblue",
        "lightblue",
        "skyblue",
        "lightskyblue",
        "deepskyblue",
        "dodgerblue",
        "cornflowerblue",
        "royalblue",
        "blue",
        "mediumblue",
        "darkblue",
        "navy",
        "midnightblue",
        "cornsilk",
        "blanchedalmond",
        "bisque",
        "navajowhite",
        "wheat",
        "burlywood",
        "tan",
        "rosybrown",
        "sandybrown",
        "goldenrod",
        "darkgoldenrod",
        "peru",
        "chocolate",
        "saddlebrown",
        "sienna",
        "brown",
        "maroon",
        "white",
        "snow",
        "honeydew",
        "mintcream",
        "azure",
        "aliceblue",
        "ghostwhite",
        "whitesmoke",
        "seashell",
        "beige",
        "oldlace",
        "floralwhite",
        "ivory",
        "antiquewhite",
        "linen",
        "lavenderblush",
        "mistyrose",
        "gainsboro",
        "lightgray",
        "silver",
        "darkgray",
        "gray",
        "dimgray",
        "lightslategray",
        "slategray",
        "darkslategray",
        "black"
    ];

    //make the start colour be black
    this.selectedColour = "indianred";
    let self = this;

    // In this function, two objects from two different classes 
    // are at play - ColourPalette(this file) and Div(p5 element)
    // colourClick is fired when we click on p5 element object and thus
    // we can access the id property of that using 'this' but at the same
    // time we need to set the selectedColour property of ColourPalette
    // object - we store that in self variable to accomplish that
    const colourClick = function() {
        //remove the old border
        let current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");

        //get the new colour from the id of the clicked element
        let c = this.id().split("Swatch")[0];

        //set the selected colour and fill and stroke
        self.selectedColour = c;
        fill(c);
        stroke(c);

        //add a new border to the selected colour
        this.style("border", "2px solid #002D62");
    }

    //load in the colours
    this.loadColours = function() {
        //set the fill and stroke properties to be first color from color array at the start of the programme
        //running
        fill(this.colours[0]);
        stroke(this.colours[0]);

        //for each colour create a new div in the html for the colourSwatches
        for (var i = 0; i < this.colours.length; i++) {
            var colourID = this.colours[i] + "Swatch";

            //using JQuery add the swatch to the palette and set its background colour
            //to be the colour value.
            var colourSwatch = createDiv()
            colourSwatch.class('colourSwatches');
            colourSwatch.id(colourID);

            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", this.colours[i]);
            colourSwatch.mouseClicked(colourClick)
        }

        select(".colourSwatches").style("border", "2px solid #002D62");
    };
    //call the loadColours function now it is declared
    this.loadColours();
}
