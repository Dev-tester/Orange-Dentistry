import React from 'react';
import DatePicker from "react-datepicker";
import Filters from './Filters';
import LiveFeed from './LiveFeed';
import "react-datepicker/dist/react-datepicker.css";
import './Appoint.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);


class Appoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specializations: [  'Терапевты','Хирурги','Ортопеды','Ортодонты'],
      names: [  'Иванов И.И.','Александрова А.А.','Буслаев И.Э.','Вердеревская И.И.'],
      startDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(date){
    this.setState({
      startDate: date
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
        <div className="App">
          <div className="col-sm-2 col-md-2 col-lg-2">
            <div className="row">
              <div className="incomings">Входящие звонки</div>
            </div>
            <div className="row second text-left" style={{minWidth:'300px'}}>
              <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  locale="ru"
                  inline
              />
            </div>
            <div className="row third text-left" style={{minWidth:'300px'}}>
              <Filters />
            </div>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-8" style={{maxWidth:'1216px'}}>
            <div className="row" style={{margin:'10px -30px'}}>
              <div className="col-sm-4 col-md-4 col-lg-4 text-left">
                <div className="page-title">Запись на приём</div>
                <div className="page-breadcrumb">
                  <span style={{color: '#F08786'}}>Главная</span>
                  <span>*</span>
                  <span>Запись на приём</span>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="page-search ui-block">Поиск</div>
              </div>
            </div>
            <div className="row" style={{marginTop:'45px'}}>
              <div className="doctor-menu ui-block">
                <ul>
                  {specializations.map((value, index) => {
                    return <li><a key={index}>{value}</a></li>
                  })}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="main-schedule ui-block">
                <div className="main-schedule-title">
                  <div className="top-row">15 сентября 2020<span>|</span>1 смена</div>
                  <div className="doctors-shedule row">
                    {names.map((value, index) => {
                      return <div className="col-sm-3 col-md-3 col-lg-3">{value}</div>
                    })}
                  </div>
                  <div className="patients-shedule row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <div className="patient-shedule-wrap">
                        <div className="patient-time">9:00</div>
                        <div className="patient-shedule-block">
                          <div className="patient-name">Бальсунов И.В.</div>
                          <ul className="patient-actions">
                            <li className="called"></li>
                            <li className="user"></li>
                          </ul>
                          <span className="birthday"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <div className="patient-shedule-wrap">
                        <div className="patient-time">9:00</div>
                        <div className="patient-shedule-block">
                          <div className="patient-name">Бальсунов И.В.</div>
                          <ul className="patient-actions">
                            <li className="called"></li>
                          </ul>
                          <span className="birthday"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <div className="patient-shedule-wrap">
                        <div className="patient-time">9:00</div>
                        <div className="patient-shedule-block">
                          <div className="patient-name">Бальсунов И.В.</div>
                          <ul className="patient-actions">
                            <li className="called"></li>
                            <li className="user"></li>
                          </ul>
                          <span className="birthday"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                      <div className="patient-shedule-wrap">
                        <div className="patient-time">9:00</div>
                        <div className="patient-shedule-block">
                          <div className="patient-name">Бальсунов И.В.</div>
                          <ul className="patient-actions">
                            <li className="called"></li>
                          </ul>
                          <span className="birthday"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <LiveFeed/>
          </div>
        </div>
    );
  }
}

export default Appoint;