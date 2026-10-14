// CARREGANDO MÓDULOS
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("./models/Postagem");
const Postagem = mongoose.model("postagens");
require("./models/Categoria");
const Categoria = mongoose.model("categorias");
const passport = require("passport");
require("./config/auth")(passport);


// CONFIGURAÇÕES

// Session:
app.use(session({
    secret: "secreta",
    resave: true,
    saveUninitialized: true
}));

// Passport:
app.use(passport.initialize());
app.use(passport.session());

// Flash:
app.use(flash());

// Middleware:
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// Body parser:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars:
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose:
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("Conectado ao MongoDB!");
}).catch((erro) => {
    console.log("Erro ao se conectar com o MongoDB: " + erro);
});

// Public:
app.use(express.static(path.join(__dirname, "public")));

// ROTAS

app.get("/", (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("index", {postagens: postagens});
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/404");
    });
});

app.get("/404", (req, res) => {
    res.send("Erro 404!");
});

// Rotas admin:
const admin = require("./rotas/admin");
app.use("/admin", admin);

// Rotas user:
const usuario = require("./rotas/usuario");
app.use("/usuarios", usuario);

// Rotas categorias
app.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("categorias/index", {categorias: categorias});
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao carregar categorias");
        res.redirect("/");
    });
});

app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
        if(categoria) {
            Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria});
            }).catch((error) => {
                req.flash("error_msg", "Houve um erro ao listar os posts");
                res.redirect("/");
            });
        }else{
            req.flash("error_msg", "Esta categoria não existe.");
            res.redirect("/");
        }
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria.");
        res.redirect("/");
    });
});



const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na url http://localhost:8081");
});