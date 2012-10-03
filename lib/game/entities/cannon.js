ig.module(
	'game.entities.cannon'
)
.requires(
	'game.entities.baseTurret',
	'game.entities.bullet'
)
.defines(function(){
	
	EntityCannon = EntityBaseTurret.extend({
		size: {x: 59, y: 64},
		
		bulletShoot: false,
		
		zIndex: 0,
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('inShop' , 0.1, [0])
			this.addAnim('perchased' , 0.1, [0])
			this.addAnim('idle' , 0.1, [0,0,0,0,0,1,2,3,4,5])
			this.addAnim('shoot', 0.1, [7,8,9,10,11,12,13,14])
			this.addAnim('die'  , 0.1, [15,16,17,18,19,20,21,22,23,24,24,25,26])
	
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			if(settings.currentAnim === 'perchased'){
				this.currentAnim = this.anims.perchased.rewind()
			}else{
				this.currentAnim = this.anims.inShop.rewind()
			}
			//this.currentAnim.angle = 0
		},
		
		animSheet: new ig.AnimationSheet('media/cannon_v.png', 64, 59),
		
		update: function(){
			this.parent()
			
			if(this.currentAnim == this.anims.inShop){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe() /*&& ig.game.isMoneyEnough()*/){
					ig.game.spawnEntity(EntityCannon, ig.input.mouse.x - this.size.x/2, ig.input.mouse.y - this.size.y/2, {currentAnim:'perchased'})
					//this.currentAnim = this.anims.perchased.rewind()
				}
			}else if(this.currentAnim == this.anims.perchased){
				this.pos.x = ig.input.mouse.x - this.size.x/2
				this.pos.y = ig.input.mouse.y - this.size.y/2
				
				if(ig.input.pressed('leftClick') && this.currentAnim.loopCount > 4){
					this.currentAnim = this.anims.idle.rewind()
				}
				
				return
			}else if(this.currentAnim == this.anims.idle){
				var other = this.findNearestEntityAndDistance()
				if(other != null){
					this.anims.idle.angle = this.angleToEntity(other)
				}
				
				
				if( this.currentAnim.loopCount > 2 && other != null) { 
					 this.anims.shoot.angle = this.angleToEntity(other)
					 this.currentAnim = this.anims.shoot.rewind()
				}
			}else if(this.currentAnim == this.anims.shoot){
				if(this.currentAnim.frame == 5){
					var target = this.findNearestEntityAndDistance()
					if(target != null && !this.bulletShoot){
						this.shootBullet(target)
						this.bulletShoot = true
					}
					ig.game.sortEntitiesDeferred()
				}
				if(this.currentAnim.loopCount > 0){
					this.currentAnim = this.anims.idle.rewind()
					this.bulletShoot = false
				}
			}else if(this.currentAnim == this.anims.die){
			
			}
			
		},
		
		shootBullet: function(target){
			ig.game.spawnEntity( EntityBullet, this.pos.x+this.size.x/2-7, this.pos.y+this.size.y/2-7, {angle:this.angleToEntity(target)})
		}
	})
})
