import * as axios from "axios";
import React from "react";
import Close from "../Appoints/media/appoint/Close";
import "./AddNewRecord.css";

class AddNewRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastname: "",
      name: "",
      patronymic: "",
      city: "",
      street: "",
      home: "",
      pavilion: "",
      flat: "",
      comment: "",
      birthDate: "",
      genderMen: "",
      genderWomen: "",
      phoneNumber: "",
      email: "",
      parent: "",
      radio: "",
      insurance: "",
      insuranceFrom: "",
      insuranceUntill: "",
      description: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post("https://ru.reactjs.org/docs/forms", this.state);
  }
  handleChange(e) {
    const input = e.target;
    this.setState(() => {
      return { [input.name]: input.value };
    });
  }
  render() {
    return (
      <div className="add-new-record">
        <form
          id="newPatient"
          action="/shedule/addpatient"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit(e);
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
                        onChange={(e) => this.handleChange(e)}
                        name="lastname"
                        value={this.state.lastname}
                        className="add-new-record-input mb-lg-2"
                        type="text"
                        placeholder="Александрова"
                        form="newPatient"
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
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.patronymic}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.city}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.street}
                        onChange={(e) => this.handleChange(e)}
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
                              value={this.state.home}
                              onChange={(e) => this.handleChange(e)}
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
                              value={this.state.pavilion}
                              onChange={(e) => this.handleChange(e)}
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
                            value={this.state.flat}
                            onChange={(e) => this.handleChange(e)}
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
                            value={this.state.comment}
                            onChange={(e) => this.handleChange(e)}
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
                          value={this.state.birthDate}
                          onChange={(e) => this.handleChange(e)}
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
                          <input
                            value={this.state.genderMen}
                            onChange={(e) => this.handleChange(e)}
                            type="checkbox"
                            name="genderMen"
                            id=""
                          />{" "}
                          мужской
                        </div>
                        <div className="col-lg-6">
                          <input
                            value={this.state.genderWomen}
                            onChange={(e) => this.handleChange(e)}
                            type="checkbox"
                            name="genderWomen"
                            id=""
                          />{" "}
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
                        value={this.state.phoneNumber}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.parent}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.radio}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.insurance}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.insuranceFrom}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.insuranceUntill}
                        onChange={(e) => this.handleChange(e)}
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
                        value={this.state.description}
                        onChange={(e) => this.handleChange(e)}
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
