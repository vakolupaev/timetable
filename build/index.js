"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let states = [
    {
        startTime: 0,
        endTime: 30,
        forward: {
            minInterval: 20,
            neededBuses: 1,
            currentBuses: 0,
        },
        backward: {
            minInterval: 0,
            neededBuses: 0,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 30,
        endTime: 60,
        forward: {
            minInterval: 20,
            neededBuses: 2,
            currentBuses: 0,
        },
        backward: {
            minInterval: 20,
            neededBuses: 1,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 60,
        endTime: 90,
        forward: {
            minInterval: 9,
            neededBuses: 3,
            currentBuses: 0,
        },
        backward: {
            minInterval: 20,
            neededBuses: 3,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 90,
        endTime: 120,
        forward: {
            minInterval: 9,
            neededBuses: 4,
            currentBuses: 0,
        },
        backward: {
            minInterval: 9,
            neededBuses: 3,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 120,
        endTime: 150,
        forward: {
            minInterval: 8,
            neededBuses: 3,
            currentBuses: 0,
        },
        backward: {
            minInterval: 9,
            neededBuses: 3,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 150,
        endTime: 180,
        forward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        backward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 180,
        endTime: 210,
        forward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        backward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 210,
        endTime: 240,
        forward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        backward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 240,
        endTime: 270,
        forward: {
            minInterval: 8,
            neededBuses: 3,
            currentBuses: 0,
        },
        backward: {
            minInterval: 8,
            neededBuses: 3,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 270,
        endTime: 300,
        forward: {
            minInterval: 15,
            neededBuses: 2,
            currentBuses: 0,
        },
        backward: {
            minInterval: 8,
            neededBuses: 4,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
    {
        startTime: 300,
        endTime: 330,
        forward: {
            minInterval: 15,
            neededBuses: 2,
            currentBuses: 0,
        },
        backward: {
            minInterval: 15,
            neededBuses: 2,
            currentBuses: 0,
        },
        busesToAdd: 0,
        busesToRemove: 0,
        neededBuses: 0
    },
];
const TIME_TO_ONE_DIRECT = 22;
const TIME_TO_ND = 14;
let timeLine = [
    [
        {
            type: 'nullDrive',
            id: 0,
            timeStart: 2,
            timeEnd: 2 + TIME_TO_ND,
        }
    ],
    [],
    [],
    [],
    [],
    []
];
const calculateAddOrRemoveBuses = () => {
    for (let i = 0; i < states.length; i++) {
        if (states[i].forward.neededBuses > states[i].backward.neededBuses) {
            states[i].busesToAdd = states[i].forward.neededBuses - states[i].backward.neededBuses;
        }
        else if (states[i].forward.neededBuses < states[i].backward.neededBuses) {
            states[i].busesToRemove += states[i].backward.neededBuses - states[i].forward.neededBuses;
        }
        if (i != 0) {
            if (states[i].neededBuses - states[i - 1].neededBuses > states[i].busesToAdd) {
                states[i].busesToAdd += states[i].neededBuses - states[i - 1].neededBuses;
            }
            else if (states[i - 1].neededBuses - states[i].neededBuses > states[i].busesToRemove) {
                states[i].busesToRemove += states[i - 1].neededBuses - states[i].neededBuses;
            }
        }
    }
};
const calculateNeededBuses = () => {
    for (let i = 0; i < states.length; i++) {
        states[i].neededBuses = Math.max(states[i].forward.neededBuses, states[i].backward.neededBuses);
    }
};
const calculateBusesInPhaseDirect = (phaseIndex, direction) => {
    let BusesCount = 0;
    let filteredBuses = [];
    for (let i = 0; i < timeLine.length; i++) {
        let filtered = timeLine[i].filter(task => {
            if (direction == "driveForward") {
                if (task.timeStart <= states[phaseIndex].endTime && task.timeEnd >= states[phaseIndex].startTime && task.type == "driveForward") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (task.timeStart <= states[phaseIndex].endTime && task.timeEnd >= states[phaseIndex].startTime && task.type == "driveBackward") {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        filteredBuses.push(filtered);
        BusesCount += filtered.length;
    }
    return { count: BusesCount, tasks: filteredBuses };
};
calculateNeededBuses();
calculateAddOrRemoveBuses();
console.log(states);
const algoritm = () => {
    for (let i = 0; i < states.length; i++) {
        let currentBusesF = states[i].forward.currentBuses;
        let neededBusesF = states[i].forward.neededBuses;
        let intervalF = states[i].forward.minInterval;
        let currentBusesB = states[i].backward.currentBuses;
        let neededBusesB = states[i].backward.neededBuses;
        let intervalB = states[i].backward.minInterval;
        let currentBusesFNext = states[i + 1].forward.currentBuses;
        let neededBusesFNext = states[i + 1].forward.neededBuses;
        let intervalFNext = states[i + 1].forward.minInterval;
        let currentBusesBNext = states[i + 1].backward.currentBuses;
        let neededBusesBNext = states[i + 1].backward.neededBuses;
        let intervalBNext = states[i + 1].backward.minInterval;
    }
};
