<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\Product;
use app\models\LoginForm;
use app\models\UploadedFile as Upload;
use yii\web\UploadedFile;

class SheduleController extends \yii\web\Controller {

    public function actionRecords(){
	    // проверяем авторизацию
    	if (Yii::$app->user->isGuest){                                                                                  // если не авторизован, авторизация
		    $model = new LoginForm();
		    if ($model->load(Yii::$app->request->post()) && $model->login()) {
			    return $this->goBack();
		    }

		    $model->password = '';
		    return $this->render('login', [
			    'model' => $model,
			    'guest' => true
		    ]);
	    }
    	// из localhost:3000 не работает ?
    	if (Yii::$app->request->isAjax){
		    return ["aaa"=>"bbbb222"];
	    }
	    $connection = Yii::$app->getDb();
	    $result = ['doctors' => [],'shedule' => []];
	    $command = $connection->createCommand('SELECT 	doctors.id,"family"||\' \'||LEFT("name",1)||\'. \'||COALESCE(LEFT("surname",1),\'\')||\'.\' as name,
															branches.address as branch 
													FROM 	doctors
															INNER JOIN branches ON branches.id = doctors.branchid');
	    $doctors = $command->queryAll();
	    foreach ($doctors as $doctor){
		    $result['doctors'][] = [
			    'id' => $doctor['id'],
		    	'name' => $doctor['name'],
			    'branch' => $doctor['branch']
		    ];
	    }
	    $command = $connection->createCommand('SELECT * FROM "shedule-reception" ORDER BY id ASC');
	    $shedule = $command->queryAll();
	    foreach ($shedule as $row){
		    $doctorid = $row['doctorid'];
		    $row['actions'] = explode(",",preg_replace("/[\{\}]/","",$row['actions']));
		    $result['shedule'][$doctorid][] = $row;
	    }
    	return json_encode($result);
    }

	public function actionUpload(){
    	$model = new Upload();
		$uploadsProvider = null;
		if (Yii::$app->request->isPost){
			$model->priceFile = UploadedFile::getInstance($model, 'priceFile');
			if ($model->upload()){
				$uploadsProvider = new ArrayDataProvider([
					'allModels' => $model->result,
					'pagination' => [
						'pageSize' => 10,
					],
				]);
			}
		}
		$productProvider = new ActiveDataProvider([
			'query' => Product::find()->where(['AND','buy_price>100','buy_price<200'])->orderBy(['title' => SORT_ASC]),
			'pagination' => [
				'pageSize' => 20,
			],
		]);
		return $this->render('index', [
				'model' => $model,
				'productProvider' => $productProvider,
				'uploadsProvider' => $uploadsProvider
		]);
	}

	/**
	 * Logout action.
	 *
	 * @return Response
	 */
	public function actionLogout(){
		Yii::$app->user->logout();
		return $this->goHome();
	}
}
