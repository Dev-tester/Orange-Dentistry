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
			records: [],
			startDate: new Date(),
			medDirection:1,// Терапевты по умолчанию
		}
		this.calendarChange = this.calendarChange.bind(this);
		this.switchMedicalDirection = this.switchMedicalDirection.bind(this);
	}

	componentDidMount() {
		let self = this;
		return $.get("http://dentistry.test/shedule/directions", function (response){
			let result = JSON.parse(response);
			self.setState({
				directions: result
			});
		});
	}

	calendarChange(date) {
		this.setState({
			startDate: date
		});
	};

	switchMedicalDirection(direction,evt){
		// class=active-link
		this.setState({
			medDirection: direction
		});
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
									selected={this.state.startDate}
									onChange={this.calendarChange}
									locale="ru"
									inline
								/>
							</div>
							<div className="row third text-left" style={{ minWidth: '300px' }}>
								<Filters currentDate={this.state.startDate} medDirection={this.state.medDirection} />
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
								<Shedule currentDate={this.state.startDate} medDirection={this.state.medDirection} stage={'I'}/>
							</div>
							<div className="row">
								<Shedule currentDate={this.state.startDate} medDirection={this.state.medDirection} stage={'II'}/>
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