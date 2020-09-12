<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<!--Этот метод beginBody() нужно вызывать в начале секции <body>. Он вызывает событие EVENT_BEGIN_BODY и генерирует метку, которая будет заменена зарегистрированным
HTML кодом (например, Javascript'ом), который нужно разместить в начале <body> страницы.-->
<?php
NavBar::begin([
    'brandLabel' => Html::img('@web/images/logo.png', ['alt'=>Yii::$app->name]),
    'brandUrl' => Yii::$app->homeUrl,
    'options' => [
        'class' => 'navbar navbar-top navbar-72',
    ],
]);
echo Nav::widget([
    'options' => ['class' => 'navbar-nav'],
    'items' => [
        ['label' => 'Картотека', 'url' => ['/site/index']],
        ['label' => 'Запись на приём', 'url' => ['/site/about']],
        ['label' => 'Прейскурант', 'url' => ['/site/contact']],
        ['label' => 'Касса', 'url' => ['/site/index']],
        ['label' => 'Отчёты', 'url' => ['/site/about']],
        ['label' => 'CRM', 'url' => ['/site/contact']],
        ['label' => 'Лаборатория', 'url' => ['/site/index']],
        ['label' => 'Материалы', 'url' => ['/site/about']],
        ['label' => 'Страхование', 'url' => ['/site/contact']],
        ['label' => 'Заработная плата', 'url' => ['/site/contact']],
    ],
]);
NavBar::end();
?>
<div class="wrap" style="margin:28px 40px 0">
    <?= $content ?>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; Valles <?= date('Y') ?></p>
        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
