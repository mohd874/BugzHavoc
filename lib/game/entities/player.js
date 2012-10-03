ig.module(
	'game.entities.player'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
	EntityPlayer = EntityBase.extend({
        //game spacific properties
		health: 10,
		maxHealth:10,
		hasHealthBar: true,
		shield: 10,
		speed: 10,
		anitGravity: 100,
		vlaue: 10,
		
		size: {x: 32, y: 64},
		
		currentAction: 'idle',
		
		zIndex: 0,
		
		type: ig.Entity.TYPE.A,
		
		checkAgainst: ig.Entity.TYPE.B,
		
		check: function(other){
			this.parent(other)
			
			this.receiveDamage(1)
		},
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('idle' , 0.1, [0])
			this.addAnim('move' , 0.1, [0,1])
			
			for ( var i = 0; i < this.anims.length; i++) {
				this.anims[i].pivot.x = this.size.x/2
				this.anims[i].pivot.y = this.size.y/2
			}
			
			this.currentAnim = this.anims.idle.rewind()
			this.currentAnim.angle = 0
			ig.game.isPlayerDead = false
		},
		
		animSheet: new ig.AnimationSheet('media/player.png', 32, 64),
		
		update: function(){
			this.parent()
			
			if(this.currentAnim == this.anims.idle){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe()){
					this. currentAnim = this.anims.move.rewind()
				}
			}else if(this.currentAnim == this.anims.move){
				if(ig.input.state('leftClick')){
					this.pos.x = ig.input.mouse.x - this.size.x/2
					this.pos.y = ig.input.mouse.y - this.size.y/2					
				}else{
					this. currentAnim = this.anims.idle.rewind()
				}
			}
			/*
			if((ig.input.state('leftClick') && this.isMouseOverMe()) || this.currentAnim == this.anims.move){
				this.pos.x = ig.input.mouse.x - this.size.x/2
				this.pos.y = ig.input.mouse.y - this.size.y/2
				
				if(this.currentAnim != this.anims.move){
					this. currentAnim = this.anims.move.rewind()
				}
			}
			
			if(this.currentAnim == this.anims.move && !ig.input.state('leftClick')){
				this.currentAnim = this.anims.idle.rewind()
			}
			*/
		},
		kill: function(){
			ig.game.isPlayerDead = true
			this.parent()
		},
		toString: function(){
			return 'this is the player'
		}  
    })
})