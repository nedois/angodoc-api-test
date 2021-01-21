<?php

Breadcrumbs::for('frontend.admin.dashboard', function ($trail) {
    $trail->push(__('strings.backend.dashboard.title'), route('frontend.admin.dashboard'));
});

require __DIR__.'/auth.php';
require __DIR__.'/log-viewer.php';
