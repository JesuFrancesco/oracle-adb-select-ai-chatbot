BEGIN
    -- DBMS_CLOUD.DROP_CREDENTIAL('MI_OCIAI_CRED');
    -- Nota: Crear API Key para completar creds en User Settings > Tokens and keys > Add API Key
    DBMS_CLOUD.CREATE_CREDENTIAL(
        credential_name => 'MI_OCIAI_CRED',
        user_ocid => '',
        tenancy_ocid => '',
        private_key => '',
        fingerprint => ''
    );
    
    DBMS_OUTPUT.PUT_LINE('Credencial MI_OCIAI_CRED creada exitosamente.');
END;