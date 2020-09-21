<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Patients".
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
class Patient extends \yii\db\ActiveRecord
{
	/**
	 * {@inheritdoc}
	 */
	public static function tableName()
	{
		return 'patients';
	}

	/**
	 * {@inheritdoc}
	 */
	public function rules()
	{
		return [
			[['id'], 'required'],
			[['id', 'med_card_id'], 'integer'],
			[['family','name','surname'], 'string', 'max' => 255],
			[['birthday'], 'date'],
			[['last_visit'], 'datetime'],
			[['phone'], 'string', 'max' => 32],
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
			'family' => 'Family',
			'name' => 'Name',
			'surname' => 'Surname',
			'birthday' => 'Birthday',
			'med_card_id' => 'Medical Card ID',
			'last_visit' => 'Last Visit',
			'phone' => 'Phone',
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
	 * @param string $username
	 * @return static|null
	 */
	public static function findByUsername($username){
		return static::findOne(['family' => $username]);
	}

	/**
	 * {@inheritdoc}
	 */
	public function getId(){
		return $this->id;
	}
}
