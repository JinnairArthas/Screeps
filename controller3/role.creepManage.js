var roleCreepManage = {
    
    run:function(characters){
    
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        var character = _.filter(Game.creeps, (creep) => creep.memory.role == characters);
        

        if(character.length >= 1 || Game.spawns['Spawn1'].room.energyAvailable>=550 ){
            var newName = characters + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: characters}});
        }
        else if(character.length >= 1 || Game.spawns['Spawn1'].room.energyAvailable>=350 ){
            var newName = characters + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, 
                {memory: {role: characters}});
        }
        else{
            var newName = characters + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: characters}});
        }

        
        
        
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = roleCreepManage