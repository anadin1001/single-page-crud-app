const { auth, db } = require("../firebase");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    await db.collection("users").doc(userRecord.uid).set({
      id: userRecord.uid,
      name,
      email,
    });

    res.status(201).json({ message: "User registered!", user: userRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

   
    const user = await auth.getUserByEmail(email);

    //pt fiecare autentificare cream un token
    const token = await auth.createCustomToken(user.uid);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password", details: error.message });
  }
};

