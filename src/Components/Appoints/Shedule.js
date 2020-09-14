import React from 'react';

class Shedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			doctors:[],
			records: [],
		}
		this.callChange = this.callChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
	}

	componentDidMount() {
		fetch("http://dentistry.test/shedule/records",{
			mode: "no-cors",
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result.items
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

	callChange(calls){

	};

	timeChange(time){

	};

	clickEvent(){

	}

	render() {
		let doctors = this.state.doctors,
			records = this.state.records,
			Interval = this.state.Interval;
		return (
			<div className="main-schedule ui-block">
				<div className="main-schedule-title">
					<div className="top-row">15 сентября 2020<span>|</span>1 смена</div>
					<div className="doctors-shedule row">
						{doctors.map((value, index) => {
							return <div className="col-sm-3 col-md-3 col-lg-3"><div>{value.name}</div><div>{value.branch}</div></div>
						})}
					</div>
					<div className="patients-shedule row">
						{doctors.map((value, index) => {
							return (
								<div className="col-sm-3 col-md-3 col-lg-3">
									{records.map((value, index) => {
										return (
											<div className="patient-shedule-wrap">
												<div className="patient-time">{value.appointedtime}</div>
												<div className="patient-shedule-block">
													<div className="patient-name">{value.name}</div>
													<ul className="patient-actions">
														{value.actions.map((action, index) => {
															return <li className={action}></li>
														})}
													</ul>
												</div>
											</div>
										)
									})}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Shedule;