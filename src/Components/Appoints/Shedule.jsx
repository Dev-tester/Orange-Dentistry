import React from "react";
import "./Appoint.css";
import Popbox from "./popbox";

class Shedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [
        { id: 1, name: "Иванов И. И.", branch: "Кубанская, 54" },
        { id: 2, name: "Александрова А. А.", branch: "Кубанская, 54" },
        { id: 3, name: "Буслаев И. Э.", branch: "Кубанская, 54" },
        { id: 4, name: "Вердеревская И. И.", branch: "Кубанская, 54" },
      ],
      records: [
        {
          id: 1,
          appointedtime: "09:00",
          patientid: 1,
          doctorid: 1,
          patient: "Бальсунов И. В.",
          status: "green",
          actions: ["sms_verified", "red_umb"],
        },
        {
          id: 2,
          appointedtime: "09:30",
          patientid: 2,
          doctorid: 1,
          patient: "Караваева К. С.",
          status: "green",
          actions: ["sms_verified", "call"],
        },
        {
          id: 3,
          appointedtime: "10:00",
          patientid: 3,
          doctorid: 1,
          patient: "Овощников К. А.",
          status: "green",
          actions: ["red_umb"],
        },
      ],
      appointButtonClicked: false,
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
  }

  //   componentDidMount() {
  //     this.setState({
  //       isLoaded: true,
  //       records: [
  //         [],
  //         JSON.parse(
  //           "[" +
  //             '{"id":1,"appointedtime":"09:00","patientid":1,"doctorid":1,"patient":"Бальсунов И. В.","status":"green","actions":["sms_verified","red_umb"]},' +
  //             '{"id":2,"appointedtime":"09:30","patientid":2,"doctorid":1,"patient":"Караваева К. С.","status":"green","actions":["sms_verified","call"]},' +
  //             '{"id":3,"appointedtime":"10:00","patientid":3,"doctorid":1,"patient":"Овощников К. А.","status":"green","actions":["red_umb"]},' +
  //             '{"id":4,"appointedtime":"10:30","patientid":4,"doctorid":2,"patient":"Горлатых Е. М.","status":"red_gray","actions":["sms_unverified","red_person","green_umb"]},' +
  //             '{"id":5,"appointedtime":"11:30","patientid":5,"doctorid":2,"patient":"Чемерис Н. .","status":"green","actions":["red_person"]},' +
  //             '{"id":6,"appointedtime":"13:00","patientid":6,"doctorid":3,"patient":"Воронина М. С.","status":"yellow","actions":["green_umb","red_person"]},' +
  //             '{"id":7,"appointedtime":"13:30","patientid":7,"doctorid":3,"patient":"Первак М. М.","status":"green","actions":["sms_unverified"]},' +
  //             '{"id":8,"appointedtime":"14:00","patientid":8,"doctorid":3,"patient":"Сытников Ю. Ф.","status":"red_gray","actions":["sms_unverified","call"]}]'
  //         ),
  //       ],
  //     });
  //     // fetch("http://dentistry.test/shedule/records",{
  //     // 	mode: "no-cors",
  //     // })
  //     // .then(res => res.json())
  //     // .then(
  //     // 	(result) => {
  //     // 		console.log(JSON.stringify(result.shedule[1]));
  //     // 		this.setState({
  //     // 			isLoaded: true,
  //     // 			doctors: result.doctors,
  //     // 			records: result.shedule
  //     // 		});
  //     // 	},
  //     // 	// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
  //     // 	// чтобы не перехватывать исключения из ошибок в самих компонентах.
  //     // 	(error) => {
  //     // 		this.setState({
  //     // 			isLoaded: true,
  //     // 			error
  //     // 		});
  //     // 	}
  //     // )
  //   }

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

  render() {
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
        <div className="main-schedule-title">
          <div className="top-row">
            15 сентября 2020<span>|</span>1 смена
          </div>
          <div className="doctors-shedule row">
            {doctors.map((value, index) => {
              return (
                <div className="col-sm-3 col-md-3 col-lg-3" key={index}>
                  <div className="name">{value.name}</div>
                  <div className="branch">{value.branch}</div>{" "}
                  {this.intervals.map((el) => {
                    return (
                      <div className="row mb-lg-2">
                        <div className="col-lg-4">{el}</div>

                        {this.state.records.map((record) => {
                          if (record.appointedtime === el) {
                            return (
                              <div className="col-lg-6 patient-block">
                                {record.patient}
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <Popbox
          closeClicked={this.closePopbox}
          clicked={this.state.appointButtonClicked}
        />
      </div>
    );
  }
}

export default Shedule;
