ig.module(
	'game.entities.start'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityStart = EntityBase.extend({
		size: {x: 57, y:18},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			this.addAnim('idle' , 5, [0])
			this.currentAnim = this.anims.idle.rewind()
		},
		
		animSheet: new ig.AnimationSheet('media/sprites/start.png', 57, 18),
		
		update: function(){
			this.parent()
			if(this.currentAnim == this.anims.idle){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
					//ig.game.currentState = ig.game.states[1]
					//ig.game.currentLvl = ig.game.states[1]
					//ig.game.switchLevel(ig.game.currentLvl)
					ig.game.start()
				}
			}
		}
	})
})