import * as axios from "axios";
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchActiveOn = this.searchActiveOn.bind(this);
    this.searchActiveOff = this.searchActiveOff.bind(this);
    this.addNewRecordClose = this.addNewRecordClose.bind(this);
    this.saveRecordClick = this.saveRecordClick.bind(this);
    this.saveRecordClose = this.saveRecordClose.bind(this);
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
      this.setState((prevState) => {
        const newUsers = prevState.users.filter((el) => {
          return el.name.match(value);
        });
        console.log(newUsers);
        return { users: newUsers };
      });
    }
    if (value === "") {
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?count=${this.state.usersPortion}`
        )
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return { users: response.data.items };
          });
        });
      console.log(this.state.users);
    }

    console.log(this.state.users);
  }

  searchActiveOn() {
    this.setState(() => {
      return { ...this.state, searchActive: true };
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
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.state.usersPortion}`
      )
      .then((response) => {
        console.log(response);
        this.setState(() => {
          return { users: response.data.items };
        });
      });
  }
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
            <div className="col-lg-12 popbox_buttons">
              <div className="row">
                <div className={"offset-lg-3 col-lg-3 button_appoint"}>
                  <button>Записать на прием</button>
                </div>
                <div className={"col-lg-4 button_add_patient"}>
                  <button onClick={() => this.addNewRecordClick()}>
                    Добавить нового пациента
                  </button>
                </div>
              </div>
            </div>
            {this.state.searchActive && this.state.users ? (
              <div className={"col-lg-12 search_results"}>
                <div className="row">
                  <div className="col-lg-2">
                    <p>
                      {" "}
                      <strong>Номер карты</strong>{" "}
                    </p>
                    {this.state.users.map((el, index) => {
                      return <li key={index}>{el.med_card_id}</li>;
                    })}
                  </div>
                  <div className="col-lg-4">
                    <p>
                      {" "}
                      <strong>ФИО</strong>{" "}
                    </p>

                    <ul>
                      {this.state.users.map((el, index) => {
                        return <li key={index}>{el.name}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-lg-3">
                    {" "}
                    <strong>
                      <p>Дата рождения</p>{" "}
                    </strong>{" "}
                    {this.state.users.map((el, index) => {
                      return <li key={index}>{el.birthday}</li>;
                    })}
                  </div>
                  <div className="col-lg-3">
                    {" "}
                    <strong>
                      {" "}
                      <p>Номер телефона</p>{" "}
                    </strong>{" "}
                    {this.state.users.map((el, index) => {
                      return <li key={index}>{el.phone}</li>;
                    })}
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
