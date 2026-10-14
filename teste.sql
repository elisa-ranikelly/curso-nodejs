CRIAR TABELA:

CREATE TABLE usuarios(
    id int primary key,
    nome varchar(100),
    email varchar (100),
    idade int 
);

INSERIR DADOS NA TABELA:

INSERT INTO usuarios(id, nome, email, idade) VALUES(
    1, 
    "Elisa",
    "email@teste.com",
    21
);

INSERT INTO usuarios(id, nome, email, idade) VALUES(
    2, 
    'Wallasson',
    'email@teste.com',
    25
);

ESPECIFICAR UMA COISA:

SELECT * FROM usuarios WHERE idade >= 21;

DELETA REGISTROS DA TABELA:

DELETE FROM usuarios WHERE idade <= 20;

DELETE FROM usuarios; -> DELETA TODOS OS REGISTROS

ATUALIZAR DADOS DA TABELA:

UPDATE usuarios SET email = 'email@teste2.com' WHERE id = 2;