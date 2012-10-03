ig.module(
	'game.entities.hit1'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityHit1 = EntityBase.extend({
	
		size: {x: 13, y: 13},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0,4,2,5,8,3,6,9])
	
			this.currentAnim = this.anims.idle.rewind()
			this.currentAnim.angle = 0
		},
		
		animSheet: new ig.AnimationSheet('media/sprites/hit1.png', 13, 13),
		
		update: function(){
			this.parent()
			if(this.currentAnim.loopCount > 0){
				this.kill()
			}
		},
		
		toString: function(){
			return 'this is a bug'
		}
	})
})

