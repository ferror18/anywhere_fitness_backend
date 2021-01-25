//Modeules
const faker = require('faker')
//Flags
const verbose = !!Number(process.env.SEED_VERBOSE)?!!Number(process.env.SEED_VERBOSE): false
const showData = !!Number(process.env.SEED_SHOW_DATA)?!!Number(process.env.SEED_SHOW_DATA): false
//Other Environment Var
const limit = Number(process.env.SEED_LIMIT) || 5000
const chunkSize = Number(process.env.SEED_CHUNK_SIZE)|| 5000
const totalUsers = Number(process.env.SEED_USER_AMOUNT_TO_CREATE) || 10000
//Seed Parameters
const safeTotalUsers = totalUsers > limit ? limit : totalUsers
const instructorUsers = safeTotalUsers * 0.2
const usersEnrolled = safeTotalUsers * 0.95
const classes = instructorUsers*2
const totalEvents = usersEnrolled*2


function genCred() {
  const fakeCred = []
  for (let i = 0; i < safeTotalUsers; i++) {
    fakeCred.push({
      email: faker.unique(faker.internet.email),
      password: faker.random.words(1)
    })
    if (showData && verbose) {
      console.log(`Credentails ${Math.floor((i+1)/safeTotalUsers*100)}% complete. Details -->`,fakeCred[i], `  ${i+1}`);
    } if (verbose && !showData) {
      console.log(`Credentails ${Math.floor((i+1)/safeTotalUsers*100)}% complete.`);
    }
  }
  return fakeCred
}

function genData() {
  const fakeData = []
  for (let i = 0; i < safeTotalUsers; i++) {
    const fn = faker.name.firstName()
    const ln = faker.name.firstName()
    fakeData.push({
      "userId": i+1,
      "firstName": fn,
      "lastName": ln,
      "displayedName": fn + ' ' + ln,
      "phone": faker.phone.phoneNumberFormat(1),
      "address": faker.address.streetAddress(),
      dob: faker.date.past(15, "1999-07-09"),
      bio: faker.random.words(50),
      "isInstructor": (true)?(i<instructorUsers):false
    })
    if (showData && verbose) {
      console.log(`User Data ${Math.floor((i+1)/safeTotalUsers*100)}% complete. Details -->`,fakeData[i], `  ${i+1}`);
    } if (verbose && !showData) {
      console.log(`User Data ${Math.floor((i+1)/safeTotalUsers*100)}% complete.`);
    }
  }
  return fakeData

}

function genClasses() {
  const fakeClasses = []
  for (let i = 0; i < classes; i++) {
    fakeClasses.push({
      "title": faker.random.words(7),
      "description": faker.random.words(40),
      "owner": faker.random.number({min:1,max:instructorUsers}),
      "day": faker.random.number(6),
      "start": faker.random.number(23),
      "end": faker.random.number(23),
      "startM": faker.random.number(59),
      "endM": faker.random.number(59),
      "lat": faker.random.number({min:-90, max:90}),
      "lon": faker.random.number({min:-180, max:180}),
      cost: faker.random.number({min:0, max:999})
    })
    if (showData && verbose) {
      console.log(`Classes ${Math.floor((i+1)/classes*100)}% complete. Details -->`,fakeClasses[i], `  ${i+1}`);
    } if (verbose && !showData) {
      console.log(`Classes ${Math.floor((i+1)/classes*100)}% complete.`);
    }
  }
  return fakeClasses
}

function genEvent() {
  const fakeEvents = []
  const enrolledRecord = {}
  let i = 0
  // Everyone enrolled in class 1
  for (i; i < usersEnrolled; i++) {
    fakeEvents.push({classId: 1,userId: i+1})
    if (showData && verbose) {
      console.log(`Events ${Math.floor((i+1)/(totalEvents)*100)}% complete. Details -->`,fakeEvents[i], `  ${i+1}`);
    } if (verbose && !showData) {
      console.log(`Events ${Math.floor((i+1)/(totalEvents)*100)}% complete.`);
    }
  }
  // Random enrollements to other classes
  for (i; i < totalEvents; i++) {
    let newEvent = {
      "classId": faker.random.number({min:2, max:classes}),
      "userId": faker.random.number({min:1, max:safeTotalUsers})
    }
    
    if (enrolledRecord[`userId${newEvent.userId}classId${newEvent.classId}`]) {
      i--;
      continue
    }
    enrolledRecord[`userId${newEvent.userId}classId${newEvent.classId}`] = true

    fakeEvents.push(newEvent)
    if (showData && verbose) {
      console.log(`Events ${Math.floor((i+1)/(totalEvents)*100)}% complete. Details -->`,fakeEvents[i], `  ${i+1}`);
    } if (verbose && !showData) {
      console.log(`Events ${Math.floor((i+1)/(totalEvents)*100)}% complete.`);
    }
  }
  if (showData) {
    console.log(`Totals--> \nUser Credentials:${Math.ceil(safeTotalUsers)}\nUser Data:${Math.ceil(safeTotalUsers)}\nClasses:${Math.ceil(classes)}\nEvent:${Math.ceil(totalEvents)}\nChuck Size:${chunkSize}\nLimit:${limit}\nTotal Users${totalUsers}`);
  } else {
    console.log(`Totals--> User Credentials:${Math.ceil(safeTotalUsers)} | User Data:${Math.ceil(safeTotalUsers)} | Classes:${Math.ceil(classes)} | Event:${Math.ceil(totalEvents)}`);
  }
  return fakeEvents
}

exports.seed = function(knex) {
  return knex.batchInsert('userCredentials', genCred(), chunkSize)
  .then(() => {
    return knex.batchInsert('userData', genData(), chunkSize)
  })
  .then(() => {
    return knex.batchInsert('class', genClasses(), chunkSize)
  })
  .then(() => {
    return knex.batchInsert('event', genEvent(), chunkSize)
  })
};