ig.module(
	'game.entities.baseTurret'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityBaseTurret = EntityBase.extend({
	
		init: function(x, y, settings){
			this.parent(x, y, settings)
		},
		
		toString: function(){
			return 'this is a turret'
		}
	})
})
