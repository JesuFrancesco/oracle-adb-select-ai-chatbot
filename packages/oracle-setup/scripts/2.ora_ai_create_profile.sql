BEGIN
    DBMS_CLOUD_AI.DROP_PROFILE(
        profile_name => 'MI_OCIAI_PROFILE'
    );
    DBMS_CLOUD_AI.CREATE_PROFILE(
        profile_name => 'MI_OCIAI_PROFILE',
        attributes => '{
            "provider": "oci",
            "credential_name": "MI_OCIAI_CRED",
            "object_list": [
                {"owner": "BANCOLIMA", "name": "employees"}
            ],
            "model": "meta.llama-4-scout-17b-16e-instruct"
        }'
    );
    DBMS_OUTPUT.PUT_LINE('Perfil de DBMS_CLOUD_AI creado');
END;