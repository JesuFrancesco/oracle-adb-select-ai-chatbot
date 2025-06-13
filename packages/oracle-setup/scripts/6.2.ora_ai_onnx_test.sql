-- select * from user_mining_models;

select VECTOR_EMBEDDING(
    ALL_MINILM_L12_V2 
    using 'Somos libres, seámoslo siempre, / seámoslo siempre / y antes niegue sus luces, / sus luces, sus luces el Sol / que faltemos al voto solemne / que la Patria al Eterno elevó / que faltemos al voto solemne / que la Patria al Eterno elevó / que faltemos al voto solemne / que la Patria al Eterno elevó' 
    as DATA
) as embedding;