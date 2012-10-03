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
		}
		
	})
})
