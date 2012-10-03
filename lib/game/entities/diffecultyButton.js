ig.module(
	'game.entities.diffecultyButton'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityDiffecultyButton = EntityBase.extend({
		size: {x: 69, y:18},
		mode: 'normal',
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			if(settings.mode != undefined){
				this.mode = settings.mode
			}
			
			ig.log('mode: '+this.mode)
			
			this.animSheet = new ig.AnimationSheet('media/sprites/'+this.mode+'.png', 69, 18),
			this.addAnim('idle' , 5, [0])
			this.currentAnim = this.anims.idle.rewind()
		},
		
		update: function(){
			if(this.currentAnim == this.anims.idle){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
					ig.game.currentState = ig.game.states[2]
					ig.game.currentLvl = ig.game.states[2]
					ig.game.switchLevel(ig.game.currentLvl)
				}
			}
		}
	})
})