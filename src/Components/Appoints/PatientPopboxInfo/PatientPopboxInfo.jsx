import React from "react";
import CancelRecord from "../CancelRecord/CancelRecord";
import ChangeRecord from "../ChangeRecord/ChangeRecord";
import Bell from "../media/appoint/Bell";
import Chair from "../media/appoint/Chair/Chair";
import Clock from "../media/appoint/Clock/Clock";
import Close from "../media/appoint/Close";
import Finish from "../media/appoint/Finish/Finish";
import "./PatientPopboxInfo.css";

class PatientPopboxInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeRecordBtnClicked: false,
      cancelRecordBtnClicked: false,
    };
    this.parent = this.props.parent;
    this.changeRecordOpen = this.changeRecordOpen.bind(this);
    this.changeRecordClose = this.changeRecordClose.bind(this);
    this.cancelRecordOpen = this.cancelRecordOpen.bind(this);
    this.cancelRecordClose = this.cancelRecordClose.bind(this);
  }

  changeRecordOpen() {
    this.setState(() => {
      return { changeRecordBtnClicked: true };
    });
  }
  changeRecordClose() {
    this.setState(() => {
      return { changeRecordBtnClicked: false };
    });
  }
  cancelRecordOpen() {
    this.setState(() => {
      return { cancelRecordBtnClicked: true };
    });
  }
  cancelRecordClose() {
    this.setState(() => {
      return { cancelRecordBtnClicked: false };
    });
  }
  render() {
    return (
      <div className="patient-info-popbox">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 left-part">
              <div className="row">
                <div className="col-lg-6 mt-lg-2">
                  {" "}
                  <p className="name">
                    {" "}
                    <strong>{this.props.selectPatient.name}</strong>{" "}
                  </p>{" "}
                  <p className="birth-date">12.03.1962</p>
                </div>
                <div className="col-lg-6 mt-lg-2">
                  <p className="status-patient">
                    {" "}
                    <strong> Первичный</strong>
                  </p>{" "}
                  <p className="visit-time">{this.props.selectPatient.time}</p>
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
                <div className="col-lg-6 phone mt-lg-2 mb-lg-2">
                  {" "}
                  <p>+7(123)456-78-90</p>{" "}
                </div>
                <div className="col-lg-6 phone mt-lg-2 mb-lg-2">
                  <p>+7(123)456-78-90</p>
                </div>
                <div className="col-lg-12">
                  <div className="row comment  pb-lg-2">
                    <div className="col-lg-12">
                      <p>Комментарий к приему:</p>
                    </div>
                    <div className="col-lg-12 pb-lg-5">
                      <p>
                        Максимальная длина комментария не должна превышать 75
                        символов исключая пробелы
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4  right-part">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    {" "}
                    <div className="col-lg-1 offset-lg-11">
                      <Close closeClicked={this.props.closePatientInfo} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row"> </div>
                </div>
                <div className="col-lg-12 pt-lg-3">
                  {" "}
                  <p>Разделить интервал</p>{" "}
                </div>
                <hr />
                <div
                  onClick={() => this.changeRecordOpen()}
                  className="col-lg-12 mb-lg-1"
                >
                  <p>Изменить запись</p>
                </div>
                <div
                  onClick={() => this.cancelRecordOpen()}
                  className="col-lg-12"
                >
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
            {this.state.changeRecordBtnClicked ? (
              <ChangeRecord
                selectPatient={this.props.selectPatient}
                changeRecordClose={this.changeRecordClose}
              />
            ) : null}
            {this.state.cancelRecordBtnClicked ? (
              <CancelRecord
                selectPatient={this.props.selectPatient}
                cancelRecordClose={this.cancelRecordClose}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PatientPopboxInfo;
