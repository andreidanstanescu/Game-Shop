/*const express = require('express')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
const app = express()
const port = 3000


app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("db1.json"))["dogs"];
  }
  
  // Functia de scriere in fisierul db.json
  function writeJSONFile(content) {
    fs.writeFileSync(
      "db1.json",
      JSON.stringify({ dogs: content }),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  function makeid(length)
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for(var i=0; i < length; i++)
      {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
  
      return text;
  }

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


  
function getNewID() {
  return Math.random().toString(36).substring(3);
}
  app.post("/dogs", (req, res) => {
    const dogList = readJSONFile();
    const newdog = req.body;
    newdog.id = getNewID();
    const newdogList = [...dogList, newdog];
    writeJSONFile(newdogList);
    res.json(newdog);
  });


//read one
// Read One
app.get("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    console.log(dogsList.length-1);
    // Completati cu codul vostru aici
    var found = false;
    for(var i=0;i<dogsList.length;i++)
        if(dogsList[i].id == req.params.id){
            res.send(dogsList[i]);
            found = true;
            break;
        }
    if(found === false)
        res.send("Not found");
  });

//read all
app.get("/dogs", (req, res) => {
    const dogsList = readJSONFile();
    res.send(dogsList);
});

// Update
app.put("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    // Completati cu codul vostru aici
    var found = false;
    for(var i=0;i<dogsList.length;i++)
        if(dogsList[i].id == req.params.id){
            found = true;
            dogsList[i].name = req.body.name;
            dogsList[i].img = req.body.img;
            res.send(dogsList[i]);
            break;
        }
    writeJSONFile(dogsList);
    if(!found) 
    res.send("Not found");
  });

// Delete
app.delete("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    var found = false;
    for(var i=0;i<dogsList.length;i++)
        if(dogsList[i].id == req.params.id){
            dogsList.splice(i, 1);
            found = true;
            break;
        }
    writeJSONFile(dogsList);
    if(!found) res.send("Not found");
    else res.send("Deleted");
})

app.listen("3000", () => {
  console.log("Server started at: http://localhost:3000");
});
*/


const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

function getNewID() {
  return Math.random().toString(36).substring(3);
}


// Create
app.post("/dogs", (req, res) => {
    const dogList = readJSONFile();
    const newdog = req.body;
    newdog.id = getNewID();
    const newdogList = [...dogList, newdog];
    writeJSONFile(newdogList);
    res.json(newdog);
  });
  
  // Read One
  app.get("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    const id = req.params.id;
    let idFound = false;
    let founddog;
  
    dogsList.forEach(dog => {
      if (id === dog.id) {
        idFound = true;
        founddog = dog;
      }
    });
  
    if (idFound) {
      res.json(founddog);
    } else {
      res.status(404).send(`dog ${id} was not found`);
    }
  });
  
  // Read All
  app.get("/dogs", (req, res) => {
 
    const dogsList = readJSONFile();
    res.json(dogsList);
  });
  
  // Update
  app.put("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    // Completati cu codul vostru aici
    var found = false;
    for(var i=0;i<dogsList.length;i++)
        if(dogsList[i].id == req.params.id){
            found = true;
            dogsList[i].name = req.body.name;
            dogsList[i].img = req.body.img;
            res.send(dogsList[i]);
            break;
        }
    writeJSONFile(dogsList);
    if(!found) 
    res.send("Not found");
  });
  
  // Delete
  app.delete("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    const id = req.params.id;
    const newdogsList = dogsList.filter((dog) => dog.id !== id)
  
    if (dogsList.length !== newdogsList.length) {
      res.status(200).send(`dog ${id} was removed`);
      writeJSONFile(newdogsList);
    } else {
      res.status(404).send(`dog ${id} was not found`);
    }
  });
  
  // Functia de citire din fisierul db.json
  function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["dogs"];
  }
  
  // Functia de scriere in fisierul db.json
  function writeJSONFile(content) {
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ dogs: content }),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'whisper',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  app.post("/user/login", (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.status(400).send({message: "Invalid data"});
        return;
    }
    
    const users = readUsers();
    for (idx in users) {
        if (users[idx].email == req.body.email) {
            let user = {
                'name' : users[idx].name,
                'auth' : users[idx].auth,
                'ip' : req.ip
            };
            res.send(user)
            return;
        }
    }
    res.status(400).send({message: "Not found"})
});

var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    //document.getElementById("userip").value=ipInfo;
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});

app.listen("3000", () => {
  console.log("Server started at: http://localhost:3000");
});