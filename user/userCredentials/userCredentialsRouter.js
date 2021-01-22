const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const User = require("./userCredentialsModel.js");
const { isValidForRegister, isValidForLogin, makeJwt, isValidForDelete, isValidForPatch } = require("./utilities");
const SECRET = process.env.JWT_SECRET
const ROUNDS = Number(process.env.BCRYPT_ROUNDS)

router.post("/register", async (req, res) => {
  try {
    const userMatch = await User.findBy({ email: req.body.email });
    const [statusCode, payload] = isValidForRegister(req.body, !userMatch.length);
    if (statusCode === 200) {
      payload.password = bcryptjs.hashSync(payload.password, ROUNDS);
      const newUser = await User.add(payload);
      await res
          .status(statusCode)
          .json({ message: "Account created succesfully", user: newUser});
    } else {
      await res.status(statusCode).json({ message: payload });

    //   console.log(await User.findBy({email: credentials.email}));
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (isValidForLogin(req.body)) {
    User.findBy({ email: email })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({
            userId: user.userId,
            email: user.email,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Wrong combination of email and password",
    });
  }
});

router.patch("/cred", async (req, res) => {
  try {
    const decoded = await jwt.verify(req.headers.authorization, SECRET);
    const payload = req.body;
    //validate
    const [ statusCode, message ] = await isValidForPatch(payload, decoded.subject)
    if (statusCode === 200) {
      //hash password
      payload.password = bcryptjs.hashSync(payload.password, ROUNDS);
      //Make updates
      User.update({ updates: payload, userId: decoded.subject })
        .then((response) => res.status(statusCode).json({message:message, data: response}))
        .catch((error) => res.status(statusCode).json({ message: error.message }));
    } else {
      res.status(statusCode).json({message:message})
    }
  } catch (error) {
    throw error
  }
});

router.delete("/cred", async (req, res) => {
  const decoded = await jwt.verify(req.headers.authorization, SECRET);
  const [statusCode, payload] = await isValidForDelete(req.body, decoded.subject);
    if (statusCode === 200) {
  User.remove(decoded.subject)
    .then((response) =>
      res.status(statusCode).json({ message: "success", count: response })
    )
    .catch((error) => res.status(statusCode).json({ message: error.message }));
} else {
  res.status(statusCode).json({message: payload})
}
});


module.exports = router;
