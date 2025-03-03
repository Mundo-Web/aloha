<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\SliderController as AdminSliderController;
use App\Http\Controllers\Admin\TestimonyController as AdminTestimonyController;
use App\Http\Controllers\Admin\SubscriptionController as AdminSubscriptionController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\SocialController as AdminSocialController;
use App\Http\Controllers\Admin\StrengthController as AdminStrengthController;
use App\Http\Controllers\Admin\GeneralController as AdminGeneralController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AccountController as AdminAccountController;
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\BundleController as AdminBundleController;
use App\Http\Controllers\Admin\ColorController as AdminColorController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\FormulaController as AdminFormulaController;
use App\Http\Controllers\Admin\FragranceController as AdminFragranceController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\MailingTemplateController as AdminMailingTemplateController;
use App\Http\Controllers\Admin\RenewalController as AdminRenewalController;
use App\Http\Controllers\Admin\SaleController as AdminSaleController;
use App\Http\Controllers\Admin\SaleStatusController as AdminSaleStatusController;
use App\Http\Controllers\Admin\SupplyController as AdminSupplyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

// Customer
use App\Http\Controllers\Customer\UserFormulaController as CustomerUserFormulaController;
use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
use App\Http\Controllers\Customer\SaleController as CustomerSaleController;

// Public
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\CulqiController;
use App\Http\Controllers\FragranceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\MailingController;
use App\Http\Controllers\MailingTemplateController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\UserFormulaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/sliders/media/{uuid}', [AdminSliderController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/testimonies/media/{uuid}', [AdminTestimonyController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/posts/media/{uuid}', [AdminPostController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/items/media/{uuid}', [ItemController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/supplies/media/{uuid}', [SupplyController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/colors/media/{uuid}', [ColorController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/fragrances/media/{uuid}', [FragranceController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/ads/media/{uuid}', [AdminAdController::class, 'media'])->withoutMiddleware('throttle');
Route::get('/mailing/media/{uuid}', [MailingController::class, 'media'])->withoutMiddleware('throttle');

Route::post('/posts/paginate', [PostController::class, 'paginate']);
Route::post('/items/paginate', [ItemController::class, 'paginate']);
Route::post('/supplies/paginate', [SupplyController::class, 'paginate']);

Route::post('/messages', [MessageController::class, 'save']);
Route::post('/subscriptions', [SubscriptionController::class, 'save']);

Route::get('/cover/{uuid}', [CoverController::class, 'full']);
Route::get('/cover/thumbnail/{uuid}', [CoverController::class, 'thumbnail']);

Route::post('/user-formulas', [UserFormulaController::class, 'save']);

Route::post('/coupons', [CouponController::class, 'save']);
Route::post('/coupons/is-first', [CouponController::class, 'isFirst']);

Route::prefix('/culqi')->group(function () {
    Route::post('/order', [CulqiController::class, 'order']);
    Route::post('/token', [CulqiController::class, 'token']);
    Route::post('/webhook', [CulqiController::class, 'webhook']);
});

Route::get('/sales/notify/{code}', [SaleController::class, 'notify']);

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])
        ->name('logout');

    Route::middleware('can:Admin')->group(function () {
        
        Route::get('/graph/sales/{param}', [AdminHomeController::class, 'getSales']);

        Route::prefix('admin')->group(function () {
            Route::get('/sales/{id}', [AdminSaleController::class, 'get']);
            Route::post('/sales', [AdminSaleController::class, 'save']);
            Route::post('/sales/paginate', [AdminSaleController::class, 'paginate']);
            Route::patch('/sales/status', [AdminSaleController::class, 'status']);
            Route::patch('/sales/{field}', [AdminSaleController::class, 'boolean']);
            Route::delete('/sales/{id}', [AdminSaleController::class, 'delete']);

            Route::get('/sale-statuses/by-sale/{id}', [AdminSaleStatusController::class, 'bySale']);

            Route::post('/posts', [AdminPostController::class, 'save']);
            Route::post('/posts/paginate', [AdminPostController::class, 'paginate']);
            Route::patch('/posts/status', [AdminPostController::class, 'status']);
            Route::patch('/posts/{field}', [AdminPostController::class, 'boolean']);
            Route::delete('/posts/{id}', [AdminPostController::class, 'delete']);

            Route::post('/items', [AdminItemController::class, 'save']);
            Route::post('/items/paginate', [AdminItemController::class, 'paginate']);
            Route::patch('/items/status', [AdminItemController::class, 'status']);
            Route::patch('/items/{field}', [AdminItemController::class, 'boolean']);
            Route::delete('/items/{id}', [AdminItemController::class, 'delete']);

            Route::post('/colors', [AdminColorController::class, 'save']);
            Route::post('/colors/paginate', [AdminColorController::class, 'paginate']);
            Route::patch('/colors/status', [AdminColorController::class, 'status']);
            Route::patch('/colors/{field}', [AdminColorController::class, 'boolean']);
            Route::delete('/colors/{id}', [AdminColorController::class, 'delete']);

            Route::post('/supplies', [AdminSupplyController::class, 'save']);
            Route::post('/supplies/paginate', [AdminSupplyController::class, 'paginate']);
            Route::patch('/supplies/status', [AdminSupplyController::class, 'status']);
            Route::patch('/supplies/{field}', [AdminSupplyController::class, 'boolean']);
            Route::delete('/supplies/{id}', [AdminSupplyController::class, 'delete']);

            Route::post('/formulas', [AdminFormulaController::class, 'save']);
            Route::post('/formulas/paginate', [AdminFormulaController::class, 'paginate']);
            Route::patch('/formulas/status', [AdminFormulaController::class, 'status']);
            Route::patch('/formulas/{field}', [AdminFormulaController::class, 'boolean']);
            Route::delete('/formulas/{id}', [AdminFormulaController::class, 'delete']);

            Route::post('/fragrances', [AdminFragranceController::class, 'save']);
            Route::post('/fragrances/paginate', [AdminFragranceController::class, 'paginate']);
            Route::patch('/fragrances/status', [AdminFragranceController::class, 'status']);
            Route::patch('/fragrances/{field}', [AdminFragranceController::class, 'boolean']);
            Route::delete('/fragrances/{id}', [AdminFragranceController::class, 'delete']);

            Route::post('/ads', [AdminAdController::class, 'save']);
            Route::post('/ads/paginate', [AdminAdController::class, 'paginate']);
            Route::patch('/ads/status', [AdminAdController::class, 'status']);
            Route::patch('/ads/{field}', [AdminAdController::class, 'boolean']);
            Route::delete('/ads/{id}', [AdminAdController::class, 'delete']);

            Route::post('/renewals', [AdminRenewalController::class, 'save']);
            Route::post('/renewals/paginate', [AdminRenewalController::class, 'paginate']);
            Route::patch('/renewals/status', [AdminRenewalController::class, 'status']);
            Route::patch('/renewals/{field}', [AdminRenewalController::class, 'boolean']);
            Route::delete('/renewals/{id}', [AdminRenewalController::class, 'delete']);

            Route::post('/bundles', [AdminBundleController::class, 'save']);
            Route::post('/bundles/paginate', [AdminBundleController::class, 'paginate']);
            Route::patch('/bundles/status', [AdminBundleController::class, 'status']);
            Route::patch('/bundles/{field}', [AdminBundleController::class, 'boolean']);
            Route::delete('/bundles/{id}', [AdminBundleController::class, 'delete']);

            Route::post('/coupons', [AdminCouponController::class, 'save']);
            Route::post('/coupons/paginate', [AdminCouponController::class, 'paginate']);
            Route::patch('/coupons/status', [AdminCouponController::class, 'status']);
            Route::patch('/coupons/{field}', [AdminCouponController::class, 'boolean']);
            Route::delete('/coupons/{id}', [AdminCouponController::class, 'delete']);

            Route::post('/messages', [AdminMessageController::class, 'save']);
            Route::post('/messages/paginate', [AdminMessageController::class, 'paginate']);
            Route::patch('/messages/status', [AdminMessageController::class, 'status']);
            Route::patch('/messages/{field}', [AdminMessageController::class, 'boolean']);
            Route::delete('/messages/{id}', [AdminMessageController::class, 'delete']);

            Route::prefix('mailing')->group(function () {
                Route::get('/templates/{id}', [AdminMailingTemplateController::class, 'get']);
                Route::post('/templates', [AdminMailingTemplateController::class,'save']);
                Route::post('/templates/paginate', [AdminMailingTemplateController::class, 'paginate']);
            });

            Route::post('/subscriptions/paginate', [AdminSubscriptionController::class, 'paginate']);
            Route::patch('/subscriptions/status', [AdminSubscriptionController::class, 'status']);
            Route::delete('/subscriptions/{id}', [AdminSubscriptionController::class, 'delete']);

            Route::post('/aboutus', [AdminAboutusController::class, 'save']);
            Route::post('/aboutus/paginate', [AdminAboutusController::class, 'paginate']);
            Route::patch('/aboutus/status', [AdminAboutusController::class, 'status']);
            Route::patch('/aboutus/{field}', [AdminAboutusController::class, 'boolean']);
            Route::delete('/aboutus/{id}', [AdminAboutusController::class, 'delete']);

            Route::post('/indicators', [AdminIndicatorController::class, 'save']);
            Route::post('/indicators/paginate', [AdminIndicatorController::class, 'paginate']);
            Route::patch('/indicators/status', [AdminIndicatorController::class, 'status']);
            Route::patch('/indicators/{field}', [AdminIndicatorController::class, 'boolean']);
            Route::delete('/indicators/{id}', [AdminIndicatorController::class, 'delete']);

            Route::post('/sliders', [AdminSliderController::class, 'save']);
            Route::post('/sliders/paginate', [AdminSliderController::class, 'paginate']);
            Route::patch('/sliders/status', [AdminSliderController::class, 'status']);
            Route::patch('/sliders/{field}', [AdminSliderController::class, 'boolean']);
            Route::delete('/sliders/{id}', [AdminSliderController::class, 'delete']);

            Route::post('/testimonies', [AdminTestimonyController::class, 'save']);
            Route::post('/testimonies/paginate', [AdminTestimonyController::class, 'paginate']);
            Route::patch('/testimonies/status', [AdminTestimonyController::class, 'status']);
            Route::patch('/testimonies/{field}', [AdminTestimonyController::class, 'boolean']);
            Route::delete('/testimonies/{id}', [AdminTestimonyController::class, 'delete']);

            Route::post('/categories', [AdminCategoryController::class, 'save']);
            Route::post('/categories/paginate', [AdminCategoryController::class, 'paginate']);
            Route::patch('/categories/status', [AdminCategoryController::class, 'status']);
            Route::patch('/categories/{field}', [AdminCategoryController::class, 'boolean']);
            Route::delete('/categories/{id}', [AdminCategoryController::class, 'delete']);

            Route::post('/faqs', [AdminFaqController::class, 'save']);
            Route::post('/faqs/paginate', [AdminFaqController::class, 'paginate']);
            Route::patch('/faqs/status', [AdminFaqController::class, 'status']);
            Route::patch('/faqs/{field}', [AdminFaqController::class, 'boolean']);
            Route::delete('/faqs/{id}', [AdminFaqController::class, 'delete']);

            Route::post('/strengths', [AdminStrengthController::class, 'save']);
            Route::post('/strengths/paginate', [AdminStrengthController::class, 'paginate']);
            Route::patch('/strengths/status', [AdminStrengthController::class, 'status']);
            Route::patch('/strengths/{field}', [AdminStrengthController::class, 'boolean']);
            Route::delete('/strengths/{id}', [AdminStrengthController::class, 'delete']);

            Route::post('/socials', [AdminSocialController::class, 'save']);
            Route::post('/socials/paginate', [AdminSocialController::class, 'paginate']);
            Route::patch('/socials/status', [AdminSocialController::class, 'status']);
            Route::patch('/socials/{field}', [AdminSocialController::class, 'boolean']);
            Route::delete('/socials/{id}', [AdminSocialController::class, 'delete']);

            Route::post('/generals', [AdminGeneralController::class, 'save']);
            Route::post('/generals/paginate', [AdminGeneralController::class, 'paginate']);
            Route::patch('/generals/status', [AdminGeneralController::class, 'status']);
            Route::patch('/generals/{field}', [AdminGeneralController::class, 'boolean']);
            Route::delete('/generals/{id}', [AdminGeneralController::class, 'delete']);

            Route::post('/users', [AdminUserController::class, 'save']);
            Route::post('/users/paginate', [AdminUserController::class, 'paginate']);
            Route::patch('/users/status', [AdminUserController::class, 'status']);
            Route::patch('/users/{field}', [AdminUserController::class, 'boolean']);
            Route::delete('/users/{id}', [AdminUserController::class, 'delete']);

            Route::get('/profile/{uuid}', [AdminProfileController::class, 'full']);
            Route::get('/profile/thumbnail/{uuid}', [AdminProfileController::class, 'thumbnail']);
            Route::post('/profile', [AdminProfileController::class, 'saveProfile']);
            Route::patch('/profile', [AdminProfileController::class, 'save']);

            Route::patch('/account/email', [AdminAccountController::class, 'email']);
            Route::patch('/account/password', [AdminAccountController::class, 'password']);
        });
    });

    Route::middleware('can:Customer')->prefix('customer')->group(function () {

        Route::get('/sales/{id}', [CustomerSaleController::class, 'get']);
        Route::post('/sales/paginate', [CustomerSaleController::class, 'paginate']);
        Route::delete('/sales/{id}', [CustomerSaleController::class, 'delete']);

        Route::post('/user-formulas', [CustomerUserFormulaController::class, 'save']);
        Route::patch('/profile', [CustomerProfileController::class, 'save']);
    });
});
