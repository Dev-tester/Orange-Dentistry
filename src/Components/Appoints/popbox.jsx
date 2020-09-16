import React from "react";
import "./popbox.css";
class Popbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <div className={"patient-appoint-form"}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className={"text col-lg-4 mt-lg-4"}>
                  <p>
                    Врач: <strong>такой то</strong>
                  </p>
                </div>
                <div className={"text col-lg-4 mt-lg-4"}>
                  <p>
                    Дата: <strong>такая то</strong>
                  </p>
                </div>
                <div className={" text col-lg-4 mt-lg-4"}>
                  <p>
                    Время: <strong>такое то</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"col-lg-12 input_container"}>
          <input
            onChange={(e) => this.handleChange(e)}
            className={"mx-auto"}
            type={"text"}
            placeholder={
              "Начните вводить номер карты / Фамилию или номер телефона"
            }
          ></input>
        </div>
        <div className="col-lg-12 popbox_buttons">
          <div className="row">
            <div className={"offset-lg-3 col-lg-3 button_appoint"}>
              <button>Записать на прием</button>
            </div>
            <div className={"col-lg-4 button_add_patient"}>
              <button>Добавить нового пациента</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popbox;
