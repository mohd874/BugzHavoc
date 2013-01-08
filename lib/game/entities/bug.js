ig.module(
	'game.entities.bug'
) .requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityBug = EntityBase.extend({
	
		health: 10,
		
		maxHealth: 10,
		
		hasHealthBar: true,
        
		speed: 1,
		
		value: 10,
		
		attack: 10,
		
		size: {x: 36, y: 64},
		
		placed: false,
		
		currentAction: 'idle',
		
		zIndex: 0,
		
		type: ig.Entity.TYPE.B,
		
		checkAgainst: ig.Entity.TYPE.A,
		
		scoreValue: 10,
		
		debuffs: {},
		
		accel: {x: 0, y:0},
		
		maxVel: {x: 20, y: 20},
		
		vel: {x:10, y:10},
		
		fireDistance: 20,
		
		targetEntity: undefined,
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0])
			this.addAnim('attack' , 0.1, [0])

			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			
			var target = this.findPlayer(this)
			
			this.targetEntity = target.target
			
			this.updateAngle()
			
			this.updateVelocityAndAcceleration()
		},
		
		animSheet: new ig.AnimationSheet('media/antz.png', 36, 64),
		
		update: function(){
			this.parent()
			
			if(this.isGameRunning() === false){
				this.stopMovement()
				return
			}
			
			if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
				ig.game.applyDamage(this)
			}
			
			this.updateAngle()
			
			for(var key in this.debuffs){
				if(this.debuffs[key] !== undefined){
					this.debuffs[key].applyEffect(this)
				}
			}
			
			if(this.distanceTo(this.targetEntity) < this.fireDistance){
				this.stopMovement()
				this.currentAnim = this.anims.attack.rewind()
			}
		},
		updateVelocityAndAcceleration: function(){
			this.updateVelocity()
			this.updateMaxVelocity()
			this.updateAcceleration()
		},
		updateVelocity: function(){
			var velx = Math.cos(this.currentAnim.angle) * this.vel.x
			var vely = Math.sin(this.currentAnim.angle) * this.vel.y
			
			this.vel.x = velx
			this.vel.y = vely
		},
		updateMaxVelocity: function(){
			var maxVelx = Math.cos(this.currentAnim.angle) * this.maxVel.x
			var maxVely = Math.sin(this.currentAnim.angle) * this.maxVel.y
			
			this.maxVel.x = maxVelx
			this.maxVel.y = maxVely
		},
		updateAcceleration: function(){
			var accx = Math.cos(this.currentAnim.angle) * this.speed
			var accy = Math.sin(this.currentAnim.angle) * this.speed
			
			this.accel.x = accx
			this.accel.y = accy
		},
		updateAngle: function(){
			if(this.targetEntity != null)
				this.currentAnim.angle = this.angleToEntity(this.targetEntity)
		},
		stopMovement: function(){
			this.vel.x = this.vel.y = this.accel.x = this.accel.y = this.maxVel.x = this.maxVel.y = 0
		},
		kill: function(){
			ig.game.addScore(this)
			this.clearDebuffs()
			this.parent()
		},
		isGameRunning: function(){
			if(ig.game.currentState === ig.game.states.game){
				return true
			}
			
			return false
		},
		findPlayer: function(entity) {
			var nearestEntity = ig.game.getEntitiesByType( EntityPlayerBase )[0]
			var nearestDistance = entity.distanceTo( nearestEntity )
            
			return {target: nearestEntity, distance: nearestDistance};
		},
		clearDebuffs: function(){
			for(var key in this.debuffs){
				this.debuffs[key].kill()
			}
		},
		toString: function(){
			return 'this is a bug'
		}
	})
})

