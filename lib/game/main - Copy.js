ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.outlinedfont',
//	Debug module
//	'impact.debug.debug',
	
//	Entities
	'game.entities.bugA',
	
//	Levels
	'game.levels.mainLvl',
	'game.levels.selectLvl',
	'game.levels.testLvl',
	
//	Debug
	'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	oFont: new OutlinedFont('media/outlinedfont.png', 1),
	
	//Game Spacific variables
	numOfBugs: 0,
	bugsDestroyed: 0,
	isPlayerDead: false,
	currentLvl: 0,
	levels: [],
	bugsLocations: [],
	states: ['main', 'select', 'game'],
	currentState: 'main',
	timer: undefined,
	score: 0,
	
	//backgroundImg: new ig.Image( 'media/1.png' ),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
		ig.input.bind(ig.KEY.SPACE, 'shoot')
		ig.input.bind(ig.KEY.D, 'debug')

		ig.input.initMouse()
		ig.input.bind(ig.KEY.MOUSE1, 'leftClick')

		this.loadLevel(LevelMainLvl);

		this.levels = [
		               {'level':LevelTestLvl, 'finished': false}
		               ]
					   
		this.timer = new ig.Timer()
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		if(this.currentState === this.states[2]){			//game state
			if((this.numOfBugs === this.bugsDestroyed) || this.isPlayerDead){
				this.switchLevel(this.states[1])
			}
			
			var bugs = this.bugsLocations
			for(var i=0;i<bugs.length;i++){
				var b = bugs[i]
				if(this.timer.delta() >= b.time && b.spawned === false){
					ig.mark('spawn entity')
					ig.game.spawnEntity( b.type, b.setting.x, b.setting.y)
					b.spawned = true
				}
			}
			
		}else if(this.currentState === this.states[1]){		//select state
		
		}else if(this.currentState === this.states[0]){		//main state
			var x = ig.system.width/2,
			y = ig.system.height/2;
		
			//this.font.draw( 'It Works!', 0, 0, ig.Font.ALIGN.CENTER);
		}
	},
	
	draw: function() {
		
		// Draw the titleImage(background Image) first.
        //this.backgroundImg.draw(0,0);
		
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		if(this.currentState === this.states[2]){			//game state
			this.oFont.draw('Score: '+this.score, 10, 10, ig.Font.ALIGN.LEFT)
		}else if(this.currentState === this.states[1]){		//select state
			var stageNums = this.getEntitiesByType( 'EntityStageNum' );
			stageNums.sort(this.compareStageNums)
			for(var i=0; i<stageNums.length; i++){
				var s = stageNums[i]
				this.oFont.draw(s.targetLvl, s.x, s.y, ig.Font.ALIGN.LEFT)
			}
		}else if(this.currentState === this.states[0]){		//main state
		
		}
	},
	
	lvlBugsEntities: function (lvlNum){
		var bugsLocations
		
		if(lvlNum == 1){
			bugsLocations = [
			                 {'type':EntityBugA, 'setting': {x: -32, y: -32}, 'time': 2, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: -32, y: 200}, 'time': 5, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 424, y: 360}, 'time': 9, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 172, y: 340}, 'time': 12, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 160, y: 340}, 'time': 12, 'spawned': false},	
			                 ]
		}
		
		return bugsLocations
	},
	
	switchLevel: function(lvlNum){
		if(this.states[1] === lvlNum){
			this.loadLevel(LevelSelectLvl)
			return
		}
		// Steps:
		// 1- load the level
		// 2- load bugs
		// 3- count the bugs
		// 4- set bugsDestroyed to 0
		this.loadLevel(this.levels[lvlNum-1].level)
		this.bugsLocations = this.lvlBugsEntities(this.currentLvl);
		this.numOfBugs = this.bugsLocations.length
		this.bugsDestroyed = 0
		this.timeElapsed = 0
		this.currentState = this.states[2]
		this.score = 0
	},
	/* 
		This function recieve two stageNum type entity and return the one with lower .targetLvl property.
		The mechanisim will reverse if acc is false
	*/
	compareStageNums: function(a, b, acc){
		if(a.targetLvl > b.targetLvl && acc){
			return a
		}else{
			return b
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 2 );

});
