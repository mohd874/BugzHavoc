ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityBullet = ig.Entity.extend({	
		size: {x: 15, y: 15},
		
		offset: {x: 9, y: 0},
		
		zIndex: -10,
		
		type: ig.Entity.TYPE.A,
		
		checkAgainst: ig.Entity.TYPE.B,
		
		check: function(other){
			this.parent(other)
			
			other.receiveDamage(10)
			this.kill()
		},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.2, [0,1,2,1])
			
			this.currentAnim = this.anims.idle.rewind()
			var vely = Math.sin(this.angle) * 100 
			var velx =  Math.cos(this.angle) * 100
			
			this.maxVel.x = this.vel.x = this.accel.x = velx
			this.maxVel.y = this.vel.y = this.accel.y = vely
			
		},
		
		animSheet: new ig.AnimationSheet('media/bullet_a.png', 34, 18),
		
		update: function(){
			this.parent()
		}
	})

})