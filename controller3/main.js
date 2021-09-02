var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCreepManage = require('role.creepManage')
var roleRepairrer = require('role.repairrer')

module.exports.loop = function () {
    
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairrer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairrer');
    if (harvester.length <2){
        roleCreepManage.run('harvester');
    }
    else if (upgrader.length <3){
        roleCreepManage.run('upgrader');
    }
    else if (builder.length <3){
        roleCreepManage.run('builder');
    }
    else if (repairrer.length <1){
        roleCreepManage.run('repairrer');
    }

    var tower = Game.getObjectById('61308efc0337536cd45d21c9');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairrer') {
            roleRepairrer.run(creep);
        }
    }
}