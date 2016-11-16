//A wrapper around a canvas element with rendering functions
class WebGLContext{

	constructor(id, shaders = null, width = window.innerWidth, height = window.innerHeight){
		this.id = id;
		this.canvas = document.getElementById(this.id);
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl = this.canvas.getContext("webgl");
		this.scene = null;
		this.renderer = new WebGLRenderer(this, shaders);
	}

	getWidth(){
		return this.canvas.width;
	}

	getHeight(){
		return this.canvas.height;
	}

	render(){
		this.renderer.render();
	}
}