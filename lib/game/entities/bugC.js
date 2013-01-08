ig.module(
	'game.entities.bugC'
)
.requires(
	'game.entities.bug'
)
.defines(function(){
	
	EntityBugC = EntityBug.extend({
	
		//game spacific properties
		health: 60,
		
		maxHealth: 60,
		
		speed: 20,
		
		scoreValue: 20,
		
		size: {x: 36, y: 32},
		
		currentAction: 'idle',
		
		fireDistance: 120,
		
	   	bulletShoot: false,

		timer: undefined,

		cooldown: 1,

		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 1, [0])
			
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			this.timer = new ig.Timer()
			this.counter = 0
		},
		
		animSheet: new ig.AnimationSheet('media/bug3.png', 36, 32),
		
		update: function(){
			this.parent()
			
			this.counter += this.timer.tick()

			if(this.isGameRunning() === false){
				this.stopMovement()
				return
			}

			if(this.currentAnim === this.anims.attack){
				if(this.counter > this.cooldown && this.targetEntity != null){
					this.fireBullet(this.targetEntity)
					this.counter = 0
					ig.game.sortEntitiesDeferred()
				}
			}
		},
		fireBullet: function(target){
			ig.game.spawnEntity( EntityBullet, this.pos.x+this.size.x/2-7, this.pos.y+this.size.y/2-7, {angle:this.angleToEntity(this.targetEntity)})
		},
		toString: function(){
			return 'this is a bugC'
		}
	})
})
