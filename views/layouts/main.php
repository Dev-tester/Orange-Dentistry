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
    'brandLabel' => Html::img('@web/media/logo.png', ['alt'=>Yii::$app->name]),
    'brandUrl' => Yii::$app->homeUrl,
    'options' => [
        'class' => 'navbar navbar-top navbar-72',
    ],
]);
if (Yii::$app->user->isGuest) {
	echo Nav::widget([
		'options' => ['class' => 'navbar-nav'],
		'items' => [],
	]);
}
else {
	echo Nav::widget([
		'options' => ['class' => 'navbar-nav'],
		'items' => [
			['label' => 'Картотека', 'url' => ['/site/index'], 'options'=>['class'=> $this->params['action'] == 'cardIndex' ? 'active':'']],
			['label' => 'Запись на приём', 'url' => ['/site/about'], 'options'=>['class'=> $this->params['action'] == 'appoint' ? 'active':'']],
			['label' => 'Прейскурант', 'url' => ['/site/contact'], 'options'=>['class'=> $this->params['action'] == 'pricelist' ? 'active':'']],
			['label' => 'Касса', 'url' => ['/site/index'], 'options'=>['class'=> $this->params['action'] == 'cashOffice' ? 'active':'']],
			['label' => 'Отчёты', 'url' => ['/site/about'], 'options'=>['class'=> $this->params['action'] == 'reports' ? 'active':'']],
			['label' => 'CRM', 'url' => ['/site/contact'], 'options'=>['class'=> $this->params['action'] == 'crm' ? 'active':'']],
			['label' => 'Лаборатория', 'url' => ['/site/index'], 'options'=>['class'=> $this->params['action'] == 'laboratory' ? 'active':'']],
			['label' => 'Материалы', 'url' => ['/site/about'], 'options'=>['class'=> $this->params['action'] == 'materials' ? 'active':'']],
			['label' => 'Страхование', 'url' => ['/site/contact'], 'options'=>['class'=> $this->params['action'] == 'ensure' ? 'active':'']],
			['label' => 'Заработная плата', 'url' => ['/site/contact'], 'options'=>['class'=> $this->params['action'] == 'sallary' ? 'active':'']],
		],
	]);
}
NavBar::end();
?>
<div class="wrap">
    <?= $content ?>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; ST Dentistry <?= date('Y') ?></p>
        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
