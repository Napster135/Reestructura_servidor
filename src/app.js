const express = require ( "express")
const handlebars = require ( "express-handlebars")
const viewsRouter = require ( "./routes/viewsRouter.js")
const productRouter = require ( "./routes/productsRouter.js")
const cartRouter = require ( "./routes/cartsRouter.js")
const sessionRouter = require ( "./routes/sessionsRouter.js")
const passport = require ( "passport")
const initializePassport = require ( "./config/passportConfig.js")
const config = require ( "./config/config.js")
const MongoStore = require ( "connect-mongo")
const mongoose = require ( "mongoose")
const session = require ( "express-session")
const { fileURLToPath } = require ( "url")
const { dirname } = require ( "path")
const { dbConnection } = require ( "./config/dbconnection.js")

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

async function main() {
  await dbConnection();
  // Coloca aquí el resto de tu lógica una vez que se haya establecido la conexión.
}

main();

const MONGO_URL = config.mongo.uri;
const PORT = config.apiserver.port || 8080;
const app = express();
const server = app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// Configuración de la conexión a MongoDB para las sesiones
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.mongo.dbname,
});

// Utiliza MongoStore como una función para crear el almacén de sesiones
const mongoStore = MongoStore.create({
  mongoUrl: MONGO_URL,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  dbName: config.mongo.dbname,
  ttl: 3600,
});

app.use(
  session({
    store: mongoStore, // Utiliza el almacén de sesiones creado con MongoStore
    secret: "marvel",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();

/* const io = new Server(server); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public")); //Important for use js y css files on templates

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);

app.use(passport.initialize());
app.use(passport.session());

// io.on('connection', socket =>{
//     console.log("New connected client")

//     socket.on('newProduct', async (product) => {
//         await productManager.addProduct(product);

//         io.emit('updateProducts', await productManager.getProducts());
//     });

//     socket.on('deleteProduct', async (id) => {
//         await productManager.deleteProductById(id);

//         io.emit('updateProducts', await productManager.getProducts());
//     });

//     socket.on("messages", data =>{
//         logs.push({socketid: socket.id, mesage: data})
//         socketServerIO.emit('log', {logs})
//     })

// });