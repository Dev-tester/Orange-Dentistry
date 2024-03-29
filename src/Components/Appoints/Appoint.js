import ru from 'date-fns/locale/ru';
import $ from "jquery";
import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter } from 'react-router-dom';
import './Appoint.css';
import Filters from './Filters';
import LiveFeed from './LiveFeed';
import Shedule from './Shedule.jsx';
registerLocale('ru', ru);

class Appoint extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: [],
			doctors: [],
			records: {I:[], II:[]},
			allRecords: {I:[], II:[]},
			currentDate: new Date(),
			medDirection: 1,// Терапевты по умолчанию
			customIntervals: {},    // вновь созданные интевалы по врачам через (поделить интервал)
			livefeedUpdate: false,
			calendarLoading:{
				daysGreen:[new Date()],
				daysYellow:[new Date()],
				daysRed:[new Date()],
			},
		}
		this.intervals = {
			I:[
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
			],
			II:[
				"14:30",
				"15:00",
				"15:30",
				"16:00",
				"16:30",
				"17:00",
				"17:30",
				"18:00",
				"18:30",
				"19:00",
				"19:30",
			]
		};
		this.calendarChange = this.calendarChange.bind(this);
		this.switchMedicalDirection = this.switchMedicalDirection.bind(this);
		this.getCurrentShedule = this.getCurrentShedule.bind(this);
		this.setEmptyIntervalsButtons = this.setEmptyIntervalsButtons.bind(this);
		this.setCalendarLoading = this.setCalendarLoading.bind(this);
		this.setDayLoading = this.setDayLoading.bind(this);
		this.monthChange = this.monthChange.bind(this);
		this.updateCustomIntervals = this.updateCustomIntervals.bind(this);
	}

	componentDidMount() {
		this.monthChange(this.state.currentDate);
	}

	calendarChange(date) {
		this.setState({
			currentDate: date
		});
		setTimeout(()=>this.monthChange(date),1);
	};

	monthChange(date){
		let self = this;
		this.setState({
			currentDate: date
		});
		// получили первый день календаря
		let startDate = $('.react-datepicker__month .react-datepicker__day')[0]||'';
		let endDate = $('.react-datepicker__month .react-datepicker__day').last()[0]||'';
		if (startDate) startDate = startDate.ariaLabel
		.replace(/^[^,]+,\s*/,'')
		.replace(/(\d+)(?:th|st)/,"$1");		// сразу форматируем дату
		if (endDate) endDate = endDate.ariaLabel
		.replace(/^[^,]+,\s*/,'')
		.replace(/(\d+)(?:th|st)/,"$1");		// сразу форматируем дату
		$.get("shedule/directions",{startDate: startDate, endDate: endDate}, function (response){
			let result = JSON.parse(response);
			self.setCalendarLoading(result.loading);
			self.setState({
				directions: result.directions
			});
			self.getCurrentShedule(self.state.currentDate, self.state.medDirection);
		});
	}

	setCalendarLoading(loading){
		console.log(loading);
		let className, daysGreen = [], daysYellow = [], daysRed = [];
		for (let i in loading){
			let dayLoading = loading[i].loading,
				date = new Date(loading[i].date),
				className = '';
			// слабая загруженность
			if (dayLoading <= 24){
				className = 'green';
				daysGreen.push(date);
			}
			// средняя загруженность
			else if (dayLoading <= 44){
				className = 'yellow';
				daysYellow.push(date);
			}
			// сильная загруженность
			else{
				className = 'red';
				daysRed.push(date);
			}
			// ищем день в календаре и ставим
			this.setDayLoading(loading[i].date, className)
		}
		this.setState({
			calendarLoading:{
				daysGreen:daysGreen,
				daysYellow:daysYellow,
				daysRed:daysRed,
			},
		});
	}

	// функция подневно проставляет загруженность для одного дня
	setDayLoading(date, className){
		date = date.split('-');
		// убираем год из заголовка
		let headerMonth = $('.react-datepicker__current-month').html().replace(/\s*\d+/,'');
		$('.react-datepicker__current-month').html(headerMonth.charAt(0).toUpperCase()+headerMonth.slice(1));
		// проставляем цвета дней
		let month = date[1], day = date[2], currentMonth = this.state.currentDate.getMonth()+1,
			monthDay, span,
			calendar = $('.react-datepicker__month .react-datepicker__day');
		// если это день из предыдущего месяца
		if (month < currentMonth || month > currentMonth){
			for (let i in calendar){
				monthDay = calendar[i];
				if (parseInt(monthDay.innerHTML) == parseInt(day) && $(monthDay).hasClass('react-datepicker__day--outside-month')){
					monthDay.innerHTML = null;
					span = $('<span />').addClass(className+" opaque").html(day);
					monthDay.appendChild(span[0]);
					break;
				}
			}
		}
		else{
			for (let i in calendar){
				monthDay = calendar[i];
				if (parseInt(monthDay.innerHTML) == parseInt(day) && !$(monthDay).hasClass('react-datepicker__day--outside-month')){
					monthDay.innerHTML = null;
					span = $('<span />').addClass(className).html(day);
					monthDay.appendChild(span[0]);
					break;
				}
			}
		}
	}

	switchMedicalDirection(direction, evt){
		// class=active-link
		this.setState({
			medDirection: direction
		});
		this.getCurrentShedule(this.state.currentDate, direction);
	}

	getCurrentShedule(currentDate, medDirection){
		let self = this;
		return $.get("shedule/records",
			{
				date: currentDate.toLocaleDateString(),
				direction: medDirection
			},
			function (response) {
				let result = JSON.parse(response);
				let recordsFirst = self.setEmptyIntervalsButtons(result.shedule.I,'I');
				let recordsSecond = self.setEmptyIntervalsButtons(result.shedule.II,'II');
				self.setState({
					doctors: result.doctors,
					records: {I:recordsFirst, II:recordsSecond},
					allRecords: {I:recordsFirst, II:recordsSecond},
				});
				self.LiveFeed.getLiveFeed();
			}
		);
	}

	// устанавливаем кнопки "Запись на приём" там где нет приёмов
	setEmptyIntervalsButtons(records, stage){
		function getMinY(data){
			return data.reduce((min, p) => p.appointedtime < min ? p.appointedtime : min, data[0].appointedtime);
		}
		function getMaxY(data){
			return data.reduce((max, p) => p.appointedtime > max ? p.appointedtime : max, data[0].appointedtime);
		}
		// перебираем всех докторов
		for (let doctorId in records) {
			let doctorRecords = records[doctorId], firstIdx, lastIdx,
				maxIdx = this.intervals[stage].length, intervals;
			//console.log(doctorRecords);
			if (!doctorRecords.length){	// пустые
				firstIdx = maxIdx;
				lastIdx = maxIdx;
				intervals = this.intervals[stage];
			}
			else{
				let len = doctorRecords.length;
				// добавляем промежуточные интервалы из записей
				intervals = this.updateCustomIntervals(doctorRecords, doctorId, stage);
				firstIdx = intervals.indexOf(getMinY(doctorRecords));
				lastIdx = intervals.indexOf(getMaxY(doctorRecords));
				maxIdx = intervals.length;
			}
			// проставляем интервалы до первой записи
			for (let idx = 0; idx < firstIdx; idx++) {
				records[doctorId].splice(idx, 0, {
					patient_id: null,
					appointedtime: intervals[idx],
				});
			}
			// проставляем интервалы после последней записи
			for (let idx = lastIdx+1; idx < maxIdx; idx++) {
				records[doctorId].splice(idx, 0, {
					patient_id: null,
					appointedtime: intervals[idx],
				});
			}
			// перебираем все записи пользователя
			for (let recordId in doctorRecords) {
				let lastRecord = doctorRecords[recordId],
					nextRecord = doctorRecords[parseInt(recordId) + 1],
					time = lastRecord.appointedtime,
					lastIdx = 0,
					nextIdx = 0,
					nextTime = nextRecord ? nextRecord.appointedtime : 0;
				// находим ближайшее время в шаблоне расписания для текущего и следующего приёма
				while (time > intervals[lastIdx]) lastIdx++;
				// если пустые интервалы сначала
				if (recordId=='0' && lastIdx > 0){
					for (let idx = 0; idx < lastIdx; idx++) {
						console.log(idx);
						records[doctorId].splice(idx, 0, {
							patient_id: null,
							appointedtime: intervals[idx],
						});
					}
				}
				while (nextTime > intervals[nextIdx]) nextIdx++;
				// если пропуск вставляем
				if (nextIdx > lastIdx + 1) {
					console.log(time, lastIdx, nextIdx);
					for (let idx = lastIdx + 1; idx < nextIdx; idx++) {
						//console.log(idx);
						//console.log(records[doctorId]);
						records[doctorId].splice(idx, 0, {
							patient_id: null,
							appointedtime: intervals[idx],
						});
					}
				}
			}
			//console.log(records[doctorId]);
		}
		return records;
	}

	updateCustomIntervals(doctorRecords, doctor, stage){
		let record, idx, customIntervals = this.state.customIntervals, intervals = [...this.intervals[stage]];          // [... делает копию массива а не ссылку на массив
		for (let recordId in doctorRecords) {
			record = doctorRecords[recordId];
			if (intervals.indexOf(record.appointedtime) == -1){
				idx = 0;
				while (intervals[idx] < record.appointedtime) idx++;
				if (customIntervals[doctor]){
					if (customIntervals[doctor].indexOf(record.appointedtime) != -1) continue;
					customIntervals[doctor].push(record.appointedtime);
				}
				else customIntervals[doctor] = [record.appointedtime];
			}
		}
		if (!customIntervals[doctor]) return intervals;
		this.setState({
			customIntervals: customIntervals
		});
		for (let interval of customIntervals[doctor]){
			idx = 0;
			while (intervals[idx] < interval) idx++;
			intervals.splice(idx, 0, interval);
		}
		return intervals;
	}

	render() {
		let branches = this.state.branches,
			directions = this.state.directions,
			names = this.state.names,
			timeFrom = this.state.timeFrom,
			timeTo = this.state.timeTo,
			Interval = this.state.Interval,
			highlightDays= [
				{green: this.state.calendarLoading.daysGreen},
				{yellow: this.state.calendarLoading.daysYellow},
				{red: this.state.calendarLoading.daysRed}
			];
		return (
			<BrowserRouter>
				<div className="row" style={{marginLeft:0}}>
					<div className="col-sm-2 col-md-2 col-lg-2">
						<div className="row">
							<div className="incomings">Входящие звонки</div>
						</div>
						<div className="row second text-left" style={{ minWidth: '300px' }}>
							<DatePicker
								selected={this.state.currentDate}
								onChange={this.calendarChange}
								onMonthChange={this.monthChange}
								highlightDates={highlightDays}
								/*renderDayContents={(day, date) => {
									return <span>{day}</span>;
								}}*/
								locale="ru"
								inline
							/>
						</div>
						<div className="row third text-left" style={{ minWidth: '300px' }}>
							<Filters currentDate={this.state.currentDate} medDirection={this.state.medDirection} parent={this}/>
						</div>
					</div>
					<div className="col-sm-8 col-md-8 col-lg-8" style={{ maxWidth: '1231px' }}>
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
								<input type="text" className="page-search ui-block" placeholder="Поиск"/>
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
					<div className="col-sm-2 col-md-2 col-lg-2" style={{ padding: 0 }}>
						<LiveFeed update={this.state.livefeedUpdate} parent={this}/>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default Appoint;