import React from 'react';
import './Appoint.css';
import $ from 'jquery';			// для работы dev, на prod - закомментить
import Popbox from "./popbox"
class Shedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			doctors: [],
			records: [],
			appointButtonClicked: false,
		}
		this.intervals = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00']
		this.callChange = this.callChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
	}

	componentDidMount() {
		// эта подложка для localhost:3000. На prod - закоментить
		let self = this;
		return $.get("http://dentistry.test/shedule/records", function (response) {
			let result = JSON.parse(response);
			self.setState({
				isLoaded: true,
				doctors: result.doctors,
				records: result.shedule
			});
		});
		// это prod
		fetch("shedule/records",{
			mode: "no-cors",
		})
		.then(res => res.json())
		.then(
			(result) => {
				console.log(JSON.stringify(result.shedule[1]));
				this.setState({
					isLoaded: true,
					doctors: result.doctors,
					records: result.shedule
				});
			},
			// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
			// чтобы не перехватывать исключения из ошибок в самих компонентах.
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	callChange(calls) {

	};

	timeChange(time) {

	};

	clickEvent() {

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
				let lastRecord = userRecords[recordId], nextRecord = userRecords[parseInt(recordId) + 1],
					time = lastRecord.appointedtime, lastIdx = 0, nextIdx = 0,
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
						records[userId].splice(idx, 0, { "patientid": null, "appointedtime": this.intervals[idx] });
					}
				}
			}
			console.log(records[userId]);
		}
		//let nextTime = this.intervals.indexOf(record.appointedtime)+1;
		return (
			<div className="main-schedule ui-block col-lg-12">
				<div className="main-schedule-title">
					<div className="top-row">15 сентября 2020<span>|</span>1 смена</div>
					<div className="doctors-shedule row">
						{doctors.map((value, index) => {
							return <div className="col-sm-3 col-md-3 col-lg-3" key={index}><div className="name">{value.name}</div><div className="branch">{value.branch}</div></div>
						})}

					</div>
					<div className="patients-shedule row">
						{doctors.map((doctor, doctorIndex) => {
							return (
								<div className="col-sm-3 col-md-3 col-lg-3" key={doctorIndex}>
									{records[doctor.id] ? records[doctor.id].map((record, recordIndex) => {
										return (!record.patientid ?
											<div className="patient-shedule-wrap blanked" key={recordIndex}>
												<div className="patient-time">{record.appointedtime}</div>
												<button className="patient-empty-block"></button>
											</div>
											:
											<div className="patient-shedule-wrap" key={recordIndex}>
												<div className="patient-time">{record.appointedtime}</div>
												<div className={"patient-shedule-block " + record.status}>
													<div className="patient-name">{record.patient}</div>
													<ul className="patient-actions">
														{record.actions.map((action, actionIndex) => {
															return <li className={action} key={actionIndex}></li>
														})}
													</ul>
												</div>

											</div>

										)
									}) : ''}
									<button  className={"patient-appoint"}>Записать</button>
								</div>

							)
						})}
					</div>
				</div>
				<Popbox clicked = {this.state.appointButtonClicked}/>
				</div>
		)
	}
}

export default Shedule;