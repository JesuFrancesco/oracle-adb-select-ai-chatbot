CREATE OR REPLACE PROCEDURE ask_chat_model(
    p_prompt IN VARCHAR2
) AS
    v_result VARCHAR2(8192);
BEGIN
    v_result := DBMS_CLOUD_AI.GENERATE(
        prompt => p_prompt,
        profile_name => 'MI_OCIAI_PROFILE',
        action => 'chat'
    );
    
    DBMS_OUTPUT.PUT_LINE('Respuesta AI:');
    DBMS_OUTPUT.PUT_LINE('------------------------');
    DBMS_OUTPUT.PUT_LINE(v_result);
    DBMS_OUTPUT.PUT_LINE('------------------------');
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('Verifica que el package DBMS_CLOUD_AI está disponible y el perfil existe.');
END ask_chat_model;
/

CREATE OR REPLACE PROCEDURE chat_with_db(
    p_prompt IN VARCHAR2
) AS
    v_result VARCHAR2(8192);
BEGIN
    v_result := DBMS_CLOUD_AI.GENERATE(
        prompt => p_prompt,
        profile_name => 'MI_OCIAI_PROFILE',
        action => 'narrate'
    );
    
    DBMS_OUTPUT.PUT_LINE('Respuesta AI:');
    DBMS_OUTPUT.PUT_LINE('------------------------');
    DBMS_OUTPUT.PUT_LINE(v_result);
    DBMS_OUTPUT.PUT_LINE('------------------------');
    
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('Verifica que el package DBMS_CLOUD_AI está disponible y el perfil existe.');
END chat_with_db;
/

