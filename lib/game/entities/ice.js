ig.module(
	'game.entities.ice'
)
.requires(
		'game.entities.purchasable'
)
.defines(function(){
	
	EntityIce = EntityPurchasable.extend({
		size: {x: 24, y: 30},
		price: 5,
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
			}
		},
		
		followTheMouse: function(){
			this.pos.x = ig.input.mouse.x - this.size.x/2
			this.pos.y = ig.input.mouse.y - this.size.y/2
		}
		
	})
})
