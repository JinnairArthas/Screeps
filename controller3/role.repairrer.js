var roleRepairrer = {

run: function(creep)
{
    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0)
    {
        //energy pickup point, to be replaced with storage tanks later
      creep.memory.repairing = false;
      creep.say('harvest');
        
    }
    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0)
    {
        creep.say('repairing');
        creep.memory.repairing = true;
        
    }
    if(!creep.memory.repairing)
    {
        var target = creep.room.find(FIND_STRUCTURES,{
            filter:(structure) =>{
                return structure.structureType == STRUCTURE_CONTAINER && structure.storeCapacity > 0;
            }
        })
        if(target.length >0)
        {
            if(creep.withdraw(target[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
            
    }
    else
    {
        
        var target = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.hits<structure.hitsMax && structure.structureType!= STRUCTURE_WALL}});    
    
        
        if (target.length >0){
            if(creep.repair(target[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
    
}
};

module.exports = roleRepairrer;