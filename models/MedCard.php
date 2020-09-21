<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "MedCards".
 *
 * @property int $id
 * @property string $family
 * @property string $name
 * @property string|null $surname
 * @property date|null $birthday
 * @property time|null $last_visit
 * @property int|null $med_card_id
 * @property string|null $phone
 */
class MedCard extends \yii\db\ActiveRecord
{
	/**
	 * {@inheritdoc}
	 */
	public static function tableName()
	{
		return 'medical_cards';
	}

	/**
	 * {@inheritdoc}
	 */
	public function rules()
	{
		return [
			[['id', 'status_id','patient_id'], 'integer'],
			[['description','comment'], 'string', 'max' => 2048],
			[['valid_from','valid_to'], 'date'],
			[['patient_id'], 'required'],
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
			'patient_id' => 'ID of Patient',
			'status_id' => 'Current status of Patient',
			'valid_from' => 'Date Card valid from',
			'valid_to' => 'Date Card valid to',
			'description' => 'Description',
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
	 * {@inheritdoc}
	 */
	public function getId(){
		return $this->id;
	}
}
