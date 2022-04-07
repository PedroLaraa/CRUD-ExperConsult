CREATE TABLE descricaoequipamentos( 
    modelo VARCHAR(50),
    fabricante VARCHAR(30), 
    potencia VARCHAR(30),
    capacidade VARCHAR(30),
    consumo VARCHAR(50)
);

INSERT INTO descricaoequipamentos(modelo,fabricante,
potencia, capacidade, consumo) VALUES(
    "EVM-5006",
    "MAJA",
    "1 CV - 0,75 KW",
    "3 PÇ / MIN",
    "Consumo - Ar comprimido: 280L / Min"
);

SELECT * FROM descricaoequipamentos; // EXIBE TODOS OS DADOS DA TABELA

SELECT * FROM descricaoequipamentos WHERE fabricante = "JARVIS"; // FILTRO DE BUSCA

DELETE FROM descricaoequipamentos WHERE fabricante != "JARVIS"; // DELETA REGISTROS DO DB

UPDATE  descricaoequipamentos SET modelo = "EVM-5006" WHERE modelo = "EVM-50"; // FAZER ATUALIZAÇÃO DE REGISTROS NO BANCO DE DADOS
