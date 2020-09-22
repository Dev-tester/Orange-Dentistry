import ru from 'date-fns/locale/ru';
import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, NavLink, Redirect, Route } from 'react-router-dom';
import './Appoint.css';
import Filters from './Filters';
import LiveFeed from './LiveFeed';
import Shedule from './Shedule.jsx';
import $ from "jquery";
registerLocale('ru', ru);


class Appoint extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: [],
			doctors: [],
			records: [],
			allRecords: [],
			currentDate: new Date(),
			medDirection:1,// Терапевты по умолчанию
		}
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
		this.calendarChange = this.calendarChange.bind(this);
		this.switchMedicalDirection = this.switchMedicalDirection.bind(this);
		this.getCurrentShedule = this.getCurrentShedule.bind(this);
		this.setEmptyIntervalsButtons = this.setEmptyIntervalsButtons.bind(this);
		this.setCalendarLoading = this.setCalendarLoading.bind(this);
		this.setDayLoading = this.setDayLoading.bind(this);
	}

	componentDidMount() {
		let self = this;
		// получили первый день календаря
		let startDate = $('.react-datepicker__month .react-datepicker__day')[0]||'';
		if (startDate) startDate = startDate.ariaLabel
									.replace(/^[^,]+,\s*/,'')
									.replace(/(\d+)(?:th|st)/,"$1");		// сразу форматируем дату
		$.get("shedule/directions",{startDate: startDate}, function (response){
			let result = JSON.parse(response);
			self.setCalendarLoading(result.loading);
			self.setState({
				directions: result.directions
			});
			self.getCurrentShedule(self.state.currentDate,self.state.medDirection);
		});
	}

	calendarChange(date) {
		this.setState({
			currentDate: date
		});
		this.getCurrentShedule(date,this.state.medDirection);
	};

	setCalendarLoading(loading){
		console.log(loading);
		let className;
		for (let i in loading){
			let dayLoading = loading[i].loading,
				date = loading[i].date,
				className = '';
			// слабая загруженность
			if (dayLoading <= 12) className = 'green';
			// средняя загруженность
			else if (dayLoading <= 22) className = 'yellow';
			// сильная загруженность
			else className = 'red';
			// ищем день в календаре и ставим
			this.setDayLoading(date, className)
		}
	}

	setDayLoading(date, className){
		date = date.split('-');
		let month = date[1], day = date[2], currentMonth = 9,
			monthDay, span,
			calendar = $('.react-datepicker__month .react-datepicker__day');
		if (month < currentMonth) console.log('TODO before');
		else if (month > currentMonth) console.log('TODO after');
		else{
			for (let i in calendar){
				monthDay = calendar[i];
				if (monthDay.innerHTML == day){
					monthDay.innerHTML = null;
					span = $('<span />').addClass(className).html(day);
					monthDay.appendChild(span[0]);
					break;
				}
			}
		}
	}

	switchMedicalDirection(direction,evt){
		// class=active-link
		this.setState({
			medDirection: direction
		});
		this.getCurrentShedule(this.state.currentDate,direction);
	}

	getCurrentShedule(currentDate, medDirection){
		let self = this;
		return $.get("shedule/records",
			{
				date:currentDate.toLocaleDateString(),
				direction:medDirection
			},
			function (response) {
				let result = JSON.parse(response);
				let records = self.setEmptyIntervalsButtons(result.shedule);
				self.setState({
					doctors: result.doctors,
					records: records,
					allRecords: records,
				});
			}
		);
	}

	// устанавливаем кнопки "Запись на приём" там где нет приёмов
	setEmptyIntervalsButtons(records){
		// перебираем всех пользователей
		for (let doctorId in records) {
			let doctorRecords = records[doctorId];
			//console.log(doctorRecords);
			// перебираем все записи пользователя
			for (let recordId in doctorRecords) {
				let lastRecord = doctorRecords[recordId],
					nextRecord = doctorRecords[parseInt(recordId) + 1],
					time = lastRecord.appointedtime,
					lastIdx = 0,
					nextIdx = 0,
					nextTime = nextRecord ? nextRecord.appointedtime : 0;
				// находим ближайшее время в шаблоне расписания для текущего и следующего приёма
				while (time > this.intervals[lastIdx]) lastIdx++;
				// если пустые интервалы сначала
				if (recordId=='0' && lastIdx > 0){
					for (let idx = 0; idx < lastIdx; idx++) {
						console.log(idx);
						records[doctorId].splice(idx, 0, {
							patient_id: null,
							appointedtime: this.intervals[idx],
						});
					}
				}
				while (nextTime > this.intervals[nextIdx]) nextIdx++;
				// если пропуск вставляем
				if (nextIdx > lastIdx + 1) {
					console.log(time, lastIdx, nextIdx);
					for (let idx = lastIdx + 1; idx < nextIdx; idx++) {
						//console.log(idx);
						//console.log(records[doctorId]);
						records[doctorId].splice(idx, 0, {
							patient_id: null,
							appointedtime: this.intervals[idx],
						});
					}
				}
			}
			//console.log(records[doctorId]);
		}
		return records;
	}

	render() {
		let branches = this.state.branches,
			directions = this.state.directions,
			names = this.state.names,
			timeFrom = this.state.timeFrom,
			timeTo = this.state.timeTo,
			Interval = this.state.Interval;
		return (
			<BrowserRouter>
				<div className="App">
					<div className="row">
						<div className="col-sm-2 col-md-2 col-lg-2">
							<div className="row">
								<div className="incomings">Входящие звонки</div>
							</div>
							<div className="row second text-left" style={{ minWidth: '300px' }}>
								<DatePicker
									selected={this.state.currentDate}
									onChange={this.calendarChange}
									locale="ru"
									inline
								/>
							</div>
							<div className="row third text-left" style={{ minWidth: '300px' }}>
								<Filters currentDate={this.state.currentDate} medDirection={this.state.medDirection} Appoint={this}/>
							</div>
						</div>
						<div className="col-sm-8 col-md-8 col-lg-8" style={{ maxWidth:'1216px' }}>
							<div className="row" style={{ margin: '10px -30px' }}>
								<div className="col-sm-4 col-md-4 col-lg-4 text-left">
									<div className="page-title">Запись на приём</div>
									<div className="page-breadcrumb">
										<span style={{ color: '#F08786' }}>Главная</span>
										<span>•</span>
										<span>Запись на приём</span>
									</div>
								</div>
								<div className="col-sm-6 col-md-6 col-lg-6">
									<div className="page-search ui-block">Поиск</div>
								</div>
							</div>
							<div className="row" style={{ marginTop: '45px' }}>
								<div className="med-directions-menu ui-block col-lg-12">
									<ul>
										{directions.map((value, index) => {
											return <li className="direct-item" key={index} onClick={this.switchMedicalDirection.bind(this, value.id)}><a className={value.id==this.state.medDirection ? 'active-link':''}>{value.title}</a></li>
										})}
									</ul>
								</div>
							</div>
							<div className="row">
								<Shedule currentDate={this.state.currentDate} medDirection={this.state.medDirection} stage={'I'} parent={this}/>
							</div>
							<div className="row">
								<Shedule currentDate={this.state.currentDate} medDirection={this.state.medDirection} stage={'II'} parent={this}/>
							</div>
						</div>
						<div className="col-sm-2 col-md-2 col-lg-2" style={{padding:0}}>
							<LiveFeed />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Appoint;