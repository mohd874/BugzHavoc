ig.module(
	'game.entities.bugA'
)
.requires(
	'game.entities.bug'
)
.defines(function(){
	
	EntityBugA = EntityBug.extend({
	
		//game spacific properties
		health: 30,
		
		maxHealth: 30,
		
		hasHealthBar: true,

		speed: 10,
		
		scoreValue: 5,
		
		size: {x: 32, y: 32},
		
		placed: false,
		
		currentAction: 'idle',
		
		zIndex: 0,
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			//this.addAnim('idle' , 0.1, [0,1,2,3])
			this.addAnim('idle' , 0.1, [0])
			
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			//this.currentAnim.angle = 0
			
			//this.util = new EntityUtil()
		},
		
		animSheet: new ig.AnimationSheet('media/bug1.png', 32, 32),
		
		update: function(){
			this.parent()
			
		},
		
		
		toString: function(){
			return 'this is a bugA'
		}
		
	})
})

