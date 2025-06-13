BEGIN
    -- Usar modelo de LLM
    ASK_CHAT_MODEL(
        P_PROMPT=>'ping (answer me pong!)'
    );

    -- Chatear con database
    CHAT_WITH_DB(
        P_PROMPT=>'give me the list of employees'
    );
END;