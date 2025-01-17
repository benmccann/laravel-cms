<?php

use Illuminate\Support\Facades\Route;
use Jkli\Cms\Http\Controller\PageController;
use Jkli\Cms\Http\Controller\PageShellController;
use Jkli\Cms\Http\Controller\PublishPageController;

Route::get('/', [PageController::class, "index"])
    ->name('pages.index');


Route::get('/create', [PageController::class, "create"])
    ->name('page.edit');

Route::get('/{page}', [PageController::class, "show"])
    ->name('page.show');

Route::patch('/{page}', [PageController::class, "update"])
    ->name('page.store');

Route::get('/{page}/edit', [PageController::class, "edit"])
    ->name('page.edit');

Route::get('/{parent}/create', [PageController::class, "create"])
    ->name('page.parent.create');

Route::get('/{page}/shell/edit', [PageShellController::class, "edit"]);

Route::get('/{page}/shell', [PageShellController::class, "show"]);

Route::delete('/{page}/shell', [PageShellController::class, "destroy"]);

Route::post('/{pageId}/publish', [PublishPageController::class, "store"])
    ->name('page.publish');