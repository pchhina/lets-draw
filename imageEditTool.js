function ImageEditTool(){
	
    this.name = "imagedit";
    this.icon = "assets/camera.png";
    this.showOptions = true;

    this.draw = function(){};

    // adds buttons and click handlers for image editing options
    this.populateOptions = function() {
        let imageditTool = select('#imagedittoolContainer');
        imageditTool.style("backgroundColor", "#A3D5D6");
        let imageMenuContainer = createDiv();
        imageMenuContainer.class("imageMenuContainer")
        imageMenuContainer.parent(imageditTool);


        // image loading button
        this.loadButton = createDiv('<label for="loadimageButton"><img src="assets/open.png" title="select an image from root directory"></label><input id="loadimageButton" type="file" accept="image/jpeg">');
        this.arrow = createDiv('<img src="assets/rightarrow.png">');
        this.loadButton.id("load-btn");
        this.loadButton.parent(imageMenuContainer);

        // image display button
        this.dispButton = createDiv('<img src="assets/view.png" title="display selected image on canvas" id="disp-btn">');
        this.arrow.parent(imageMenuContainer);
        this.dispButton.parent(imageMenuContainer);

        // populate filter buttons div
        let filterContainer = createDiv();
        filterContainer.class("filter-container");
        filterContainer.parent(imageditTool);
        let filters = ["hflip", "vflip", "sepia", "gray", "threshold", "opaque", "invert", "posterize", "dilate", "blur", "erode"];
        filters.forEach(filter => {
            let filterBtn = createDiv(`<a id="${filter}"href="#">${filter}</a>`);
            filterBtn.parent(filterContainer);
        })

        // create string mapping to filter function names
        const filfun = {
            "hflip": hflip, 
            "vflip": vflip, 
            "sepia": sepia,
            "gray": gray,
            "threshold": threshold,
            "opaque": opaque,
            "invert": invert,
            "posterize": posterize,
            "dilate": dilate,
            "blur": blur,
            "erode": erode};   
        // attaching click-handler for different filters
        Object.keys(filfun).forEach(fun => select(`#${fun}`).mousePressed(filfun[fun]));

        //click handler for loading the image
        let inp = select('#loadimageButton');
        inp.input(function() {
            // get the image path
            // https://stackoverflow.com/questions/857618/javascript-how-to-extract-filename-from-a-file-input-control
            var fullPath = document.getElementById('loadimageButton').value;
            if (fullPath) {
                var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                var filename = fullPath.substring(startIndex);
                if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }
            }
            img = loadImage(filename);
        });

        select('#disp-btn').mousePressed(function() {
            image(img, 100, 100, 500, 500);
        });
    }; // end of populateOptions

    // hide this tools options when any other tool is selected
    this.unselectTool = function(){
        let imageditTool = select('#imagedittoolContainer');
        this.showOptions = true;
        select('.filter-container').remove();
        select('.imageMenuContainer').remove();
        imageditTool.style("backgroundColor", "#E0FFFF");
    }

    // creating variables for built-in filters
    const gray = () => {
        filter(GRAY);
        }

    const threshold = () => {
        filter(THRESHOLD);
        }

    const opaque = () => {
        filter(OPAQUE);
        }

    const invert = () => {
        filter(INVERT);
        }

    const posterize = () => {
        filter(POSTERIZE, 3);
        }

    const dilate = () => {
        filter(DILATE);
        }

    const blur = () => {
        filter(BLUR, 3);
        }

    const erode = () => {
        filter(ERODE);
        }

    // sepia filter, constants found in the following stackoverflow answer
    // https://stackoverflow.com/questions/1061093/how-is-a-sepia-tone-created
    const sepia = () => {
        loadPixels();
        let d = pixelDensity();
        let imageLength = 4 * (width * d) * (height * d);
        for (let i =0; i < imageLength; i += 4){
            let red = Math.round(0.393 * pixels[i] +
                                 0.769 * pixels[i+1] +
                                 0.189 * pixels[i+2]);
            let green = Math.round(0.349 * pixels[i] +
                                 0.686 * pixels[i+1] +
                                 0.168 * pixels[i+2]);
            let blue = Math.round(0.272 * pixels[i] +
                                 0.534 * pixels[i+1] +
                                 0.131 * pixels[i+2]);
            pixels[i] = red;
            pixels[i+1] = green;
            pixels[i+2] = blue;
        };
        updatePixels();
    }

    // flip the image horizontally
    const hflip = () => {
        loadPixels();
        let d = pixelDensity();
        for (let h =0; h < d * height / 2; h++){
            for (let w = 0; w < width * d * 4; w += 4){
                // store rgb values of top half pixels into temporary variables
                let tmpR = pixels[h * width * 4 + w];
                let tmpG = pixels[h * width * 4 + w + 1];
                let tmpB = pixels[h * width * 4 + w + 2];
                // replace rgb values of top half pixels with bottom half
                pixels[h * width * 4 + w] = pixels[((width) * (height - h) * 4) - width * 4 + 0 + w];
                pixels[h * width * 4 + w + 1] = pixels[((width) * (height - h) * 4) - width * 4 + 1 + w];
                pixels[h * width * 4 + w + 2] = pixels[((width) * (height - h) * 4) - width * 4 + 2 + w];
                // replace rgb values of bottom half with top half
                pixels[((width) * (height - h) * 4) - width * 4 + 0 + w] = tmpR;
                pixels[((width) * (height - h) * 4) - width * 4 + 1 + w] = tmpG;
                pixels[((width) * (height - h) * 4) - width * 4 + 2 + w] = tmpB;
            }
        };
        updatePixels();
    }


    // flip the image vertically
    const vflip = () => {
        loadPixels();
        let d = pixelDensity();
        let rowPixels = d * width * 4;
        for (let h =0; h < d * height; h++){
            for (let w = 0; w < width * d * 4 / 2; w += 4){
                // store rgb values of left half pixels into temporary variables
                let tmpR = pixels[h * rowPixels + w];
                let tmpG = pixels[h * rowPixels + w + 1];
                let tmpB = pixels[h * rowPixels + w + 2];
                // replace rgb values of left half pixels with right half
                pixels[h * rowPixels + w] = pixels[(rowPixels ) + h * rowPixels - w];
                pixels[h * rowPixels + w + 1] = pixels[(rowPixels ) + h * rowPixels - w + 1];
                pixels[h * rowPixels + w + 2] = pixels[(rowPixels ) + h * rowPixels - w + 1];
                // replace rgb values of right half with left half
                pixels[(rowPixels ) + h * rowPixels - w] = tmpR;
                pixels[(rowPixels ) + h * rowPixels - w + 1] = tmpG;
                pixels[(rowPixels ) + h * rowPixels - w + 2] = tmpB;
            }
        };
        updatePixels();
    }

    // for experimentation, not used in UI
    const redFilter = () => {
        loadPixels();
        let d = pixelDensity();
        let imageLength = 4 * (width * d) * (height * d);
        for (let i =0; i < imageLength; i += 4){
            pixels[i+1] = 0;
            pixels[i+2] = 0;
        };
        updatePixels();
    }


    // Experimenting with convolution
    // http://www.cs.cornell.edu/courses/cs1114/2013sp/sections/S06_convolution.pdf
    // this is excruciatingly slow!!!
    // not implementable right now
    const conv = () => {
        loadPixels();
        let d = pixelDensity();
        let rowPixels = d * width * 4;
        let convVector = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
        // exclude outer edge since i don't know how it will behave
        for (let h =1; h < d * height , 1; h++){
            for (let w = 0; w < (width - 1) * d * 4; w += 4){
                let pixVal = 0;
                pixVal = convVector[0] * pixels[(h-1)*rowPixels + w - 4] +
                    convVector[1] * pixels[(h-1)*rowPixels + w ] +
                    convVector[2] * pixels[(h-1)*rowPixels + w + 4] +
                    convVector[3] * pixels[(h)*rowPixels + w - 4] +
                    convVector[4] * pixels[(h)*rowPixels + w ] +
                    convVector[5] * pixels[(h)*rowPixels + w + 4] +
                    convVector[6] * pixels[(h+1)*rowPixels + w - 4] +
                    convVector[7] * pixels[(h+1)*rowPixels + w ] +
                    convVector[8] * pixels[(h+1)*rowPixels + w + 4] ;
                // store rgb values of left half pixels into temporary variables
                pixels[h*rowPixels + w] = pixVal;
            }
        };
        updatePixels();
    }

}


