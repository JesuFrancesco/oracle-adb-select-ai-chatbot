DECLARE
    LOCATION_URI VARCHAR2(200) := '...';
    ONNX_MOD_FILE VARCHAR2(100) := 'all_MiniLM_L12_v2.onnx';
    MODEL_NAME VARCHAR2(500);
BEGIN
    DBMS_OUTPUT.PUT_LINE('El modelo ONNX a buscar en Object Storage es: ' || ONNX_MOD_FILE);

    -- Setear MODEL_NAME
    SELECT UPPER(REGEXP_SUBSTR(ONNX_MOD_FILE, '[^.]+')) INTO MODEL_NAME FROM dual;

    DBMS_OUTPUT.PUT_LINE('El modelo será cargado y almacenado con el nombre: ' || MODEL_NAME);

    -- Almacenar modelo ONNX en DBMS_VECTOR
    DBMS_VECTOR.LOAD_ONNX_MODEL_CLOUD(
        model_name => MODEL_NAME,
        credential => 'MI_OCIAI_CRED',
        uri => LOCATION_URI || ONNX_MOD_FILE,
        metadata => JSON('{"function" : "embedding", "embeddingOutput" : "embedding" , "input": {"input": ["DATA"]}}')
    );

    DBMS_OUTPUT.PUT_LINE('Modelo cargado exitosamente bajo nombre: ' || MODEL_NAME);
END;
/

