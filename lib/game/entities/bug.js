ig.module(
	'game.entities.bug'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityBug = EntityBase.extend({
	
		//game spacific properties
		health: 10,
		
		maxHealth: 10,
		
		hasHealthBar: true,
        
		speed: 10,
		
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
		
		accel: {x: 1, y:1},
		
		maxVel: {x: 10, y: 10},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0,1,2,3])
	
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			this.currentAnim.angle = 0
		},
		
		animSheet: new ig.AnimationSheet('media/antz.png', 36, 64),
		
		update: function(){
			this.parent()
			
			if(this.isGameRunning() === false){
				this.vel.x = this.accel.x = 0
				this.vel.y = this.accel.y = 0
				return
			}
			
			if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
				ig.game.applyDamage(this)
			}
			
			var target = this.findPlayer(this)
			var targetEntity = target.target
			var targetDistance = target.distance
			
			
			if(targetEntity != null)
				this.currentAnim.angle = this.angleToEntity(targetEntity)
			
			var vely = Math.sin(this.currentAnim.angle) * this.vel.y 
			var velx = Math.cos(this.currentAnim.angle) * this.vel.x
			
			this.vel.x = velx
			this.vel.y = vely
			
			for(var key in this.debuffs){
				if(this.debuffs[key] !== undefined){
					this.debuffs[key].applyEffect(this)
				}
			}
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

