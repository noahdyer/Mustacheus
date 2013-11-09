(function (window) {

	function Item(img_path, name, init_x, init_y) {
		this.initialize(img_path, name, init_x, init_y);
	}

	var p = Item.prototype = new createjs.Bitmap();

// static properties:
	//no static properties currently planned

// public properties:

	p.name;			//the text name of the item
	p.init_x;
	p.init_y;

// constructor:
	p.Bitmap_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function (img_path, name, init_x, init_y) {
		this.Bitmap_initialize(img_path); // super call
		this.name = name;
		this.x = init_x;
		this.y = init_y;
		this.init_x = init_x;
		this.init_y = init_y;
		
		this.on("mouseover", function(evt) {
			this.scaleX = this.scaleY *= 1.2;
			update = true;
			//console.log("UPGRADE");
		});
		this.on("mouseout", function(evt) {
			this.scaleX /=  1.2;
			this.scaleY /= 1.2;
			update = true;
			//console.log("DOWNGRADE");
		});
		// using "on" binds the listener to the scope of the currentTarget by default
		// in this case that means it executes in the scope of the button.
		this.on("mousedown", function(evt) {
			//this.parent.addChild(this);
			this.offset = {x:this.x - evt.stageX, y:this.y - evt.stageY};
		});
		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
		this.on("pressmove", function(evt) {
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			// indicate that the stage should be updated on the next tick:
			update = true;
		});
		this.on("pressup", function(evt) {
			//check to see where it is. if not on target reset position.
			if (this.x < 640)
			{
				// need to reset.
				this.x = this.init_x;
				this.y = this.init_y;
				//console.log(item.init_x + ", " + item.init_y);
				index = 0;
				//updateText(welcomeText, "Not in the right place", 500);
				textObject.text = "";
				textToUpdate = "Move all the way over to the alter!!";
			}
			else
			{
				textObject.text = "";
			}
		});

		//this.activate(size); // from spacerock, I don't think it's necessary
	}
/*
// public methods:

	//handle drawing a spaceRock
	p.getShape = function (size) {
		var angle = 0;
		var radius = size;

		this.size = size;
		this.hit = size;
		this.bounds = 0;

		//setup
		this.graphics.clear();
		this.graphics.beginStroke("#FFFFFF");
		this.graphics.moveTo(0, size);

		//draw spaceRock
		while (angle < (Math.PI * 2 - .5)) {
			angle += .25 + (Math.random() * 100) / 500;
			radius = size + (size / 2 * Math.random());
			this.graphics.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);

			//track visual depiction for interaction
			if (radius > this.bounds) {
				this.bounds = radius;
			}	//furthest point

			this.hit = (this.hit + radius) / 2;					//running average
		}

		this.graphics.closePath(); // draw the last line segment back to the start point.
		this.hit *= 1.1; //pad a bit
	}

	//handle reinit for poolings sake
	p.activate = function (size) {
		this.getShape(size);

		//pick a random direction to move in and base the rotation off of speed
		var angle = Math.random() * (Math.PI * 2);
		this.vX = Math.sin(angle) * (5 - size / 10);
		this.vY = Math.cos(angle) * (5 - size / 10);
		this.spin = (Math.random() + 0.2 ) * this.vX;

		//associate score with size
		this.score = (5 - size / 10) * 100;
		this.active = true;
	}

	//handle what an Item does to itself every frame
	p.tick = function (event) {
		this.rotation += this.spin;
		this.x += this.vX;
		this.y += this.vY;
	}

	//position the spaceRock so it floats on screen
	p.floatOnScreen = function (width, height) {
		//base bias on real estate and pick a side or top/bottom
		if (Math.random() * (width + height) > width) {
			//side; ensure velocity pushes it on screen
			if (this.vX > 0) {
				this.x = -2 * this.bounds;
			} else {
				this.x = 2 * this.bounds + width;
			}
			//randomly position along other dimension
			if (this.vY > 0) {
				this.y = Math.random() * height * 0.5;
			} else {
				this.y = Math.random() * height * 0.5 + 0.5 * height;
			}
		} else {
			//top/bottom; ensure velocity pushes it on screen
			if (this.vY > 0) {
				this.y = -2 * this.bounds;
			} else {
				this.y = 2 * this.bounds + height;
			}
			//randomly position along other dimension
			if (this.vX > 0) {
				this.x = Math.random() * width * 0.5;
			} else {
				this.x = Math.random() * width * 0.5 + 0.5 * width;
			}
		}
	}

	p.hitPoint = function (tX, tY) {
		return this.hitRadius(tX, tY, 0);
	}

	p.hitRadius = function (tX, tY, tHit) {
		//early returns speed it up
		if (tX - tHit > this.x + this.hit) {
			return;
		}
		if (tX + tHit < this.x - this.hit) {
			return;
		}

		if (tY - tHit > this.y + this.hit) {
			return;
		}

		if (tY + tHit < this.y - this.hit) {
			return;
		}

		//now do the circle distance test
		return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}
*/

	window.Item = Item;

}(window));
