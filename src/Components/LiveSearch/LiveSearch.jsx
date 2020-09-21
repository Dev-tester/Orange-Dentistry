import * as axios from "axios";
import React from "react";
import $ from "jquery";
import "./LiveSearch.css";

class LiveSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patients: this.props.patients,
		}
		this.selectPatient = this.selectPatient.bind(this);
		this.parent = this.props.parent;
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState(nextProps);
	}

	selectPatient(props, evt){
		this.parent.setState({
			selectedPatient: props,
			addNewPatientClicked: true,
			searchActive:false,
		});
	}

	render() {
		return (
			<div className={"col-lg-12 search_results"}>
				<div className="row">
					<div className="col-lg-2 first-col">
						<p><strong>Номер карты</strong></p>
					</div>
					<div className="col-lg-4">
						<p><strong>ФИО</strong></p>
					</div>
					<div className="col-lg-2 birthday-col">
						<p><strong>Дата рождения</strong></p>
					</div>
					<div className="col-lg-2">
						<p><strong>Номер телефона</strong></p>
					</div>
				</div>
				{this.state.patients.map((el, index) => {
					let med_card = el.med_card_id.toString();
					// если номер < 8 знаков, дополняем сначала нулями
					return <div className="row" key={index} onClick={this.selectPatient.bind(this, {
																										medCard:	med_card.length < 8 ? med_card.padStart(8, "0"):med_card,
																										family: 	el.family,
																										name:		el.name,
																										surname:	el.surname,
																										birthday: 	el.birthday,
																										phone: 		el.phone.replace(/\(/,' (').replace(/\)/,') '),
																									})}>
								<div className="col-lg-2 first-col">
									{med_card.length<8 ? med_card.padStart(8, "0"):med_card}
								</div>
								<div className="col-lg-4">{el.fio}</div>
								<div className="col-lg-2 birthday-col">{el.birthday}</div>
								<div className="col-lg-2">
									{el.phone.replace(/\(/,' (').replace(/\)/,') ')}
								</div>
							</div>
						})
				}
			</div>
		);
	}
}

export default LiveSearch;
