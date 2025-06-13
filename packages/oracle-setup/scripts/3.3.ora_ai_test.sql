SELECT DBMS_CLOUD_AI.GENERATE(
    prompt => 'mira este emoji 🥚',
    profile_name => 'MI_OCIAI_PROFILE',
    action => 'chat'
) from dual;