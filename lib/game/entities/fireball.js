ig.module(
	'game.entities.fireball'
)
.requires(
	'game.entities.purchasable'
)
.defines(function(){
	
	EntityFireball = EntityPurchasable.extend({
		size: {x: 32, y: 32},
		price: 50,
		target: undefined,
		speed: 600,
		
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		
		init: function(x, y, settings){
			this.parent(x, y, settings)
			
			this.addAnim('inShop' , 1, [0])
			this.addAnim('used' , 0.2, [0,1,2])
			
			if(settings.currentAnim === 'used'){
				this.currentAnim = this.anims.used.rewind()
				
				this.target = settings.target
				
				this.currentAnim.angle = this.angleTo(this.target)
				
				this.updateSpeed()
			}else{
				this.currentAnim = this.anims.inShop.rewind()
			}
			
		},
		
		animSheet: new ig.AnimationSheet('media/sub-weapon/fireball.png', 32, 32),
		
		update: function(){
			this.parent()
			
			if(this.currentAnim === this.anims.inShop){
				if(ig.input.pressed('leftClick') && this.isMouseOverMe() && this.hasEnoughGold()){
					this.killAllBugs()
					this.deductGold()
				}	
			}else if(this.currentAnim === this.anims.used){
			    
			}
		},
		draw: function(){
			this.parent()
			if(this.currentAnim === this.anims.inShop){
				this.drawPrice()
			}
		},
        killAllBugs: function(){
            var bugs = ig.game.getEntitiesByType('EntityBug')
            for( var i = 0; i < bugs.length; i++ ) {
                var bug = bugs[i]
                ig.log(bug)
                if(bug === undefined){ig.log('bug undefined')}
                else{
                    this.spawnFireball(bug)
                }
            }
        },
        spawnFireball: function(bug){
            var x = bug.pos.x + Math.floor((Math.random()*ig.system.realWidth))
            var y = bug.pos.y - Math.floor((Math.random()*ig.system.realHeight))
            
            ig.game.spawnEntity(EntityFireball, x, y, {currentAnim:'used', target: bug})  
        },
        updateSpeed: function(){
            var spdx = Math.cos(this.currentAnim.angle) * this.speed
            var spdy = Math.sin(this.currentAnim.angle) * this.speed
            
            this.vel.x = this.maxVel.x = this.accel.x = spdx
            this.vel.y = this.maxVel.y = this.accel.y = spdy  
        },
        check: function(other){
            if(this.currentAnim === this.anims.inShop){
                return
            }
            if(other.name === 'coinTarget'){
                return
            }
			this.parent(other)
			other.receiveDamage(100)
			this.kill()
		},
        kill: function(){
            this.parent()
        }
		
	})
})
