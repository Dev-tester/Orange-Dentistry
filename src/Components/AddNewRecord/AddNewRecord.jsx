import React from "react";
import Close from "../Appoints/media/appoint/Close";
import "./AddNewRecord.css";

class AddNewRecord extends React.Component {
  state = {};
  render() {
    return (
      <div className="add-new-record">
        <form
          action="/shedule/addpatient"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.closed();
          }}
        >
          <div className="col-lg-12">
            <div className="container">
              <div className="row">
                <div className="col-lg-1  close-btn">
                  <Close closeClicked={this.props.AddNewRecordClose} />
                </div>
              </div>
              <div className="row mt-lg-3 mb-lg-3">
                <div
                  className="col-lg-4 input-name
"
                >
                  Врач:{" "}
                  <span>
                    {" "}
                    <strong>Такой то</strong>{" "}
                  </span>{" "}
                </div>
                <div
                  className="col-lg-4 input-name
"
                >
                  Дата:{" "}
                  <span>
                    {" "}
                    <strong>Такая то</strong>{" "}
                  </span>
                </div>
                <div
                  className="col-lg-4 input-name
"
                >
                  Время:{" "}
                  <span>
                    {" "}
                    <strong>Такое то</strong>{" "}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <div className="col-lg-12 mb-lg-3">
                    Номер медкарты:{" "}
                    <span>
                      {" "}
                      <strong>Такой то</strong>{" "}
                    </span>{" "}
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Фамилия
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="lastname"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Александрова"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Имя
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="name"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Александра"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Отчество
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="patronymic"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Александровна"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Город
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="city"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Краснодар"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Улица
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="street"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Красная"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-2 input-name">Дом</div>
                          <div className="col-lg-8">
                            <input
                              name="home"
                              className="add-new-record-input"
                              type="text"
                              placeholder="209a"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div
                            className="col-lg-4 input-name
"
                          >
                            Корпус
                          </div>
                          <div className="col-lg-8">
                            <input
                              name="pavilion"
                              className="add-new-record-input"
                              type="text"
                              placeholder="209"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-lg-2">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6 input-name">Квартира</div>
                        <div className="col-lg-6">
                          <input
                            name="flat"
                            className="add-new-record-input"
                            type="text"
                            placeholder="209"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {" "}
                      <div className="row mt-lg-2">
                        <div
                          className="col-lg-4 input-name
"
                        >
                          Комментарий
                        </div>
                        <div className="col-lg-8">
                          <input
                            name="comment"
                            className="add-new-record-input comment mb-lg-2"
                            type="text"
                            placeholder="Информация отсутствует"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="col-lg-12 mb-lg-3">
                    <div className="row">
                      <div
                        className="col-lg-4 input-name
"
                      >
                        Дата рождения
                      </div>
                      <div className="col-lg-8">
                        <input
                          name="birthDate"
                          className="add-new-record-input"
                          type="text"
                          placeholder="дд.мм.гггг"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Пол
                    </div>
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-6">
                          {" "}
                          <input type="checkbox" name="genderMen" id="" />{" "}
                          мужской
                        </div>
                        <div className="col-lg-6">
                          <input type="checkbox" name="genderWomen" id="" />{" "}
                          женский
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Мобильный телефон
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="phoneNumber"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="8-918-476-33-24"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Email
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="email"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="email@examle.com"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Родитель
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="parent"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Александрова Алла Игоревна"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Откуда узнал
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="radio"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="рекомендации друзей"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Страховая компания
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="insurance"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="СПАС"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Действителен с
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="insuranceFrom"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="12.09.2010"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Действителен до
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="insuranceUntill"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="12.09.2010"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 input-name
"
                    >
                      Описание
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="description"
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="пусто"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 
 offset-lg-4 mt-lg-3"
                >
                  <button
                    onClick={() => this.props.saveRecord()}
                    className="save-button"
                    type="submit"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewRecord;
