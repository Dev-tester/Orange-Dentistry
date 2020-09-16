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

	public function behaviors()
	{
		return array_merge(parent::behaviors(), [
			'corsFilter'  => [
				'class' => \yii\filters\Cors::class,
				'cors'  => [
					'Origin'                           => ['http://localhost:3000'],
					'Access-Control-Request-Method'    => ['POST','GET','PUT'],
					'Access-Control-Allow-Credentials' => true,
					'Access-Control-Max-Age'           => 3600,                 // Cache (seconds)
				],
			],

		]);
	}

	public function actionRecords(){
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

	public function actionPatients(){
		$connection = Yii::$app->getDb();
		$command = $connection->createCommand('SELECT 	patients."family"||\' \'||patients."name"||\' \'||patients."surname" as fio, patients.med_card_id, patients.birthday, patients.phone,med.*
													FROM 	patients 
															INNER JOIN medical_cards AS med ON med.id=patients.med_card_id
													WHERE CAST (document_vectors as VARCHAR) ILIKE :query')
								->bindValue(':query', '%'.$_GET['q'].'%');
		$result = $command->queryAll();
		return json_encode($result);
	}
}
