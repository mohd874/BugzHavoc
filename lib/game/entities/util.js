ig.module(
	'game.entities.util'
)
.requires(
	'impact.entity',
    'game.entities.player'
)
.defines(function(){
	
	EntityUtil = ig.Entity.extend({
        init: function(x, y, settings){
			this.parent(x, y, settings)
			
		},
		
		angleToMouse: function(entity){
            var mx = (ig.input.mouse.x + ig.game.screen.x); //Figures out the x coord of the mouse in the entire world
            var my = (ig.input.mouse.y + ig.game.screen.y); //Figures out the y coord of the mouse in the entire world
            var r = Math.atan2(my-entity.pos.y, mx-entity.pos.x); //Gives angle in radians from player's location to the mouse location, assuming directly right is 0
             
            return r;
		},
        
        angleToEntity: function(entity1, entity2){
            var r = Math.atan2(entity1.pos.y-entity2.pos.y, entity1.pos.x-entity2.pos.x); //Gives angle in radians from player's location to the mouse location, assuming directly right is 0
             
            return r;
        },
		
		findNearestEntityAndDistance: function(entity) {
			/*
            var nearestDistance = Infinity;
			var nearestEntity = null;
			for( var i = 0; i < ig.game.entities.length; i++ ) {
			    var ent = ig.game.entities[i];
			    var distance = entity.distanceTo( ent );
                
			    if( distance < nearestDistance && ent != entity && ent != this) {
                    nearestDistance = distance;
                    nearestEntity = ent;
			    }
			}
            */
            
            var nearestEntity = ig.game.getEntitiesByType( EntityPlayer )[0]
            var nearestDistance = entity.distanceTo( nearestEntity )
            
			return {target: nearestEntity, distance: nearestDistance};
		}
    })
})