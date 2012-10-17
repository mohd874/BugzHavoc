ig.module(
	'game.entities.gunUpgrade'
)
.requires(
	'game.entities.upgradable'
)
.defines(function(){
	
	EntityGunUpgrade = EntityUpgradable.extend({
		size: {x: 32, y: 32},
		animSheet: new ig.AnimationSheet( 'media/sprites/gunUpgrade.png', 32, 32 ),
		firePower: 3,
		
		init: function(x,y,settings){
			this.parent(x,y,settings)
			if(settings.price)this.price = settings.price
			if(settings.maxLevel)this.maxLevel = settings.maxLevel
			this.addAnim('idle', 1, [0])
			this.anims.currentAnim = this.anims.idle
		},
		
		update: function(){
			this.parent()
			if (ig.game.currentState != ig.game.states.game){
				return
			}
			if(ig.input.pressed('leftClick') && this.isMouseOverMe() && this.hasEnoughGold() && !this.isMaxLevel()){
				ig.game.gold = ig.game.gold - this.price
				this.upgrade()
			}
		},
		
		draw: function(){
			this.parent()
			this.drawPrice()
			this.drawCurLevel()
		},
		
		isMaxLevel: function(){
			ig.log('maxLevel: '+  this.maxLevel)
			ig.log('curLevel: '+  this.curLevel)
			return this.curLevel == this.maxLevel
		},
		upgrade: function(){
			this.curLevel = this.curLevel+1
			this.price = this.price + 10
			this.firePower = this.firePower + 3
		},
		applyEffect: function(entity){
			this.parent(entity)
			entity.receiveDamage(3)
		}
		
	})
})
