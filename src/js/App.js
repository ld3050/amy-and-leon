import _ from 'lodash';
import React, {Component} from 'react';

const DEFAULT_GUEST = {name: '', email:'', attending:'yes'};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guests: [ Object.assign({}, DEFAULT_GUEST) ],
      attendance: 'yes',
      paperless: false
    }
  }

  render() {
    return (
      <div className="form-horizontal">
        { _.map(this.state.guests, (guest, index) => this.renderGuestSection(guest, index)) }
        <button type="button" className="pull-right btn btn-default" onClick={() => this.addGuest()}>Add another name</button>

        <div className="attendance col-md-9 col-md-offset-3" >
          <div className="radio">
            <label>
              <input type="radio" name="attend-radio" id="attend-radio1" value="yes"
                checked={this.state.attendance === 'yes'}
                onChange={() => this.onAttendanceChanged('yes')}  />
              I wouldn&apos;t miss it!
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="attend-radio" id="attend-radio2" value="no"
                checked={this.state.attendance === 'no'}
                onChange={() => this.onAttendanceChanged('no')}  />
              Sorry, I can&apos;t make it :(
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="attend-radio" id="attend-radio3" value="maybe"
                checked={this.state.attendance === 'maybe'}
                onChange={() => this.onAttendanceChanged('maybe')}  />
              I&apos;m not sure just now, but I&apos;ll let you know.
            </label>
          </div>
        </div>

        <div className="form-group horizontal">
          <label htmlFor="dietary-reqs" className="col-md-3 control-label">Dietary Requirements:</label>
          <div className="col-md-9">
            <textarea rows="2" className="form-control" id="dietary-reqs" />
          </div>
        </div>

        <div className="form-group horizontal">
          <label htmlFor="message" className="col-md-3 control-label">Sweet Message:</label>
          <div className="col-md-9">
            <textarea rows="2" className="form-control" id="message" />
          </div>
        </div>

        <div className="col-md-3"><div className={`tree ${this.state.paperless ? 'selected' : ''}`}></div></div>
        <div className="col-md-9">
          <div className="checkbox paperless">
            <label>
              <input type="checkbox" id='paperless'
                value={this.state.paperless}
                onChange={() => this.setState({paperless: !this.state.paperless})} />
                Go paperless! (all correspondence will be sent electronically)
            </label>
          </div>
        </div>

        <div className="button-section col-md-9 col-md-offset-3" >
          <button type="button" className="btn btn-link privacy">Privacy</button>
          <button type="button" className="pull-right btn btn-primary" onClick={() => this.submit()}>Submit</button>
        </div>
      </div>
    );
  }

  renderGuestSection(guest, index) {
    return (<div key={`guest-${index}`}>
      <div className="form-group horizontal">
        <label htmlFor={`fullname-${index}`} className="col-md-3 control-label">Name:</label>
        <div className="col-md-9">
          <input type="text" className="form-control" id={`fullname-${index}`} />
        </div>
      </div>

      <div className="form-group horizontal">
        <label htmlFor={`email-${index}`} className="col-md-3 control-label">Email:</label>
        <div className="col-md-9">
          <input type="email" className="form-control" id={`email-${index}`} />
        </div>
      </div>

    </div>);
  }

  addGuest() {
    this.setState({
      guests: _.concat(this.state.guests, Object.assign({}, DEFAULT_GUEST) )
    });
  }

  onAttendanceChanged(value) {
    this.setState({ attendance: value });
  }

  submit() {
    console.log(this.state);
  }
}
