ig.module(
	'game.entities.title'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityTitle = EntityBase.extend({
		size: {x: 298, y: 42},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			this.addAnim('idle' , 5, [0])
			this.currentAnim = this.anims.idle.rewind()
		},
		
		animSheet: new ig.AnimationSheet('media/title.png', 298, 42)
	})
})