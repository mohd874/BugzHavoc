ig.module(
	'game.entities.shop'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	EntityShop = EntityBase.extend({
		size: {x:480,y:48},
		animSheet: new ig.AnimationSheet('media/sprites/shop.png', 480, 48),
		zIndex: 1000,
		init: function(x,y,settings){
			this.addAnim('idle', 1, [0])
			this.anims.currentAnim = this.anims.idle
			ig.log('shop zIndex:'+this.zIndex)
		}
		
	})
})
