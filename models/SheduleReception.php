<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "SheduleReceptions".
 *
 * @property int $id
 * @property string $appointedtime
 * @property int|null $patient_id
 * @property int|null $doctor_id
 * @property string|null $patient
 * @property string|null $status
 * @property string|null $actions
 * @property date|null $date
 */
class SheduleReception extends \yii\db\ActiveRecord
{
	/**
	 * {@inheritdoc}
	 */
	public static function tableName()
	{
		return 'shedule-reception';
	}

	/**
	 * {@inheritdoc}
	 */
	public function rules()
	{
		return [
			[['appointedtime','patient_id','doctor_id','patient'], 'required'],
			[['id','patient_id','doctor_id'], 'integer'],
			[['appointedtime'], 'string', 'max' => 32],
			[['patient','cancel_reason','cancel_reason_detail','comment'], 'string', 'max' => 255],
			[['status'], 'string', 'max' => 16],
			[['actions'], 'string', 'max' => 2048],
			[['date'], 'date','format' => 'dd.MM.yyyy'],
			[['canceled'],'boolean'],
			[['id'], 'unique'],
		];
	}

	/**
	 * {@inheritdoc}
	 */
	public function attributeLabels()
	{
		return [
			'id' => 'ID',
			'appointedtime' => 'Еime the appointment is scheduled for',
			'patient_id' => 'Patient ID',
			'doctor_id' => 'Doctor ID',
			'patient' => 'Patient Name (service field)',
			'status' => 'Shedule Status',
			'actions' => 'Visit Actions',
			'date' => 'Date of Appointment',
			'canceled' => 'Appointment Canceled',
			'cancel_reason' => 'Reason for cancellation',
			'cancel_reason_detail' => 'Reason for cancellation Details',
			'comment' => 'Comment',
		];
	}

	public static function findIdentity($id){
		return static::findOne($id);
	}

	/**
	 * {@inheritdoc}
	 */
	public static function findIdentityByAccessToken($token, $type = null){
		return static::findOne(['access_token' => $token]);
	}

	/**
	 * Finds user by username
	 *
	 * @param string $patient_id
	 * @return static|null
	 */
	public static function findByPatientId($patient_id){
		return static::findOne(['patient_id' => $patient_id]);
	}

	/**
	 * Finds user by username
	 *
	 * @param string $doctor_id
	 * @return static|null
	 */
	public static function findByDoctorId($doctor_id){
		return static::findOne(['doctor_id' => $doctor_id]);
	}

	/**
	 * {@inheritdoc}
	 */
	public function getId(){
		return $this->id;
	}
}