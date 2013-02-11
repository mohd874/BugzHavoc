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
			
			this.drawWithOFont(this.id, this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER)
		},
		angleToMouse: function(){
			var mx = ig.input.mouse.x + ig.game.screen.x;
			var my = ig.input.mouse.y + ig.game.screen.y;
			var r =  Math.atan2(
				my - (this.pos.y + this.size.y/2),
				mx - (this.pos.x + this.size.x/2)
			);
			
			return r;
		},
		
		angleToEntity: function(other){
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
		findAllBugsInRange: function(range) {
			var entitiesInRange = new Array(0)
			var bugs = ig.game.getEntitiesByType('EntityBug')
			
			for( var i = 0; i < bugs.length; i++ ) {
			    var ent = bugs[i];
			    var distance = this.distanceTo( ent );
			    if( distance <= range && ent != this && ent.type == ig.Entity.TYPE.B) {
                    entitiesInRange.push(ent)
			    }
			}
			
			return entitiesInRange
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
		distanceToPoint: function(x, y) {
			var xd = (this.pos.x + this.size.x/2) - x; 
			var yd = (this.pos.y + this.size.y/2) - y;
			return Math.sqrt( xd*xd + yd*yd );
		},
		distanceToMouse: function() {
			return this.distanceToPoint(ig.input.mouse.x, ig.input.mouse.y)
		},
		distanceToEntity: function(entity) {
			return this.distanceTo(entity)
		},
		drawHealthBar: function(){//the entity must have a maxHealth property and the hasHealthBar is true
			if(this.hasHealthBar === false)
				return
			
			// this.parent()
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
		},
		drawWithOFont: function(msg, x, y, alignment){
		    // ig.game.oFont.draw(msg,x,y,alignment(
		}
    })
})
