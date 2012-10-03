ig.module(
	'game.entities.playerBase'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityPlayerBase = EntityBase.extend({
        //game spacific properties
		health: 100,
		maxHealth:100,
		hasHealthBar: true,
		shield: 10,
		speed: 10,
		anitGravity: 100,
		vlaue: 10,
		
		size: {x: 32, y: 32},
		
		currentAction: 'idle',
		
		zIndex: 0,
		
		type: ig.Entity.TYPE.A,
		
		checkAgainst: ig.Entity.TYPE.B,
		
		check: function(other){
			this.parent(other)
			
			this.receiveDamage(1)
		},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0])
			
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			this.currentAnim.angle = 0
			ig.game.isPlayerDead = false
		},
		
		animSheet: new ig.AnimationSheet('media/sprites/base2.png', 32, 32),
		
		update: function(){
			this.parent()
			
		},
		kill: function(){
			ig.game.isPlayerDead = true
			this.parent()
		},
		toString: function(){
			return 'this is the player base'
		}  
    })
})