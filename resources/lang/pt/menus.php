<?php

return [
    /*
      |--------------------------------------------------------------------------
      | Menus Language Lines
      |--------------------------------------------------------------------------
      |
      | The following language lines are used in menu items throughout the system.
      | Regardless where it is placed, a menu item can be listed here so it is easily
      | found in a intuitive way.
      |
      |--------------------------------------------------------------------------
     */

    'backend' => [
        'access' => [
            'title' => 'Gestão de acesso',
            'roles' => [
                'all' => 'Todos os Papéis',
                'create' => 'Criar Papel',
                'edit' => 'Editar Papel',
                'management' => 'Gerenciamento de Papéis',
                'main' => 'Papéis',
            ],
            'users' => [
                'all' => 'Todos os Usuários',
                'change-password' => 'Alterar Senha',
                'create' => 'Criar Usuário',
                'deactivated' => 'Usuários Desativados',
                'deleted' => 'Usuários Excluídos',
                'edit' => 'Editar Usuário',
                'main' => 'Usuários',
                'view' => 'Visualizar Usuário',
            ],
        ],

        'document' => [
            'title' => 'Documentos',
            'management_agency' => 'Documentos nesta agência',
            'managememnt' => 'Todos Documentos',
            'main' => 'Documentos'
        ],

        'log-viewer' => [
            'main' => 'Visualizador de Log',
            'dashboard' => 'Painel de Controle',
            'logs' => 'Logs',
        ],

        'sidebar' => [
            'agency' => 'Agências',
            'dashboard' => 'Painel de Controle',
            'general' => 'Geral',
            'history' => 'History',
            'system' => 'Sistema',
            'documents' => 'Documentos'
        ],
    ],
    'language-picker' => [
        'language' => 'Idioma',
        /*
         * Add the new language to this array.
         * The key should have the same language code as the folder name.
         * The string should be: 'Language-name-in-your-own-language (Language-name-in-English)'.
         * Be sure to add the new language in alphabetical order.
         */
        'langs' => [
            'en' => 'Inglês (English)',
            'fr' => 'Francês (Français)',
            'pt' => 'Português',
        ],
    ],
];
