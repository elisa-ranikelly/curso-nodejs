const express = require("express");

// SERVE PARA CRIAR ROTAS EM ARQUIVO SEPARADO
const router = express.Router();

const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

require("../models/Postagem");
const Postagem = mongoose.model("postagens");

const {isAdmin}= require("../helps/isAdmin");

router.get("/", isAdmin, (req, res) => {
    res.render("admin/index");
});

router.get("/posts", isAdmin, (req, res) => {
    res.send("Página de posts");
});

router.get("/categorias", isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("admin/categorias", {categorias: categorias});
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect("/admin");
    });
});

router.get("/categorias/add", isAdmin, (req, res) => {
    res.render("admin/addcategoria");
});

router.post("/categorias/nova", isAdmin, async(req, res) => {

    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"});
    }
    const categoriaExistente = await Categoria.findOne({ nome: req.body.nome });

    if(categoriaExistente){
        erros.push({texto: "Nome da categoria já existe"});
    }

    const slugExistente = await Categoria.findOne({ slug: req.body.slug });

    if(slugExistente){
        erros.push({texto: "Slug da categoria já existe"});
    }

    if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros});
    }else{
        const novaCategoria = new Categoria({
            nome: req.body.nome,
            slug: req.body.slug
        });

        await novaCategoria.save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!");
            res.redirect("/admin/categorias");
        });
    }
});

router.get("/categorias/edit/:id", isAdmin, (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria});
    }).catch((erro) => {
        req.flash("error_msg", "Esta categoria não existe");
        res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", isAdmin, (req, res) => {
    Categoria.findById({ _id: req.body._id }).then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;

        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria");
            res.redirect("/admin/categorias");
        });
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria");
        res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar", isAdmin, (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!");
        res.redirect("/admin/categorias");
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria");
        res.redirect("/admin/categorias");
    });
});

router.get("/postagens", isAdmin, (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
         res.render("admin/postagens", {postagens: postagens});
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens");
        redirect("/admin");
    });
});

router.get("/postagens/add", isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("admin/addpostagens", {categorias: categorias});
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário");
        res.redirect("/admin");
    });
});

router.post("/postagens/nova", isAdmin, async (req, res) => {
    var erros = [];

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Título inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"});
    }

    const postExistente = await Postagem.findOne({ titulo : req.body.titulo});

    if(postExistente){
        erros.push({ texto: "Postagem com esse título já existente"})
    };

    if(req.body.categoria == "0"){
        erros.push({ texto: "Categoria inválida, registre uma categoria"});
    }

    if(erros.length > 0){
        res.render("admin/addpostagens", {erros: erros});
    }else{
        const novaPostagem = new Postagem({
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        });

        await novaPostagem.save().then(() => {
        req.flash("success_msg", "Postagem criada com sucesso!");
        res.redirect("/admin/postagens");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao salvar a postagem, verifique se você selecionou uma categoria na hora de realizar o cadastro, tente novamente!");
            res.redirect("/admin/postagens");
        });
    }
});

router.get("/postagens/edit/:id", isAdmin, (req, res) => {
    Postagem.findOne({_id: req.params.id}).lean().then((postagem) => {
        Categoria.find().lean().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem});
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect("/admin/postagens");
        });
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição");
        res.redirect("/admin/postagens");
    });
});

router.post("/postagens/edit", isAdmin, (req, res) => {
    Postagem.findById(req.body.id).then((postagem) => {

        if (!postagem) {
            req.flash("error_msg", "Postagem não encontrada");
            return res.redirect("/admin/postagens");
        }

        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.conteudo = req.body.conteudo
        postagem.descricao = req.body.descricao
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem atualizada com sucesso");
            res.redirect("/admin/postagens");
        }).catch((error) => {
            console.log("Erro ao salvar:", error);
            req.flash("error_msg", "Erro ao atualizar postagem");
            res.redirect("/admin/postagens");
        })
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao salvar a edição");
        res.redirect("/admin/postagens");
    });
});

router.post("/postagens/deletar", isAdmin, (req, res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!");
        res.redirect("/admin/postagens");
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao deletar a postagem");
        res.redirect("/admin/postagens");
    });
});

module.exports = router;