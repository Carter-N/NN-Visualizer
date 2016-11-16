//Create binary datasets with simple function
class Dataset{

	constructor(n = 10, func = function(){return 0;}){

		this.n = n;
		this.func = func;

		this.points = [];

		this.generate();
	}	

	randomPoint(maxX = 1, minX = -1, maxY = 1, minY = -1){
		return {x: (Math.random() * (maxX + 1)) + minX, y: (Math.random() * (maxY + 1)) + minY};
	}

	generate(){

		for(var i = 0; i < this.n; i++){

			var point = this.randomPoint();

			if(point.y >= this.func(point.x)){
				this.points.push({x: point.x, y: point.y, class: 1});
			}else{
				this.points.push({x: point.x, y: point.y, class: 0});
			}
		}

		console.log(this.points);
	}
}