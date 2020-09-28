import React from 'react';
import $ from "jquery";

class LiveFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			update: false,
		}
		this.getLiveFeed = this.getLiveFeed.bind(this);
		this.callChange = this.callChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.clickEvent = this.clickEvent.bind(this);
		this.props.parent.LiveFeed = this;
	}

	componentDidMount() {
		this.getLiveFeed();
	}

	/*static getDerivedStateFromProps(newState, oldState) {
		let update;
		if (!state.update) update = props.update;
		if (state.update && state.update != props.update) {
			return {
				update: state.update,
			};
		}
		return null;
	}*/

	callChange(calls){

	};

	timeChange(time){

	};

	clickEvent(){

	}

	getLiveFeed(){
		let self = this;
		return $.get("shedule/livefeed",
			function (response) {
				let result = JSON.parse(response);
				self.setState({
					events: result,
				});
			}
		);
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
										<div><b>Врач:</b><span>{value.doctorname}</span></div>
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