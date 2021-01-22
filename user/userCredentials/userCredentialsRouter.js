const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const User = require("./userCredentialsModel.js");
const { isValidCredentials, isValidLoging } = require("../userUtilities");
const SECRET = process.env.JWT_SECRET
const ROUNDS = Number(process.env.BCRYPT_ROUNDS)

router.post("/register", async (req, res) => {
  try {
    // console.log(require("../userUtilities"));
    const userMatch = await User.findBy({ email: req.body.email });
    const [statusCode, payload] = isValidCredentials(req.body, !userMatch.length);
    if (statusCode === 201) {
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
    console.log(req.body);
  if (isValidLoging(req.body)) {
    User.findBy({ email: email })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({
            id: user.id,
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

router.patch("/user", async (req, res) => {
  const decoded = await jwt.verify(req.headers.authorization, SECRET);
  const payload = req.body;
  payload.password = await bcryptjs.hashSync(payload.password, ROUNDS);
  User.update({ updates: await payload, id: await decoded.subject })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.json({ message: error.message }));
});

router.delete("/user", (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, SECRET);
  User.remove(decoded.subject)
    .then((response) =>
      res.status(200).json({ message: "success", count: response })
    )
    .catch((error) => res.json({ message: error.message }));
});

function makeJwt(user) {
  const payload = {
    subject: user.id,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, SECRET, options);
}
module.exports = router;
