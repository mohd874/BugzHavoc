ig.module(
	'game.entities.bugB'
)
.requires(
	'game.entities.bug'
)
.defines(function(){
	
	EntityBugB = EntityBug.extend({
	
		//game spacific properties
		health: 80,
		
		maxHealth: 80,
		
		hasHealthBar: true,

		speed: 6,
		
		scoreValue: 15,
		
		size: {x: 64, y: 64},
		
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
		
		animSheet: new ig.AnimationSheet('media/bug2b.png', 32, 32),
		
		update: function(){
			this.parent()
		},
		
		draw: function(){
		    //this.parent()
		    
		    var s = ig.system.scale
		    
		    var ctx = ig.system.context
		    
            ctx.save()
            
            ctx.translate( ig.system.getDrawPos( this.pos.x - this.offset.x - ig.game.screen.x ),
                ig.system.getDrawPos( this.pos.y - this.offset.y - ig.game.screen.y ) );
            ctx.scale(s , s)
            
            this.currentAnim.draw( 0, 0 )
            
            ctx.restore()
		},
		
		toString: function(){
			return 'this is a bugB'
		}
		
	})
})

