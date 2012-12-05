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
			this.addAnim('perchased' , 0.5, [0])
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
					ig.game.gold = ig.game.gold - this.price
					ig.game.sortEntitiesDeferred()
				}	
			}else if(this.currentAnim === this.anims.perchased){
				this.followTheMouse()
				
				if(ig.input.pressed('leftClick') && this.currentAnim.loopCount > 1){
					this.currentAnim = this.anims.used.rewind()
					this.zIndex = 9
					this.targets = this.findAllBugsInRange(this.range)
					
					for(var key in this.targets){
						ig.log('key: '+key+' value:'+this.targets[key].debuffs)
					}
					for(var key in this.targets){
						this.targets[key].vel.x = this.targets[key].vel.x - 6  
						this.targets[key].vel.y = this.targets[key].vel.y - 6  
					}
					ig.game.sortEntitiesDeferred()
				}
			}else if(this.currentAnim === this.anims.used){
				if(this.currentAnim.loopCount > 4){
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
		kill: function(){
			this.parent()
		}
		
	})
})
