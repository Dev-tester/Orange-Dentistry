import React from 'react';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			branches: [	'Филиалы',
						'Краснодар','Армавир','Новороссийск'],
			specializations: [	'Профессия',
								'Терапевты','Хирурги','Ортопеды','Ортодонты'],
			names: ['Врач',
					'Иванов И.И.','Александрова А.А.','Буслаев И.Э.','Вердеревская И.И.'],
			timeFrom:[	'с',
						'9:00',  '9:30','10:00','10:30','11:00','11:30','12:00','12:30',
						'13:00','13:00','14:00','14:30','15:00','15:30','16:00','16:30',
						'17:00','17:30','18:00','18:30','19:00','19:30'],
			timeTo:[	'до',
						'9:00',  '9:30','10:00','10:30','11:00','11:30','12:00','12:30',
						'13:00','13:00','14:00','14:30','15:00','15:30','16:00','16:30',
						'17:00','17:30','18:00','18:30','19:00','19:30'],
			Interval:['минут','15 минут','30 минут']
		}
		this.branchChange = this.branchChange.bind(this);
		this.specialChange = this.specialChange.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.timeFromChange = this.timeFromChange.bind(this);
		this.timeToChange = this.timeToChange.bind(this);
		this.IntervalChange = this.IntervalChange.bind(this);
	}

	componentDidMount() {
		/*jQuery('#dp-container').datepicker($.extend({}, $.datepicker.regional['ru-Ru'],{
			  "yearRange":"2016:2024",
			  "showOtherMonths":true,
			  "defaultDate":null,
			  "altField":"#w0",
			  "dateFormat":"dd-mm-yy"
			}
		));*/
	}

	branchChange(branches){
		this.setState({
			branches: branches
		});
	};

	specialChange(specializations){
		this.setState({
			specializations: specializations
		});
	};

	nameChange(names){
		this.setState({
			names: names
		});
	};

	timeFromChange(time){
		this.setState({
			timeFrom: time
		});
	};

	timeToChange(time){
		this.setState({
			timeTo: time
		});
	};

	IntervalChange(interval){
		this.setState({
			interval: interval
		});
	};

	render() {
		let branches = this.state.branches,
			specializations = this.state.specializations,
			names = this.state.names,
			timeFrom = this.state.timeFrom,
			timeTo = this.state.timeTo,
			Interval = this.state.Interval;
		return (
			<div className="filters-box">
				<div className="row title">
					<div className="col-sm-12 col-md-12 col-lg-12">Фильтры</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="branches">
							{branches.map((value, index) => {
								return <option value={value} onChange={this.branchChange} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="specializations">
							{specializations.map((value, index) => {
								return <option value={value} onChange={this.specialChange} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="names">
							{names.map((value, index) => {
								return <option value={value} onChange={this.nameChange} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row intervals">
					<div className="col-sm-4 col-md-4 col-lg-4" style={{paddingLeft:0}}>
						<select id="timefrom">
							{timeFrom.map((value, index) => {
								return <option value={value} onChange={this.timeFromChange} key={index}>{value}</option>
							})}
						</select>
					</div>
					<div className="col-sm-4 col-md-4 col-lg-4">
						<select id="timeto">
							{timeTo.map((value, index) => {
								return <option value={value} onChange={this.timeToChange} key={index}>{value}</option>
							})}
						</select>
					</div>
					<div className="col-sm-4 col-md-4 col-lg-4" style={{paddingRight:0}}>
						<select id="interval">
							{Interval.map((value, index) => {
								return <option value={value} onChange={this.IntervalChange} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row buttons">
					<div className="col-sm-6 col-md-6 col-lg-6 clear">
						<button>Очистить</button>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-6 update">
						<button>Обновить</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Filters;