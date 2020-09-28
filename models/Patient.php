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
			[['family','name','phone'], 'required'],
			[['id', 'med_card_id'], 'integer'],
			[['family','name','surname','city','street','parent','insurer'], 'string', 'max' => 255],
			[['birthday'], 'date','format' => 'dd.MM.yyyy'],
			[['last_visit'], 'datetime'],
			[['is_primary'],'boolean'],
			[['phone','house','building','flat','gender'], 'string', 'max' => 32],
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
			'gender' => 'Gender',
			'birthday' => 'Birthday',
			'med_card_id' => 'Medical Card ID',
			'last_visit' => 'Last Visit',
			'parent' => 'Patients parent',
			'insurer' => 'Patients insurer',
			'phone' => 'Phone',
			'city' => 'City',
			'street' => 'Street',
			'house' => 'House',
			'building' => 'Building',
			'flat' => 'Flat',
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
	 * функция ищет дубликаты Пациентов в базе
	 *
	 * @param array $params
	 * @return static|null
	 */
	public static function findByParams($params){
		$connection = Yii::$app->getDb();
		$command = $connection->createCommand('SELECT 	id
													FROM 	patients 
													WHERE	(
																family <-> :family < 0.6 AND LENGTH(family) = LENGTH(:family)
																OR
																family = :family AND name = :name AND (surname = :surname OR surname IS NULL)
															)
															AND
															(
																TO_CHAR(birthday, \'dd.mm.YYYY\')<->:birthday = 0 
																OR 
																REGEXP_REPLACE(phone,\'(?:^\+7|^8|\D+)\',\'\',\'g\')<->REGEXP_REPLACE(:phone,\'(?:^\+7|^8|\D+)\',\'\',\'g\') = 0
															)
															ORDER BY family<->:family LIMIT 1')
			->bindValue(':family',  $params['family'])
			->bindValue(':name',    $params['name'])
			->bindValue(':surname', $params['surname'])
			->bindValue(':birthday',$params['birthday'])
			->bindValue(':phone',   $params['phone']);
		$result = $command->queryAll();
		return !empty($result) ? $result[0]['id']:'';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getId(){
		return $this->id;
	}
}
