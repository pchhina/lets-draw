//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

    var self = this;

    this.tools = [];
    this.selectedTool = null;

    var toolbarItemClick = function() {
        //remove any existing borders
        var items = selectAll(".sideBarItem");
        for (var i = 0; i < items.length; i++) {
            items[i].style('border', '0')
        }

        // PS: since this function is called by the press of
        // tool icon, "this" in the following statement refers
        // to that tool, for example freehandTool. This is why
        // we have to use "self" to access properties of parent
        // object - Toolbox
        var toolName = this.id().split("sideBarItem")[0];
        self.selectTool(toolName);

        // Eraser cursor only when using eraser tool
        if (self.selectedTool.name === "eraser") {
            cursor("assets/c3.png", 34, 36);
        } else {
            cursor(ARROW);
        }

        // reselect stroke (otherwise it goes away if eraser is used)
        stroke(colourP.selectedColour);

        //call loadPixels to make sure most recent changes are saved to pixel array
        loadPixels();

    }

    //add a new tool icon to the html page
    var addToolIcon = function(icon, name) {
        let toolContainer = createDiv();
        toolContainer.class('toolContainer');
        toolContainer.id(name + 'toolContainer');
        toolContainer.parent('tools');
        
        var sideBarItem = createDiv("<img src='" + icon + "'></div>");
        sideBarItem.class('sideBarItem')
        sideBarItem.id(name + "sideBarItem")
        sideBarItem.parent(toolContainer);
        // PS: attaches a listener - toolbarItemClick, to
        // the tool being added. Now when mouse is clicked
        // on this tool, it will call toolbarItemClick
        sideBarItem.mouseClicked(toolbarItemClick);
    };

    //add a tool to the tools array
    this.addTool = function(tool) {
        //check that the object tool has an icon and a name
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("make sure your tool has both a name and an icon");
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        //if no tool is selected (ie. none have been added so far)
        //make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    this.selectTool = function(toolName) {
        //search through the tools for one that's name matches
        //toolName
        for (var i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                //if the tool has an unselectTool method run it.
                if (this.selectedTool != null && this.selectedTool.hasOwnProperty(
                                "unselectTool")) {
                    this.selectedTool.unselectTool();
                }
                //select the tool and highlight it on the toolbar
                this.selectedTool = this.tools[i];

                //if the tool has an options area. Populate it now.
                if (this.selectedTool.hasOwnProperty("populateOptions") && this.selectedTool.showOptions) {
                    this.selectedTool.populateOptions();
                    this.selectedTool.showOptions = false;
                }
            } 
            
        }
    };

}
