ig.module(
	'game.entities.coin'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityCoin = EntityBase.extend({
	
		size: {x: 16, y: 16},
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		
		check: function(other){
			this.parent(other)
			if(other.name === 'coinTarget'){
				this.kill()
			}
		},
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0,1,2,3])
	
			this.currentAnim = this.anims.idle.rewind()
		},
		
		animSheet: new ig.AnimationSheet('media/sprites/coin.png', 16, 16),
		
		update: function(){
			this.parent()
			var target = ig.game.getEntityByName('coinTarget')
			this.angle = this.angleToEntity(target)
			var vely = Math.sin(this.angle) * 850 
			var velx =  Math.cos(this.angle) * 850
			
			this.maxVel.x = this.vel.x = this.accel.x = velx
			this.maxVel.y = this.vel.y = this.accel.y = vely
		},
		
		toString: function(){
			return 'this is a coin'
		}
	})
})

