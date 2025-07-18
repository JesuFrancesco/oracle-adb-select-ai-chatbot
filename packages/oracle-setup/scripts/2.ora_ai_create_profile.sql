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
                {"owner": "BANCOLIMA", "name": "employees"},
                {"owner": "BANCOLIMA", "name": "cambio_divisas"},
                {"owner": "BANCOLIMA", "name": "cliente_cuentas"},
                {"owner": "BANCOLIMA", "name": "cliente_planespension"},
                {"owner": "BANCOLIMA", "name": "clientes"},
                {"owner": "BANCOLIMA", "name": "cuentas"},
                {"owner": "BANCOLIMA", "name": "depositos"},
                {"owner": "BANCOLIMA", "name": "fianzas"},
                {"owner": "BANCOLIMA", "name": "fondos_inversion"},
                {"owner": "BANCOLIMA", "name": "hipotecas"},
                {"owner": "BANCOLIMA", "name": "leasing"},
                {"owner": "BANCOLIMA", "name": "pago_servicios"},
                {"owner": "BANCOLIMA", "name": "planes_pension"},
                {"owner": "BANCOLIMA", "name": "prestamos"},
                {"owner": "BANCOLIMA", "name": "tarjetas_credito"},
                {"owner": "BANCOLIMA", "name": "transferencias"}
            ],
            "model": "meta.llama-4-scout-17b-16e-instruct"
        }'
    );
    DBMS_OUTPUT.PUT_LINE('Perfil de DBMS_CLOUD_AI creado');
END;