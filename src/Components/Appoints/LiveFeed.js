import React from 'react';

class LiveFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [{	"name":"Ткачева Антонина",
						"phone":'+7 (918) 123-45-67',
						"date":"29.08.2020",
						"time":"11:00-11:15",
						"doctorName":"Иванов И.И.",
					},
					{	"name":"Ткачева Антонина",
						"phone":'+7 (918) 123-45-67',
						"date":"29.08.2020",
						"time":"11:00-11:15",
						"doctorName":"Иванов И.И.",
					},
					{	"name":"Ткачева Антонина",
						"phone":'+7 (918) 123-45-67',
						"date":"29.08.2020",
						"time":"11:00-11:15",
						"doctorName":"Иванов И.И.",
					},
					{	"name":"Ткачева Антонина",
						"phone":'+7 (918) 123-45-67',
						"date":"29.08.2020",
						"time":"11:00-11:15",
						"doctorName":"Иванов И.И.",
					},
					{	"name":"Ткачева Антонина",
						"phone":'+7 (918) 123-45-67',
						"date":"29.08.2020",
						"time":"11:00-11:15",
						"doctorName":"Иванов И.И.",
					}
				],
		}
		this.callChange = this.callChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
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

	callChange(calls){

	};

	timeChange(time){

	};

	clickEvent(){

	}

	render() {
		let events = this.state.events,
			Interval = this.state.Interval;
		return (
			<div className="livefeed-box">
				<div className="row buttons">
					<button className="call"></button>
					<button className="calendar"></button>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div id="events-box">
							{events.map((value, index) => {
								return <div className={"event-wrap"+(index%2 ? " odd":"")} onClick={this.clickEvent} key={index}>
									<div className="col-sm-6 col-md-6 col-lg-6">
										<div>{value.name}</div>
										<div>{value.phone}</div>
									</div>
									<div className="col-sm-6 col-md-6 col-lg-6">
										<div><b>Дата:</b><span>{value.date}</span></div>
										<div><b>Время:</b><span>{value.time}</span></div>
										<div><b>Врач:</b><span>{value.doctorName}</span></div>
									</div>
								</div>
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LiveFeed;