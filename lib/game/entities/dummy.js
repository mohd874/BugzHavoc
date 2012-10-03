ig.module(
	'game.entities.dummy'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityDummy = EntityBase.extend({
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		
		type: ig.Entity.TYPE.B,
		size: {x: 16, y: 4},
		
	})
})

