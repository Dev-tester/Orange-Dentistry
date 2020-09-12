<?php
/* @var $this yii\web\View */
/* @var $productProvider ActiveDataProvider */
/* @var $uploadsProvider ArrayDataProvider */

use yii\widgets\ActiveForm;
use yii\grid\GridView;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\bootstrap\Modal;
use yii\helpers\Html;
use \app\components\LoginBar;
use yii\bootstrap\Nav;

?>
<div class="col-sm-2 col-md-2 col-lg-2">
    <div class="row">
        <div class="incimings">Входящие звонки</div>
    </div>
    <div class="row second">
    <?= yii\jui\DatePicker::widget([
        'language' => 'ru-Ru',
        'dateFormat' => 'dd-MM-yyyy',
        'inline' => true,
        'clientOptions' => [
            'yearRange' => '2016:2024',
            'showOtherMonths' => true,
            'defaultDate' => '02-09-2020',
        ]
    ]) ?>
    </div>
</div>
<div class="col-sm-8 col-md-8 col-lg-8">
    <div class="row" style="margin-left: 40px">
        <div class="col-sm-5 col-md-5 col-lg-5">
            <div class="page-title">Запись на приём</div>
            <div class="page-breadcrumb">
                <span style="color: #F08786;">Главная</span>
                <span>Запись на приём</span>
            </div>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-6">
            <div class="page-search ui-block">Поиск</div>
        </div>
    </div>
    <div class="row" style="margin-left:40px">
        <div class="doctor-menu ui-block">
            <ul>
                <li>Терапевты</li>
                <li>Хирурги</li>
                <li>Ортопеды</li>
                <li>Ортодонты</li>
            </ul>
        </div>
    </div>
    <div class="row" style="margin-left:40px">
        <div class="main-schedule ui-block">
            <div class="main-schedule-title">
                <div class="top-row">15 сентября 2020<span>|</span>1 смена</div>
                <div class="doctors-shedule row">
                    <div class="col-sm-3 col-md-3 col-lg-3">Иванов И.И.</div>
                    <div class="col-sm-3 col-md-3 col-lg-3">Александрова А.А.</div>
                    <div class="col-sm-3 col-md-3 col-lg-3">Буслаев И.Э.</div>
                    <div class="col-sm-3 col-md-3 col-lg-3">Вердеревская И.И.</div>
                </div>
                <div class="patients-shedule row">
                    <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="present"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="present"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                    <li class="present"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                    <li class="present"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3 col-lg-3">
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="called"></li>
                                    <li class="user"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                    <li class="present"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                        <div class="patient-shedule-wrap">
                            <div class="patient-time">9:00</div>
                            <div class="patient-shedule-block">
                                <div class="patient-name">Бальсунов И.В.</div>
                                <ul class="patient-actions">
                                    <li class="absent"></li>
                                    <li class="present"></li>
                                </ul>
                                <span class="birthday"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-sm-2 col-md-2 col-lg-2">
<?php
echo Nav::widget([
    'options' => ['class' => 'navbar-right'],
    'items' => [
        Yii::$app->user->isGuest ? (
        ['label' => 'Login', 'url' => ['/main/login']]
        ) : (
            '<li>'
            . Html::beginForm(['/main/logout'], 'post')
            .'<div class="user-block">'
            .'<div class="notifies-wrap"></div>'
            .'<div class="img-block">'
            . Html::img(Yii::$app->user->identity->img, ['alt'=>Yii::$app->user->identity->username, 'width' => '48px','height' => '48px'])
            .'</div>'
            .'<div class="user-data">'
            .'<span class="name">'.Yii::$app->user->identity->username.'</span>'
            .'<span class="position">'.Yii::$app->user->identity->position.'</span>'
            .'</div>'
            . Html::submitButton(
                'Logout (' . Yii::$app->user->identity->username . ')',
                ['class' => 'btn btn-link logout']
            )
            .'</span>'
            . Html::endForm()
            . '</li>'
        )
    ],
]);
?>
</div>
