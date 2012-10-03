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
	'game.entities.bugB',
	'game.entities.tryAgain',
	'game.entities.coin',
	'game.entities.hit1',

//	Levels
	'game.levels.mainLvl',
	'game.levels.selectLvl',
	'game.levels.testLvl',
	'game.levels.game',
	
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
	waves: 0,
	isPlayerDead: false,
	currentLvl: 0,
	levels: [],
	bugsLocations: [],
	//states: ['main', 'select', 'game', 'score'],
	states: {main:'main', select:'select', game:'game', score:'score'},
	currentState: 'main',
	timer: undefined,
	score: 0,
	gold:0,
	upgradables: 'empty',
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
		if(ig.input.pressed('debug')){
			console.trace()
		}
		// Add your own, additional update code here
		if(this.currentState === this.states.game){			//game state
			//if((this.numOfBugs === this.bugsDestroyed) || this.isPlayerDead){
			if(this.isPlayerDead){
				//this.switchLevel(this.states[1])
				this.currentState = this.states.score
				ig.game.spawnEntity(EntityTryAgain, ig.system.width/2-48, ig.system.height/2+90)
				this.timer.pause()
			}
			
			var bugs = this.bugsLocations
			for(var i=0;i<bugs.length;i++){
				var b = bugs[i]
				if(this.timer.delta() >= b.time && b.spawned === false){
					ig.mark('spawn entity')
					b.spawned = true
					b = ig.game.spawnEntity( b.type, b.setting.x, b.setting.y, b.setting)
					b.zIndex = 10
					ig.game.sortEntitiesDeferred()
					ig.log('bug zIndex: '+b.zIndex)
				}
			}
			
		}else if(this.currentState === this.states.select){		//select state
		
		}else if(this.currentState === this.states.main){		//main state
			
		}else if(this.currentState === this.states.score){		//score state
			
		}
	},
	
	draw: function() {
		
		// Draw the titleImage(background Image) first.
        //this.backgroundImg.draw(0,0);
		
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		if(this.currentState === this.states.game){			//game state
			this.oFont.draw('Score: '+this.score, 10, 10, ig.Font.ALIGN.LEFT)
			this.oFont.draw('Gold: '+this.gold, 420, 10, ig.Font.ALIGN.LEFT)
		}else if(this.currentState === this.states.select){		//select state
			var stageNums = this.getEntitiesByType( 'EntityStageNum' );
			stageNums.sort(this.compareStageNums)
			for(var i=0; i<stageNums.length; i++){
				var s = stageNums[i]
				this.oFont.draw(s.targetLvl, s.x, s.y, ig.Font.ALIGN.LEFT)
			}
		}else if(this.currentState === this.states.main){		//main state
		
		}else if(this.currentState === this.states.score){		//score state
			var finalScore = 'Score: '+this.score+'\nTime: '+this.timer.delta().toFixed(2)+' Seconds\nBugs Killed: '+this.bugsDestroyed;
			
			this.oFont.draw(finalScore, ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER)
		}
	},
	
	lvlBugsEntities: function (lvlNum){
		var bugsLocations
		
		if(lvlNum == 1){
			bugsLocations = [
			                 {'type':EntityBugA, 'setting': {x: -32, y: -32, zIndex: 10}, 'time': 2, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: -32, y: 200, zIndex: 10}, 'time': 5, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 424, y: 360, zIndex: 10}, 'time': 9, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 172, y: 340, zIndex: 10}, 'time': 12, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 160, y: 340, zIndex: 10}, 'time': 12, 'spawned': false},	
			                 ]
		}else{
			bugsLocations = [
			                 {'type':EntityBugA, 'setting': {x: -32, y: 176, zIndex: 10}, 'time': 2, 'spawned': false},	
			                 {'type':EntityBugB, 'setting': {x: 232, y: 0, zIndex: 10}, 'time': 5, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 500, y: 172, zIndex: 10}, 'time': 9, 'spawned': false},	
			                 {'type':EntityBugA, 'setting': {x: 232, y: 324, zIndex: 10}, 'time': 12, 'spawned': false},	
			                 {'type':EntityBugB, 'setting': {x: -44, y: 176, zIndex: 10}, 'time': 12, 'spawned': false},	
			                 ]
		}
		
		return bugsLocations
	},
	
	switchLevel: function(lvlNum){
		//if(this.states[1] === lvlNum){
		//	this.loadLevel(LevelSelectLvl)
		//	return
		//}
		// Steps:
		// 1- load the level
		// 2- load bugs
		// 3- count the bugs
		// 4- set bugsDestroyed to 0
		//this.loadLevel(this.levels[lvlNum-1].level)
		this.loadLevel(LevelGame)
		this.bugsLocations = this.lvlBugsEntities(this.currentLvl);
		this.numOfBugs = this.bugsLocations.length
		this.bugsDestroyed = 0
		this.timer.reset()
		this.currentState = this.states.game
		this.score = 0
	},
	
	start: function() {
		this.loadLevel(LevelGame)
		this.bugsLocations = this.lvlBugsEntities(this.currentLvl);
		this.numOfBugs = this.bugsLocations.length
		this.bugsDestroyed = 0
		this.timer.reset()
		this.currentState = this.states.game
		this.score = 0
		this.gold = 0
	},
	addScore: function(entity){
		this.bugsDestroyed = this.bugsDestroyed + 1
		this.score += entity.scoreValue
		this.gold += entity.scoreValue
		this.spawnEntity(EntityCoin, entity.pos.x, entity.pos.y) 
	},
	
	applyDamage: function(entity){
		
		if(this.upgradables === 'empty'){
			ig.log('upgradables init')
			try{
				this.upgradables = this.getEntitiesByType('EntityUpgradable')
			}catch(e){
				ig.log('error occured')
				ig.log(e)
				console.trace()
			}
		}
		for(var i=0;i<upgradables.length;i++){
			this.upgradables[i].applyEffect(entity)
			if(entity._killed){
				break
			}
		}
		
		ig.game.spawnEntity(EntityHit1, ig.input.mouse.x-6, ig.input.mouse.y-6)
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

function trace(e, fn) { e.stackTrace = e.stackTrace || []; e.stackTrace.push(fn); return e; }
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 2 );

});
