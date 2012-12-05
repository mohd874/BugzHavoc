ig.module(
	'game.entities.poisonUpgrade'
)
.requires(
	'game.entities.upgradable'
)
.defines(function(){
	
	EntityPoisonUpgrade = EntityUpgradable.extend({
		size: {x: 32, y: 32},
		animSheet: new ig.AnimationSheet( 'media/sprites/poison.png', 32, 32 ),
		firePower: 0.1,
		target: 'empty',
		effectDuration: 'empty',
			
		init: function(x,y,settings){
			this.parent(x,y,settings)
			if(settings.price){
				this.price = settings.price
			}
			
			//test
			this.price = 1
			
			if(settings.maxLevel){
				this.maxLevel = settings.maxLevel
			}
			if(settings.target){
				this.target = settings.target
				this.target.debuffs['poison'] = this
			}
			if(settings.curLevel){
				this.curLevel = settings.curLevel
			}else{
				this.curLevel = 0
			}
			
			this.addAnim('inShop', 1, [3])
			this.addAnim('idle', 0.2, [0,1,2,3])
			
			if(settings.animation === 'idle'){
				this.currentAnim = this.anims.idle.rewind()
				this.effectDuration = new ig.Timer(3)
			}else{
				this.currentAnim = this.anims.inShop
			}
		},
		
		update: function(){
			this.parent()
			if (ig.game.currentState != ig.game.states.game){
				return
			}
			
			if(this.currentAnim === this.anims.inShop){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe() && this.hasEnoughGold() && !this.isMaxLevel()){
					ig.game.gold = ig.game.gold - this.price
					this.upgrade()
				}
			}else if(this.currentAnim === this.anims.idle){
				this.pos.x = this.target.pos.x
				this.pos.y = this.target.pos.y
				
				this.target.receiveDamage(this.firePower)
				
				if(this.effectDuration.delta() >= 0){
					
					this.target.debuffs['poison'] = undefined
					
					this.kill()
				}
			}
		},
		
		draw: function(){
			this.parent()
			if(this.currentAnim === this.anims.inShop){
				this.drawPrice()
				this.drawCurLevel()	
			}
		},
		
		isMaxLevel: function(){
			return this.curLevel == this.maxLevel
		},
		upgrade: function(){
			this.curLevel = this.curLevel+1
			this.price = this.price + 3
			this.firePower = this.firePower * 2
		},
		applyEffect: function(entity){
			this.parent(entity)
			if(this.currentAnim === this.anims.inShop && this.curLevel > 0){
				if(entity.debuffs['poison']){
					entity.debuffs['poison'].resetPoison()
				}else{
					ig.game.spawnEntity( 'EntityPoisonUpgrade', entity.pos.x, entity.pos.y, {target: entity, animation: 'idle', curLevel: this.curLevel})
				}
			}
		},
		
		resetPoison: function(){
			this.effectDuration.reset()
		}
		
	})
})
