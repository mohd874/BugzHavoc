ig.module(
	'game.entities.purchasable'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityPurchasable = EntityBase.extend({
		price: 10,
		zIndex: 1000,
		init: function(x,y,settings){
			this.parent(x,y,settings)
			if(settings.price)this.price = settings.price
		},
		
		hasEnoughGold: function(){
			ig.log('hasEnoughGold: '+ (ig.game.gold >= this.price))
			return ig.game.gold >= this.price
		}, 
		
		drawPrice: function(){
			ig.game.oFont.draw(this.price, this.pos.x+25, this.pos.y+25, ig.Font.ALIGN.RIGHT)
		}
		
	})
})
