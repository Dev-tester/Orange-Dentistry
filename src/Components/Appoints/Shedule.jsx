import $ from "jquery"; // для работы dev, на prod - закомментить
import React from "react";
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import "./Appoint.css";
import Vector from "./media/appoint/Vector";
import PatientPopboxInfo from "./PatientPopboxInfo/PatientPopboxInfo";
import Popbox from "./popbox";

class Shedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addAppoint: {},
			appointButtonClicked: false,
			hideBtnClicked: false,
			patientInfoBtnClicked: false,
			currentDate:this.props.currentDate,
			medDirection:this.props.medDirection
		};
		this.callChange = this.callChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
		this.addAppoint = this.addAppoint.bind(this);
		this.closePopbox = this.closePopbox.bind(this);
		this.hideShedule = this.hideShedule.bind(this);
		this.showShedule = this.showShedule.bind(this);
		this.showPatientInfo = this.showPatientInfo.bind(this);
		this.closePatientInfo = this.closePatientInfo.bind(this);
		this.getNearestTime = this.getNearestTime.bind(this);
		this.parent = this.props.parent;
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps);
	}

	callChange(calls) {}

	timeChange(time) {}

	clickEvent() {}

	addAppoint(props,evt) {
		evt.preventDefault();
		let doctor = this.parent.state.doctors.filter(function (doctor){
			return doctor.id == props.doctorId;
		});
		props.doctor = doctor[0].name;
		props.time = this.getNearestTime(props.doctorId);
		let interval = this.parent.intervals.indexOf(props.time),
			nextTime;
		if (interval == 10) nextTime = '14:30';
		else nextTime = this.parent.intervals[interval+1];
		props.nextTime = nextTime;
		props.date = this.parent.state.currentDate.toLocaleDateString();
		this.setState({
			addAppoint: props,
			appointButtonClicked: true
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

	getNearestTime(doctorId){
		let records = this.parent.state.records,
			doctorRecords = records[doctorId];
		if (!doctorRecords || !doctorRecords.length) return '09:00';
		let nextTime = '';
		for (let idx in this.parent.intervals){
			let time = this.parent.intervals[idx],
				existing = doctorRecords.filter(function (record) {
				return record.appointedtime == time;
			});
			if (!existing.length){
				nextTime = time;
				break;
			}
		}
		console.log(nextTime);
		return nextTime;
	}

	render() {
		let date = new Date();
		let today = date.getDate();
		let thisMonth = date.getMonth();
		//console.log(today);
		//console.log(thisMonth);

		let doctors = this.parent.state.doctors,
			records = this.parent.state.records;
		return (
			<div className="main-schedule ui-block col-lg-12">
				{this.state.hideBtnClicked ? null : (
					<div className="hide-shedule-btn">
						<button onClick={() => this.hideShedule()}></button>
					</div>
				)}

				{!this.state.hideBtnClicked ? (
					<div className="main-schedule-title">
						<div className="top-row">
							<strong>
								{format(this.state.currentDate, 'do MMMM u', {locale: ru}).replace(/-е/,'')}<span>|</span>{this.props.stage} смена
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
													return !record.patient_id ? (
														<div
															className="patient-shedule-wrap blanked"
															key={recordIndex}
														>
															<div className="patient-time">
																{record.appointedtime}
															</div>
															<button
																className="patient-empty-block"
																onClick={this.addAppoint.bind(this, {
																										doctorId: doctor.id,
																										time: record.appointedtime,
																									}
																)}
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
																	{record.actions[0] ? record.actions.map((action, actionIndex) => {
																		return (
																			<li
																				className={action}
																				key={actionIndex}
																			></li>
																		);
																	}):''}
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
											onClick={this.addAppoint.bind(this, {
													doctorId: doctor.id,
													time: '09:00',
												}
											)}
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
		  appoint={this.state.addAppoint}
		  AppointForm={this.parent}
        />
      </div> // прописать под <Popbox /> модалку для редактирования юзеров
    );
  }
}

export default Shedule;
