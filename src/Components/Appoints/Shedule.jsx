import $ from "jquery"; // для работы dev, на prod - закомментить
import React from "react";
import "./Appoint.css";
import Vector from "./media/appoint/Vector";
import PatientPopboxInfo from "./PatientPopboxInfo/PatientPopboxInfo";
import Popbox from "./popbox";

class Shedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      records: [],
      appointButtonClicked: false,
      hideBtnClicked: false,
      patientInfoBtnClicked: false,
    };
    this.intervals = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
    ];
    this.callChange = this.callChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
    this.appointClicked = this.appointClicked.bind(this);
    this.closePopbox = this.closePopbox.bind(this);
    this.hideShedule = this.hideShedule.bind(this);
    this.showShedule = this.showShedule.bind(this);
    this.showPatientInfo = this.showPatientInfo.bind(this);
    this.closePatientInfo = this.closePatientInfo.bind(this);
  }

  componentDidMount() {
    // эта подложка для localhost:3000. На prod - закоментить
    let self = this;
    return $.get("http://dentistry.test/shedule/records", function (response) {
      let result = JSON.parse(response);
      console.log(result.shedule);
      self.setState({
        isLoaded: true,
        doctors: result.doctors,
        records: result.shedule,
      });
    });
  }

  callChange(calls) {}

  timeChange(time) {}

  clickEvent() {}
  appointClicked(e) {
    e.preventDefault();
    this.setState(() => {
      return { appointButtonClicked: true };
    });
  }
  closePopbox() {
    this.setState(() => {
      return { appointButtonClicked: false };
    });
  }
  hideShedule() {
    this.setState((prevState) => {
      return { hideBtnClicked: true };
    });
  }
  showShedule() {
    this.setState(() => {
      return { hideBtnClicked: false };
    });
  }
  showPatientInfo() {
    this.setState(() => {
      return { patientInfoBtnClicked: true };
    });
  }
  closePatientInfo() {
    this.setState(() => {
      return { patientInfoBtnClicked: false };
    });
  }

  render() {
    let date = new Date();
    let today = date.getDate();
    let thisMonth = date.getMonth();
    console.log(today);
    console.log(thisMonth);

    let doctors = this.state.doctors,
      records = this.state.records,
      Interval = this.state.Interval;
    // перебираем всех пользователей
    for (let userId in records) {
      let userRecords = records[userId];
      console.log(userRecords);
      // перебираем все записи пользователя
      for (let recordId in userRecords) {
        let lastRecord = userRecords[recordId],
          nextRecord = userRecords[parseInt(recordId) + 1],
          time = lastRecord.appointedtime,
          lastIdx = 0,
          nextIdx = 0,
          nextTime = nextRecord ? nextRecord.appointedtime : 0;
        // находим ближайшее время в шаблоне расписания для текущего и следующего приёма
        while (time > this.intervals[lastIdx]) lastIdx++;
        while (nextTime > this.intervals[nextIdx]) nextIdx++;
        // если пропуск вставляем
        if (nextIdx > lastIdx + 1) {
          console.log(time, lastIdx, nextIdx);
          for (let idx = lastIdx + 1; idx < nextIdx; idx++) {
            console.log(idx);
            console.log(records[userId]);
            records[userId].splice(idx, 0, {
              patientid: null,
              appointedtime: this.intervals[idx],
            });
          }
        }
      }
      console.log(records[userId]);
    }
    //let nextTime = this.intervals.indexOf(record.appointedtime)+1;
    return (
      <div className="main-schedule ui-block col-lg-12">
        {this.state.hideBtnClicked ? null : (
          <div className="row">
            <div className="col-lg-1 offset-lg-11 hide-shedule-btn">
              <button onClick={() => this.hideShedule()}></button>
            </div>
          </div>
        )}

        {!this.state.hideBtnClicked ? (
          <div className="main-schedule-title">
            <div className="top-row">
              <strong>
                {today} сентября 2020<span>|</span>I смена
              </strong>
            </div>
            <div className="doctors-shedule row">
              {doctors.map((value, index) => {
                return (
                  <div className="col-sm-3 col-md-3 col-lg-3" key={index}>
                    <div className="name">{value.name}</div>
                    <div className="branch">{value.branch}</div>
                  </div>
                );
              })}
            </div>
            <div className="patients-shedule row">
              {doctors.map((doctor, doctorIndex) => {
                return (
                  <div
                    className="col-sm-3 col-md-3 col-lg-3 patient-squad"
                    key={doctorIndex}
                  >
                    {records[doctor.id]
                      ? records[doctor.id].map((record, recordIndex) => {
                          return !record.patientid ? (
                            <div
                              className="patient-shedule-wrap blanked"
                              key={recordIndex}
                            >
                              <div className="patient-time">
                                {record.appointedtime}
                              </div>
                              <button
                                className="patient-empty-block"
                                onClick={(e) => this.appointClicked(e)}
                              ></button>
                            </div>
                          ) : (
                            <div
                              className="patient-shedule-wrap"
                              key={recordIndex}
                            >
                              <div className="patient-time">
                                {record.appointedtime}
                              </div>
                              <div
                                onClick={() => this.showPatientInfo()}
                                className={
                                  "patient-shedule-block " + record.status
                                }
                              >
                                <div className="patient-name">
                                  {record.patient}
                                </div>
                                <ul className="patient-actions">
                                  {record.actions.map((action, actionIndex) => {
                                    return (
                                      <li
                                        className={action}
                                        key={actionIndex}
                                      ></li>
                                    );
                                  })}
                                </ul>
                              </div>
                              {this.state.patientInfoBtnClicked ? (
                                <PatientPopboxInfo
                                  patientName={record.patient}
                                  closePatientInfo={this.closePatientInfo}
                                />
                              ) : null}
                            </div>
                          );
                        })
                      : ""}
                    <button
                      onClick={(e) => this.appointClicked(e)}
                      className={"patient-appoint"}
                    >
                      Записать
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="show-shedule-btn pb-4">
            <div className="row">
              <div className="col-lg-5 offset-lg-1 left-line">
                {" "}
                <hr />
              </div>
              <div className="col-lg-1 circle-btn">
                <button onClick={() => this.showShedule()}>
                  <Vector />
                </button>
              </div>
              <div className="col-lg-5 right-line">
                <hr />
              </div>
            </div>
          </div>
        )}

        <Popbox
          closeClicked={this.closePopbox}
          clicked={this.state.appointButtonClicked}
        />
      </div> // прописать под <Popbox /> модалку для редактирования юзеров
    );
  }
}

export default Shedule;
