import React from "react";
import Check from "../Appoints/media/appoint/Check";
import Close from "../Appoints/media/appoint/Close";
import "./RecordSaved.css";
class RecordSaved extends React.Component {
  state = {};
  render() {
    return (
      <div className="record-saved">
        <div className="container">
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
            <div className="col-lg-2"></div>
            <div className="col-lg-1">
              {" "}
              <Close closeClicked={this.props.closeSaveRecord} />{" "}
            </div>
            <div className="col-lg-12">
              <div className="row green-box">
                <div className="col-lg-1 succs-img">
                  <Check />
                </div>
                <div className="col-lg-4 appoint">Запись создана</div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row left-box">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-12">
                      {" "}
                      <strong>Столярова Анна Ивановна</strong>{" "}
                    </div>
                    <div className="col-lg-12">Карта № 908654</div>
                    <div className="col-lg-12">27.05.1970</div>
                    <div className="col-lg-12">
                      Телефон <strong>+7(123)456 78-90</strong>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  {" "}
                  <div className="row right-box">
                    <div className="col-lg-12 mt-3">
                      Врач: <strong>Иванов И.И.</strong>{" "}
                    </div>
                    <div className="col-lg-12">
                      Дата: <strong>08.09.2020</strong>{" "}
                    </div>
                    <div className="col-lg-12">
                      Время <strong>11:30 - 12:00 (0:30)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <input
                className="input-recordSaved"
                type="text"
                placeholder="Комментарий"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecordSaved;
