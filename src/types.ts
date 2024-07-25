type nullDrive = {
	type: 'nullDrive';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type fiveMinutes = {
	type: 'fiveMinutes';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type driveF = {
	type: 'driveForward';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type driveB = {
	type: 'driveBackward';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type dinner = {
	type: 'dinner';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type relax = {
	type: 'relax';
	id: number;
	timeStart: number;
	timeEnd: number;
}

type change = {
	type: 'change';
	id: number;
	timeStart: number;
	timeEnd: number;
}


export { nullDrive, fiveMinutes, driveF, driveB, dinner, relax, change }