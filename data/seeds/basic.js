const faker = require('faker')
const verbose = false
const totalUsers = process.env.NUM_OF_SEED_USERS || 7000
let safeTotalUsers
if (Number(totalUsers)>7000) {
  safeTotalUsers = 7000
} else {
  safeTotalUsers = Number(totalUsers)
}
console.log(totalUsers,safeTotalUsers);
const instructorUsers = safeTotalUsers * 0.2
const usersEnrolled = safeTotalUsers * 0.95
const classes = instructorUsers*2


function genCred() {
  const fakeCred = []
  for (let i = 0; i < safeTotalUsers; i++) {
    fakeCred.push({
      email: faker.unique(faker.internet.email),
      password: faker.random.words(1)
    })
    if (verbose) {
      console.log('Credentails -->', fakeCred[i]);
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
    if (verbose) {
      console.log('user Data -->', fakeData[i]);
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
    if (verbose) {
      console.log('Class -->', fakeClasses[i]);
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
    if (verbose) {
      console.log('Event details -->', fakeEvents[i], 'i', i);
    }
  }
  // Random enrollements to other classes
  for (i; i < usersEnrolled*2; i++) {
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
    if (verbose) {
      console.log('Event details -->', fakeEvents[i], 'i', i);
    }
  }
  return fakeEvents
}

exports.seed = function(knex) {
  return knex('userCredentials').insert(genCred())
  .then(() => {
    return knex('userData').insert(genData())
  })
  .then(() => {
    return knex('class').insert(genClasses())
  })
  .then(() => {
    return knex('event').insert(genEvent())
  })
};
