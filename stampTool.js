// source of images
// https://www.flaticon.com/
// https://freeicons.io/summer-icons/boat-icon-28101#
function StampTool(){
    let self = this;
	
    this.name = "stamp";
    this.icon = "assets/stamp.png";
    this.showOptions = true;

    // hides the stamp palette when user clicks on another tool
    this.unselectTool = function(){
        let stampTool = select('#stamptoolContainer');
        this.showOptions = true;
        select('.stampPalette').remove();
        stampTool.style("backgroundColor", "#E0FFFF");
    }

    this.draw = function(){
        if(mouseIsPressed) {
            image(this.selectedStampImg, mouseX - 20, mouseY - 20, 35, 35);
            }
        }

    this.stamps = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"];

    //make first stamp as the initial
    this.selectedStampImg =  loadImage("assets/stamps/oneSwatch.png"); 
    this.selectedStamp = "one";

    var stampClick = function() {
        //remove the old border
        var current = select("#" + self.selectedStamp + "Swatch");
        current.style("border", "0");

        //get the new stamp from the id of the clicked element
        var s = this.id().split("Swatch")[0];
        self.selectedStamp = s;

        //set the selected stamp image
        self.selectedStampImg = "assets/stamps/" + s + "Swatch.png"; 
        self.selectedStampImg = loadImage(self.selectedStampImg);

        //add a new border to the selected stamp
        this.style("border", "2px solid #002D62");
    }

    //load in the stamps
    this.populateOptions = function() {
        let stampTool = select('#stamptoolContainer');
        let stampDiv = createDiv();
        stampDiv.class("stampPalette");
        stampDiv.parent(stampTool);

        //for each stamp create a new div in the html for the stampSwatches
        for (var i = 0; i < this.stamps.length; i++) {
            var stampID = this.stamps[i] + "Swatch";

            //add the swatch to the palette 
            var stampSwatch = createDiv()
            stampSwatch.class('stampSwatches');
            stampSwatch.id(stampID);

            stampDiv.child(stampSwatch);
            var stampImg = "assets/stamps/" + stampID + ".png"; 
            var imgElt = createImg(stampImg, 'stamp');
            select("#" + stampID).child(imgElt);
            stampSwatch.mouseClicked(stampClick)
        }

        select(".stampSwatches").style("border", "2px solid #002D62");
        stampTool.style("backgroundColor", "#A3D5D6");
    };
};
