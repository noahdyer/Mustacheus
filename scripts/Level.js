(function (window) {

	function Level(background_img_path, cutscenes, name, items, target_recipe) {
		this.initialize(background_img_path, cutscenes, name, items, target_recipe);
	}

	var p = Level.prototype = new createjs.Bitmap();

// static properties:
	//no static properties currently planned

// public properties:

	p.name;			//the text name of the level  (e.g. Day 1)
	p.cutscenes;	//array of cutscene pngs or svgs
	p.items;		//array of the items in the level
	p.target_recipe //the recipe object that will end this level and trigger the next

// constructor:
	p.Bitmap_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function (background_img_path, cutscenes, name, items, target_recipe) {
		this.Bitmap_initialize(background_img_path); // super call
		this.name = name;
		this.cutscenes = cutscenes;
		this.items = items;
		this.target_recipe = target_recipe;

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

	window.Level = Level;

}(window));
