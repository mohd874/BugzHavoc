ig.module(
	'game.entities.ice'
)
.requires(
		'game.entities.purchasable'
)
.defines(function(){
	
	EntityIce = EntityPurchasable.extend({
		size: {x: 32, y: 32},
		price: 5,
		range: 15,
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('inShop' , 1, [0])
			this.addAnim('perchased' , 0.3, [0])
			this.addAnim('idle' , 1, [0])
			this.addAnim('used' , 1, [1])
			
			
			if(settings.currentAnim === 'perchased'){
				this.currentAnim = this.anims.perchased.rewind()
			}else{
				this.currentAnim = this.anims.inShop.rewind()
			}
			
		},
		
		animSheet: new ig.AnimationSheet('media/sub-weapon/ice2.png', 32, 32),
		
		update: function(){
			this.parent()
			
			if(this.currentAnim === this.anims.inShop){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe() && this.hasEnoughGold()){
					ig.game.spawnEntity(EntityIce, ig.input.mouse.x - this.size.x/2, ig.input.mouse.y - this.size.y/2, {currentAnim:'perchased'})
					this.deductGold()
					ig.game.sortEntitiesDeferred()
				}	
			}else if(this.currentAnim === this.anims.perchased){
				this.followTheMouse()
				
				if(ig.input.pressed('leftClick') && this.currentAnim.loopCount > 1){
					this.currentAnim = this.anims.used.rewind()
					this.zIndex = 9
					this.targets = this.findAllBugsInRange(this.range)
					ig.game.sortEntitiesDeferred()
				}
			}else if(this.currentAnim === this.anims.used){
				for(var key in this.targets){
					var entity = this.targets[key]
						
					if(entity.id != undefined){
					   this.applySlowEffect(entity)
					}
				}
				if(this.currentAnim.loopCount > 4){
					for(var key in this.targets){
						var entity = this.targets[key]
							
						if(entity.id != undefined){
						   this.restoreSpeed(entity)
						}
					}
					this.kill()
				}
			}
		},
		draw: function(){
			this.parent()
			if(this.currentAnim === this.anims.inShop){
				this.drawPrice()
			}else if(this.currentAnim === this.anims.perchased){
				this.drawRange()
			}
		},
		drawRange: function(){
			this.parent()
			var s = ig.system.scale
			var r = this.range * s
			var x = (this.pos.x + this.size.x/2) * s
			var y = (this.pos.y + this.size.y/2) * s
			
			var cxt = ig.system.context
			
			cxt.beginPath()
		    cxt.arc(x, y, r, 0,(2 * Math.PI), false)
		    cxt.fillStyle = 'transparent'
		    cxt.fill()
		    cxt.lineWidth = 2
		    cxt.strokeStyle = '#003300'
		    cxt.stroke()
		},
		followTheMouse: function(){
			this.pos.x = ig.input.mouse.x - this.size.x/2
			this.pos.y = ig.input.mouse.y - this.size.y/2
		},
        applySlowEffect: function(entity){
        	var slwx = Math.cos(entity.currentAnim.angle) * 15
		var slwy = Math.sin(entity.currentAnim.angle) * 15
		
		entity.oldVel = entity.vel
		entity.oldVel.x = entity.vel.x
		entity.oldMaxVel = entity.maxVel
		entity.oldAccel = entity.accel
		
		entity.vel.x = entity.vel.y = entity.maxVel.x = entity.maxVel.y = entity.accel.x = entity.accel.y = 0
        },
        restoreSpeed: function(entity){
        	ig.log('entity '+entity.id+' speed is restored')
        	
        	entity.updateSpeed()
        	ig.log('x: '+entity.vel.x)
        },
	kill: function(){
		this.parent()
	}
		
	})
})
