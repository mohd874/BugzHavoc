ig.module(
	'game.entities.ice'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityIce = EntityBase.extend({
		size: {x: 24, y: 30},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('inShop' , 1, [0])
			this.addAnim('perchased' , 1, [0])
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
			
		},
		
		draw: function(){
			this.parent()
			
		}
		
	})
})
