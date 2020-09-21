import $ from "jquery";
import React from "react";
import Close from "../media/appoint/Close";
import "./ChangeRecord.css";

class ChangeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
    };
  }
  componentDidMount() {
    return $.get("http://dentistry.test/shedule/records", (response) => {
      let result = JSON.parse(response);
      console.log(result.doctors);
      console.log(result.shedule);
      this.setState(() => {
        return { doctors: result.doctors };
      });
    });
  }
  render() {
    return (
      <div className="patient-changeRecord-popbox">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 left-part">
              <div className="row">
                <div className="col-lg-12 mb-2 pt-lg-2 text-left">
                  <p>
                    {" "}
                    <strong>Чемерис Наталья</strong>{" "}
                  </p>
                </div>
                <div className="col-lg-12 mb-lg-2">
                  <div className="row">
                    <div className="col-lg-2 text-left">
                      <p>Дата:</p>
                    </div>
                    <div className="col-lg-10">
                      <select className="input-date">
                        <option value="date">20.09.2020</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="row">
                        <div className="col-lg-6 text-left">Прием с:</div>
                        <div className="col-lg-6">
                          <select className="input-date">
                            <option value="timeFrom">11:30</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="row">
                        <div className="col-lg-5 text-left">до:</div>
                        <div className="col-lg-7 untill">
                          <select className="input-untill">
                            <option value="timeUntill">12:00</option>
                          </select>
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
                    <div className="col-lg-10 ">
                      <select>
                        {this.state.doctors.map((el) => {
                          return <option value={el.name}>{el.name}</option>;
                        })}
                      </select>
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
            <div className="col-lg-5  right-part">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-1 offset-lg-9">
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
