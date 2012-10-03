ig.module(
	'game.entities.stageNum'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityStageNum = EntityBase.extend({
		size: {x: 17, y: 17},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		init: function(x, y, settings){
			this.parent(x, y, settings)
		},
		
		update: function(){
			if(this.currentAnim == this.anims.idle){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
					ig.log('this.targetLvl: '+this.targetLvl)
					ig.game.currentLvl = this.targetLvl
					ig.game.switchLevel(ig.game.currentLvl)
				}
			}
		},
		
		draw: function(){
			this.parent()
			
			//var font = ig.game.oFont
			//font.draw(this.targetLvl, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2 - font.height/2, ig.Font.ALIGN.CENTER)
		}
	})
})