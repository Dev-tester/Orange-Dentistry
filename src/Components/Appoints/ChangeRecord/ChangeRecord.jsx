import React from "react";
import Close from "../media/appoint/Close";
import "./ChangeRecord.css";

class ChangeRecord extends React.Component {
  state = {};
  render() {
    return (
      <div className="patient-changeRecord-popbox">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 changeRecord-left-part">
              <div className="row">
                <div className="col-lg-12 mb-2 pt-lg-1 text-left">
                  <p>
                    {" "}
                    <strong>{this.props.selectPatient.name}</strong>{" "}
                  </p>
                </div>
                <div className="col-lg-12 mb-lg-2">
                  <div className="row">
                    <div className="col-lg-2 text-left">
                      <p>Дата:</p>
                    </div>
                    <div className="col-lg-10 input-date-block">
                      <input
                        className="input-date"
                        type="text"
                        placeholder="20.09.2020"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-lg-6 text-left">Прием с:</div>
                        <div className="col-lg-6">
                          <input
                            className="input-from"
                            type="text"
                            placeholder={this.props.selectPatient.time}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row">
                        <div className="col-lg-5 text-left">до:</div>
                        <div className="col-lg-7">
                          <input
                            className="input-untill"
                            type="text"
                            placeholder="12:00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-lg-2">
                  <div className="row">
                    <div className="col-lg-2 text-left">
                      {" "}
                      <p>Врач:</p>
                    </div>
                    <div className="col-lg-10 input-doc-block">
                      <input
                        className="input-doctor"
                        type="text"
                        placeholder="Иванов И.И."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p>Комментарий:</p>
                </div>
                <div className="col-lg-12 text-left">
                  <textarea
                    maxLength="75"
                    className="input-comment"
                    type="text"
                    placeholder="Максимальная длина комментария не должна превышать 75 символов исключая пробелы"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4  right-part">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-1 offset-lg-11">
                      {" "}
                      <Close closeClicked={this.props.changeRecordClose} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 cancel-btn">
                  <button className="">Отменить</button>
                </div>
                <div className="col-lg-12 save-btn">
                  <button className="">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeRecord;
