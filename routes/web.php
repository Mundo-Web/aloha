<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\AboutusController as AdminAboutusController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\IndicatorController as AdminIndicatorController;
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
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\ColorController as AdminColorController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\FormulaController as AdminFormulaController;
use App\Http\Controllers\Admin\SupplyController as AdminSupplyController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\AdController as AdminAdController;
use App\Http\Controllers\Admin\FragranceController as AdminFragranceController;
use App\Http\Controllers\Admin\RenewalController as AdminRenewalController;
use App\Http\Controllers\Admin\BundleController as AdminBundleController;
use App\Http\Controllers\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Admin\SaleController as AdminSaleController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\Admin\MailingTemplateController as AdminMailingTemplateController;
use App\Http\Controllers\Admin\SendingHistoryController as AdminSendingHistoryController;

// Public 
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\RepositoryController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FormulaController;
use App\Http\Controllers\LoginVuaController;
use App\Http\Controllers\MailingTemplateController;
use App\Http\Controllers\MyAccountController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PopupController;
use App\Http\Controllers\SendingHistoryController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TestResultController;
use App\Http\Controllers\ThankController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public routes
Route::get('/', [HomeController::class, 'reactView'])->name('Home.jsx');
Route::get('/plans', [PlanController::class, 'reactView'])->name('Plans.jsx');
Route::get('/supplies', [SupplyController::class, 'reactView'])->name('Supplies.jsx');
Route::get('/faqs', [FaqController::class, 'reactView'])->name('FAQs.jsx');
Route::get('/test', [TestController::class, 'reactView'])->name('Test.jsx');
Route::get('/test/{formula?}', [TestController::class,'reactView'])->name('Test.jsx'); // /test/{formula
Route::get('/test/result/{formula}', [TestResultController::class, 'reactView'])->name('TestResult.jsx');
Route::get('/about', [AboutController::class, 'reactView'])->name('About.jsx');
Route::get('/blog', [BlogController::class, 'reactView'])->name('Blog.jsx');
Route::get('/blog/{articleId}', [ArticleController::class, 'reactView'])->name('BlogArticle.jsx');
Route::get('/contact', [ContactController::class, 'reactView'])->name('Contact.jsx');

// Vistas maquetadas finalizadas
Route::get('/formula/{formula}', [FormulaController::class, 'reactView'])->name('Formula.jsx');
Route::get('/thanks', [ThankController::class, 'reactView'])->name('Thanks.jsx');
Route::get('/loginvua', [LoginVuaController::class, 'reactView'])->name('LoginVua.jsx');
Route::get('/popup', [PopupController::class, 'reactView'])->name('Popup.jsx');

Route::get('/login', [AuthController::class, 'loginView'])->name('Login.jsx');
Route::get('/register', [AuthController::class, 'registerView'])->name('Register.jsx');
Route::get('/confirm-email/{token}', [AuthController::class, 'confirmEmailView'])->name('ConfirmEmail.jsx');
Route::get('/confirmation/{token}', [AuthController::class, 'loginView'])->name('confirmation');

Route::middleware(['auth', 'can:Customer'])->group(function () {
    Route::get('/my-account', [MyAccountController::class, 'reactView'])->name('MyAccount.jsx');
});
// Admin routes
Route::middleware(['can:Admin', 'auth'])->prefix('admin')->group(function () {
    Route::get('/', fn() => redirect('Admin/Home.jsx'));
    Route::get('/home', [AdminHomeController::class, 'reactView'])->name('Admin/Home.jsx');
    Route::get('/sales', [AdminSaleController::class, 'reactView'])->name('Admin/Sales.jsx');
    Route::get('/posts', [AdminPostController::class, 'reactView'])->name('Admin/Posts.jsx');
    Route::get('/items', [AdminItemController::class, 'reactView'])->name('Admin/Items.jsx');
    Route::get('/colors', [AdminColorController::class, 'reactView'])->name('Admin/Colors.jsx');
    Route::get('/supplies', [AdminSupplyController::class, 'reactView'])->name('Admin/Supplies.jsx');
    Route::get('/gifts', [AdminSupplyController::class, 'reactView'])->name('Admin/Gifts.jsx');
    Route::get('/formulas', [AdminFormulaController::class, 'reactView'])->name('Admin/Formulas.jsx');
    Route::get('/fragrances', [AdminFragranceController::class, 'reactView'])->name('Admin/Fragrances.jsx');
    Route::get('/transactions', [AdminTransactionController::class, 'reactView'])->name('Admin/Transactions.jsx');
    Route::get('/ads', [AdminAdController::class, 'reactView'])->name('Admin/Ads.jsx');
    Route::get('/renewals', [AdminRenewalController::class, 'reactView'])->name('Admin/Renewals.jsx');
    Route::get('/bundles', [AdminBundleController::class, 'reactView'])->name('Admin/Bundles.jsx');
    Route::get('/coupons', [AdminCouponController::class, 'reactView'])->name('Admin/Coupons.jsx');
    Route::get('/messages', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Messages.jsx');

    Route::prefix('mailing')->group(function () {
        Route::get('/templates', [AdminMailingTemplateController::class, 'reactView'])->name('Admin/MailingTemplates.jsx');
        Route::get('/history', [AdminSendingHistoryController::class, 'reactView'])->name('Admin/SendingHistory.jsx');
    });

    Route::get('/subscriptions', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Subscriptions.jsx');
    Route::get('/about', [AdminAboutusController::class, 'reactView'])->name('Admin/About.jsx');
    Route::get('/indicators', [AdminIndicatorController::class, 'reactView'])->name('Admin/Indicators.jsx');
    Route::get('/sliders', [AdminSliderController::class, 'reactView'])->name('Admin/Sliders.jsx');
    Route::get('/testimonies', [AdminTestimonyController::class, 'reactView'])->name('Admin/Testimonies.jsx');
    Route::get('/categories', [AdminCategoryController::class, 'reactView'])->name('Admin/Categories.jsx');
    Route::get('/tags', [AdminTagController::class, 'reactView'])->name('Admin/Tags.jsx');
    Route::get('/faqs', [AdminFaqController::class, 'reactView'])->name('Admin/Faqs.jsx');
    Route::get('/socials', [AdminSocialController::class, 'reactView'])->name('Admin/Socials.jsx');
    Route::get('/strengths', [AdminStrengthController::class, 'reactView'])->name('Admin/Strengths.jsx');
    Route::get('/generals', [AdminGeneralController::class, 'reactView'])->name('Admin/Generals.jsx');
    Route::get('/users', [AdminUserController::class, 'reactView'])->name('Admin/Users.jsx');

    Route::get('/profile', [AdminProfileController::class, 'reactView'])->name('Admin/Profile.jsx');
    Route::get('/account', [AdminAccountController::class, 'reactView'])->name('Admin/Account.jsx');
});


Route::get('/mailing/new-formula', fn() => view('mailing.new-formula'));
Route::get('/repository/{uuid}', [RepositoryController::class, 'media'])->withoutMiddleware('throttle');