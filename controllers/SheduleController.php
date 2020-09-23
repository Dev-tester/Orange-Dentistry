<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\Patient;
use app\models\MedCard;
use app\models\SheduleReception;

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

	/**
	 * @inheritdoc
	 */
	public function beforeAction($action){
		if ($action->id == 'addrecord') {
			$this->enableCsrfValidation = false;
		}
		return parent::beforeAction($action);
	}

	public function actionRecords(){
	    $connection = Yii::$app->getDb();
	    $result = ['doctors' => [],'shedule' => []];
	    $command = $connection->createCommand('SELECT 	doctors.id,"family"||\' \'||LEFT("name",1)||\'. \'||COALESCE(LEFT("surname",1),\'\')||\'.\' as name,
															branches.address as branch 
													FROM 	doctors
															INNER JOIN branches ON branches.id = doctors.branch_id
													WHERE	direction_id = :direction_id')
		                        ->bindValue(':direction_id',$_GET['direction']);
	    $doctors = $command->queryAll();
	    foreach ($doctors as $doctor){
		    $doctorid = $doctor['id'];
	    	$result['doctors'][] = [
			    'id' => $doctorid,
		    	'name' => $doctor['name'],
			    'branch' => $doctor['branch']
		    ];
		    $result['shedule'][$doctorid] = [];
	    }
	    $command = $connection->createCommand('SELECT shedule.* 
													FROM "shedule-reception" AS shedule
															INNER JOIN doctors ON doctors.id = shedule.doctor_id
													WHERE date = :date AND doctors.direction_id = :direction_id
													ORDER BY appointedtime ASC')
								->bindValue(':date',$_GET['date'])
								->bindValue(':direction_id',$_GET['direction']);
	    $shedule = $command->queryAll();
	    foreach ($shedule as $row){
		    $doctorid = $row['doctor_id'];
		    $row['actions'] = explode(",",preg_replace("/[\{\}]/","",$row['actions']));
		    $result['shedule'][$doctorid][] = $row;
	    }
    	return json_encode($result);
    }

	public function actionDirections(){
		$connection = Yii::$app->getDb();
		$result = ['directions' => [],'loading' => []];
		$command = $connection->createCommand('SELECT * FROM "ref-med-directions"');
		$result['directions'] = $command->queryAll();
		// получаем загрузку месяца
		$command = $connection->createCommand('SELECT date, count(id) AS loading 
													FROM "shedule-reception" AS shedule
													WHERE date > :startDate
													GROUP BY date
													ORDER BY date ASC')
			->bindValue(':startDate',$_GET['startDate']);
		$result['loading'] = $command->queryAll();

		return json_encode($result);
	}

	public function actionFilters(){
		$connection = Yii::$app->getDb();
		$result = ['directions' => [],'doctors' => []];
		$command = $connection->createCommand('SELECT * FROM "ref-med-directions"');
		$result['directions'] = $command->queryAll();
		$command = $connection->createCommand('SELECT shedule.doctor_id AS id, "family"||\' \'||LEFT("name",1)||\'. \'||COALESCE(LEFT("surname",1),\'\')||\'.\' as name
													FROM "shedule-reception" AS shedule
															INNER JOIN doctors ON doctors.id = shedule.doctor_id
													WHERE date = :date AND doctors.direction_id = :direction_id
													GROUP BY doctor_id,family,name,surname')
			->bindValue(':date',$_GET['date'])
			->bindValue(':direction_id',$_GET['direction']);
		$result['doctors'] = $command->queryAll();
		return json_encode($result);
	}

	public function actionPatients(){
		$connection = Yii::$app->getDb();
		$command = $connection->createCommand('SELECT 	patients."family"||\' \'||patients."name"||\' \'||patients."surname" as fio,
															patients."family",
															patients."name",
															patients."surname",
															patients.med_card_id,
															TO_CHAR(patients.birthday, \'dd.mm.YYYY\') AS birthday,
															patients.phone,
															med.*,
															patients.id		-- если ставить вначале, то med.* его перезатирает
													FROM 	patients 
															INNER JOIN medical_cards AS med ON med.id=patients.med_card_id
													WHERE CAST (document_vectors as VARCHAR) ILIKE :query')
								->bindValue(':query', '%'.$_GET['q'].'%');
		$result = $command->queryAll();
		return json_encode($result);
	}

	public function actionAddrecord(){
		$params = Yii::$app->request->post();
		// создаём/обновляем пациента
		// действующий пациент
		if (!empty($params['id'])){
			$Patient = Patient::findIdentity($params['id']);
		}
		// это новый пациент
		else $Patient = new Patient();
		//
		if ($Patient->load($params,'') && $Patient->validate()) $Patient->save();
		$errors = $Patient->getErrors();
		if (count($errors)) return json_encode(["type" => "Ошибка создания пациента", 'errors' => $errors]);

		// создаём/обновляем медицинскую карту
		// TODO адреса не пишутся, yii2 не пропускает? Модель
		// действующий пациент
		if (!empty($params['id'])) {
			$MedCard = MedCard::findIdentity($Patient->med_card_id);
		}
		// это новый пациент
		else {
			$MedCard = new MedCard();
			$MedCard->patient_id = $Patient->getId();
		}
		$MedCard->valid_from = $params['date'];         // обновляем, т.к. иначе не сохранится
		if ($MedCard->load($params,'') && $MedCard->validate()) $MedCard->save();
		$errors = $MedCard->getErrors();
		if (count($errors)) return json_encode(["type" => "Ошибка создания медицинской карты Пациента", 'errors' => $errors]);

		// ставим карточку пациенту
		if (!empty($params['id'])) {
			$Patient->med_card_id = $MedCard->getId();
			$Patient->save();
		}
		// создаём запись в Расписании
		$Shedule = new SheduleReception();
		$Shedule->appointedtime = $params['appointTime'];
		$Shedule->patient_id = $Patient->getId();
		$Shedule->doctor_id = $params['doctor'];
		$Shedule->patient = $params['family'].' '.mb_substr($params['name'], 0, 1).'.'.mb_substr($params['surname'], 0, 1).'.';
		$Shedule->date = $params['date'];
		$Shedule->save();
		return json_encode(["type" => "ok"]);
	}
}
