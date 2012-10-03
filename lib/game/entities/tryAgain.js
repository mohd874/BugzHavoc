ig.module(
	'game.entities.tryAgain'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityTryAgain = EntityBase.extend({
		size: {x: 95, y:18},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			this.addAnim('idle' , 5, [0])
			this.currentAnim = this.anims.idle.rewind()
		},
		
		animSheet: new ig.AnimationSheet('media/sprites/try-again.png', 95, 18),
		
		update: function(){
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