import React from "react";
import Close from "../media/appoint/Close";
import "./CancelRecord.css";
class CancelRecord extends React.Component {
  state = {};
  render() {
    return (
      <div className="patient-cancelRecord-popbox">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 left-part">
              <div className="row">
                <div className="col-lg-12 mb-2 pt-lg-5 text-left">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        {" "}
                        <strong>{this.props.selectPatient.name}</strong>{" "}
                      </p>
                    </div>
                    <div className="col-lg-6 text-rifght">
                      <p>{this.props.selectPatient.time}</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mt-lg-3">
                  <div className="row">
                    <div className="col-lg-2 text-left">
                      {" "}
                      <p>Причина:</p>
                    </div>
                    <div className="col-lg-10 ">
                      <input
                        className="input-doctor"
                        type="text"
                        placeholder="Неизвестна"
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
            <div className="col-lg-5  right-part">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-1 offset-lg-11">
                      {" "}
                      <Close closeClicked={this.props.cancelRecordClose} />
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

export default CancelRecord;
