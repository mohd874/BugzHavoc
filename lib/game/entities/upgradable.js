ig.module(
	'game.entities.upgradable'
)
.requires(
	'game.entities.purchasable'
)
.defines(function(){
	
	EntityUpgradable = EntityPurchasable.extend({
		curLevel: 1,
		maxLevel: 5,
		init: function(x,y,settings){
			this.parent(x,y,settings)
			if(settings.maxLevel)this.maxLevel = settings.maxLevel
		},
		applyEffect: function(entity){
			
		},
		
		drawCurLevel: function(){
			ig.game.oFont.draw(this.curLevel, this.pos.x+25, this.pos.y, ig.Font.ALIGN.RIGHT)
		}
		
	})
})
