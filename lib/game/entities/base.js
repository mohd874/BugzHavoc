ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityBase = ig.Entity.extend({
		hasHealthBar: false,
        
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
		},
		draw: function(){
			this.parent()
			this.drawHealthBar()
		},
		angleToMouse: function(){
				var mx = (ig.input.mouse.x + ig.game.screen.x); 
			    var my = (ig.input.mouse.y + ig.game.screen.y); 
			    var r = Math.atan2(my-this.pos.y, mx-this.pos.x); 
				 
				return r;
		},
		
		angleToEntity: function(other){
				/*
				var mx = (other.pos.x + other.size.x/2 + ig.game.screen.x); 
			    var my = (other.pos.y + other.size.y/2 + ig.game.screen.y); 
			    var r = Math.atan2(my-this.pos.y, mx-this.pos.x); 
				 
				return r;
				*/
				return this.angleTo(other) 
		},
		findNearestEntityAndDistance: function() {
            var nearestDistance = Infinity;
			var nearestEntity = null;
			for( var i = 0; i < ig.game.entities.length; i++ ) {
			    var ent = ig.game.entities[i];
			    var distance = this.distanceTo( ent );
                
			    if( distance < nearestDistance && ent != this && ent.type == ig.Entity.TYPE.B) {
                    nearestDistance = distance;
                    nearestEntity = ent;
			    }
			}
			
			return nearestEntity
		},
		
		isMouseOverMe: function(){
			if(ig.input.mouse.x >= (this.pos.x) 
				&& ig.input.mouse.x <= (this.pos.x+this.size.x)
				&& ig.input.mouse.y >= (this.pos.y) 
				&& ig.input.mouse.y <= (this.pos.y+this.size.y)){
					return true
				}
			return false
		},
		drawHealthBar: function(){//the entity must have a maxHealth property and the hasHealthBar is true
			if(this.hasHealthBar === false)
				return
				
			this.parent()
			var s = ig.system.scale
			var w = (this.size.y * (this.health/this.maxHealth)) * s
			var h = 3 * s
			var x = (this.pos.x - h) * s
			var y = this.pos.y * s
			
			var cxt = ig.system.context
			
			cxt.beginPath();
			cxt.rect(x,y,w,h);
			cxt.fillStyle = '#88FF00';
			cxt.fill();
			cxt.lineWidth = 2;
			cxt.strokeStyle = '#008800';
			cxt.stroke();
			/*
			//outer
			cxt.fillStyle = "#FF0000"
			cxt.fillRect(x-(0.8*s),y-(0.8*s),(this.size.y*s)+(this.size.y*0.8),h+(h*0.8))
			//inner
			cxt.fillStyle = "#0000FF"
			cxt.fillRect(x,y,w,h)
			*/
		}
    })
})