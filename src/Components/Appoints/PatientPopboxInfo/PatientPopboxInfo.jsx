import React from "react";
import Bell from "../media/appoint/Bell";
import Chair from "../media/appoint/Chair/Chair";
import Clock from "../media/appoint/Clock/Clock";
import Close from "../media/appoint/Close";
import Finish from "../media/appoint/Finish/Finish";
import "./PatientPopboxInfo.css";

class PatientPopboxInfo extends React.Component {
  state = {};
  render() {
    return (
      <div className="patient-info-popbox">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 left-part">
              <div className="row">
                <div className="col-lg-6 mt-lg-2">
                  {" "}
                  <p className="name">
                    {" "}
                    <strong>Чемерис Наталья</strong>{" "}
                  </p>{" "}
                  <p className="birth-date">12.03.1962</p>
                </div>
                <div className="col-lg-6 mt-lg-2">
                  <p className="status-patient">
                    {" "}
                    <strong> Первичный</strong>
                  </p>{" "}
                  <p className="visit-time">11:30-12:00 (00:30)</p>
                </div>
                <div className="col-lg-12">
                  <div className="row status-buttons mt-lg-2">
                    <div className="col-lg-3 ready-btn">
                      {" "}
                      <button>
                        <Bell />
                      </button>{" "}
                    </div>
                    <div className="col-lg-3 inProgress-btn">
                      {" "}
                      <button>
                        <Chair />
                      </button>{" "}
                    </div>
                    <div className="col-lg-3 finish-btn">
                      {" "}
                      <button>
                        <Finish />
                      </button>
                    </div>
                    <div className="col-lg-2 offset-lg-1 waiting-btn">
                      {" "}
                      <button>
                        <Clock />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  {" "}
                  <p>+7(123)456-78-90</p>{" "}
                </div>
                <div className="col-lg-6">
                  <p>+7(123)456-78-90</p>
                </div>
                <div className="col-lg-12">
                  <div className="row comment mt-lg-2 pb-lg-2">
                    <div className="col-lg-12">
                      <p>Комментарий к приему:</p>
                    </div>
                    <div className="col-lg-12">
                      <p>
                        Максимальная длина комментария не должна превышать 75
                        символов исключая пробелы
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5  right-part">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    {" "}
                    <div className="col-lg-1 offset-lg-9">
                      <Close />
                    </div>{" "}
                  </div>
                </div>
                <div className="col-lg-12 pt-lg-3">
                  {" "}
                  <p>Разделить интервал</p>{" "}
                </div>
                <hr />
                <div className="col-lg-12 mb-lg-1">
                  <p>Изменить запись</p>
                </div>
                <div className="col-lg-12">
                  <p>Отменить прием</p>
                </div>
                <hr />
                <div className="col-lg-12">
                  <p>
                    {" "}
                    <strong>К карточке</strong>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientPopboxInfo;
