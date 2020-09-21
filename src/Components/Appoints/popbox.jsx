import $ from "jquery";
import React from "react";
import AddNewRecord from "../AddNewRecord/AddNewRecord";
import RecordSaved from "../RecordCreated/RecordSaved";
import Close from "./media/appoint/Close";
import "./popbox.css";

class Popbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchActive: false,
      targetValue: "",
      users: [],
      usersPortion: 7,
      addNewRecordClicked: false,
      recordSaved: false,
      searchWasFocused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchActiveOn = this.searchActiveOn.bind(this);
    this.searchActiveOff = this.searchActiveOff.bind(this);
    this.addNewRecordClose = this.addNewRecordClose.bind(this);
    this.saveRecordClick = this.saveRecordClick.bind(this);
    this.saveRecordClose = this.saveRecordClose.bind(this);
    this.inputWasFocused = this.inputWasFocused.bind(this);
    this.inputUnfocused = this.inputUnfocused.bind(this);
    this.deleteArrUsersFromState = this.deleteArrUsersFromState.bind(this);
  }

  getUsers() {
    return $.get("http://dentistry.test/shedule/records", (response) => {
      let result = JSON.parse(response);
      console.log(result.doctors);
      console.log(result.shedule);
      let arr = Object.values(result.shedule);
      let newUsers = arr.flat(Infinity);
      return newUsers;
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    e.preventDefault();
    const value = e.target.value;
    console.log(e.target.value);
    this.setState(() => {
      return { targetValue: value };
    });

    if (value.length > 0) {
      return $.get("http://dentistry.test/shedule/patients?q=", (response) => {
        let newUsers = JSON.parse(response);
        console.log(newUsers);
        // let arr = Object.values(result.shedule);
        // const newUsers = arr.flat(Infinity);
        // console.log(newUsers);
        this.setState(() => {
          const neededUsers = newUsers.filter((el) => {
            return el.fio.toLowerCase().match(value.toLowerCase());
          });
          console.log(newUsers);
          return { users: neededUsers };
        });
      });
    }
  }

  inputWasFocused() {
    this.setState(() => {
      return { searchWasFocused: true };
    });
  }
  inputUnfocused() {
    this.setState(() => {
      return { searchWasFocused: false };
    });
  }
  searchActiveOn() {
    this.setState(() => {
      return { ...this.state, searchActive: true, searchWasFocused: true };
    });
  }
  searchActiveOff() {
    this.setState(() => {
      return { ...this.state, searchActive: false };
    });
  }
  addNewRecordClick() {
    this.setState(() => {
      return { addNewRecordClicked: true };
    });
  }
  addNewRecordClose() {
    this.setState(() => {
      return { addNewRecordClicked: false };
    });
  }
  saveRecordClick() {
    this.setState(() => {
      return { recordSaved: true };
    });
  }
  saveRecordClose() {
    this.setState(() => {
      return { recordSaved: false };
    });
  }
  deleteArrUsersFromState(e) {
    debugger;
    let target = e;
    console.log(target);
    if (target.key === "Backspace" && this.state.targetValue.length <= 1) {
      this.setState(() => {
        const usersNullArr = this.state.users.splice(
          0,
          this.state.users.length + 1
        );
        return { users: usersNullArr };
      });
    }
  }
  componentDidMount() {}
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state !== prevState) {
  //       axios
  //         .get(
  //           `https://social-network.samuraijs.com/api/1.0/users?count=${this.state.usersPortion}`
  //         )
  //         .then((response) => {
  //           console.log(response);
  //           this.setState(() => {
  //             return { users: response.data.items };
  //           });
  //         });

  //       if (!this.state.users && this.state.targetValue > 0) {
  //         this.setState(() => {
  //           let newUsers = this.state.users.filter((el) => {
  //             return el.name.match(this.state.targetValue);
  //           });
  //           console.log(newUsers);
  //           return { users: newUsers };
  //         });
  //       }
  //     }
  //   }

  render() {
    let matchesNone =
      this.state.searchWasFocused &&
      this.state.targetValue.length > 0 &&
      this.state.users.length === 0;
    {
      if (this.props.clicked) {
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
                    <div className={" text col-lg-3 mt-lg-4"}>
                      <p>
                        Время: <strong>такое то</strong>
                      </p>
                    </div>
                    <div className={"col-lg-1"}>
                      {" "}
                      <Close closeClicked={this.props.closeClicked} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={"col-lg-12 input_container"}>
              <input
                onKeyDown={(e) => this.deleteArrUsersFromState(e)}
                onChange={(e) => this.handleChange(e)}
                onFocus={() => this.searchActiveOn()}
                onBlur={() => this.searchActiveOff()}
                className={"mx-auto patient-appoint-form-input"}
                type={"text"}
                placeholder={
                  "Начните вводить номер карты / Фамилию или номер телефона"
                }
              ></input>
            </div>
            {matchesNone ? <p>Совпадений не найдено</p> : null}
            <div className="col-lg-12 popbox_buttons">
              <div className="row">
                {matchesNone ? null : (
                  <div className={"offset-lg-3 col-lg-3 button_appoint"}>
                    <button>Записать на прием</button>
                  </div>
                )}

                <div className={"col-lg-4 button_add_patient"}>
                  <button onClick={() => this.addNewRecordClick()}>
                    Добавить нового пациента
                  </button>
                </div>
              </div>
            </div>
            {this.state.searchActive && this.state.users.length > 0 ? (
              <div className={"col-lg-12 search_results"}>
                <div className="row">
                  <div className="col-lg-2">
                    <p>
                      {" "}
                      <strong>Номер карты</strong>{" "}
                    </p>
                    <ul>
                      {this.state.users.map((el, index) => {
                        return <li key={index}>{el.med_card_id}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-lg-4">
                    <p>
                      {" "}
                      <strong>ФИО</strong>{" "}
                    </p>

                    <ul>
                      {this.state.users.map((el, index) => {
                        return <li key={index}>{el.fio}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-lg-3">
                    {" "}
                    <strong>
                      <p>Дата рождения</p>{" "}
                    </strong>{" "}
                    <ul>
                      {this.state.users.map((el, index) => {
                        return <li key={index}>{el.birthday}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-lg-3">
                    {" "}
                    <strong>
                      {" "}
                      <p>Номер телефона</p>{" "}
                    </strong>{" "}
                    <ul>
                      {this.state.users.map((el, index) => {
                        return <li key={index}>{el.phone}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.addNewRecordClicked ? (
              <div>
                <AddNewRecord
                  closed={this.addNewRecordClose}
                  AddNewRecordClose={this.addNewRecordClose}
                  saveRecord={this.saveRecordClick}
                />
              </div>
            ) : null}
            {this.state.recordSaved ? (
              <RecordSaved closeSaveRecord={this.saveRecordClose} />
            ) : null}
          </div>
        );
      }
    }
    return null;
  }
}

export default Popbox;
