BEGIN
    DBMS_CLOUD_AI.SET_PROFILE(
        profile_name=>'MI_OCIAI_PROFILE'
    );
    DBMS_OUTPUT.PUT_LINE('Perfil configurado');
END;