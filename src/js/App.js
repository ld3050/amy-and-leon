import concat from 'lodash/concat';
import map from 'lodash/map';
import React, {Component} from 'react';

const DEFAULT_GUEST = { name: '', email:'' };

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guests: [ Object.assign({}, DEFAULT_GUEST) ],
      attendance: 'yes',
      paperless: false,
      submitting: false,
      showSuccess: false,
      showFailure: false,
      address: ''
    }
  }

  render() {
    return (
      <div className="form-horizontal">
        <div className="form-group horizontal">
          <div className="col-md-12">
            We will be sending out invitations with more details closer to the date, but you may RSVP now if you like.
          </div>
        </div>

        { map(this.state.guests, (guest, index) => this.renderGuestSection(guest, index)) }
        <div className="form-group horizontal">
          <div className="col-md-4 col-md-offset-8">
            <button type="button" className="pull-right btn btn-default" onClick={() => this.addGuest()}>Add another name</button>
          </div>
        </div>

        <div className="attendance form-group horizontal">
          <div className="col-md-9 col-md-offset-3" >
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
        </div>

        <div className="form-group horizontal">
          <label htmlFor="dietary-reqs" className="col-md-3 control-label">Dietary Requirements:</label>
          <div className="col-md-9">
            <textarea rows="2" className="form-control" id="dietary-reqs"
              value={this.state.dietaryReqs}
              onChange={(evt) => this.setState({ dietaryReqs: evt.target.value })}/>
          </div>
        </div>

        <div className="form-group horizontal">
          <label htmlFor="message" className="col-md-3 control-label">Sweet Message (Optional):</label>
          <div className="col-md-9">
            <textarea rows="2" className="form-control" id="message"
              value={this.state.message}
              onChange={(evt) => this.setState({ message: evt.target.value })} />
          </div>
        </div>

        <div className="form-group horizontal">
          <div className="col-md-3"><div className={`tree ${this.state.paperless ? 'selected' : ''}`}></div></div>
          <div className="col-md-9">
            <div className="radio">
              <label>
                <input type="radio" name="paperless-radio" id="paperless-radio1" value="yes"
                  checked={this.state.paperless}
                  onChange={() => this.setState({paperless: true})}  />
                  Go paperless! (all correspondence will be sent electronically)
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="paperless-radio" id="paperless-radio2" value="no"
                  checked={!this.state.paperless}
                  onChange={() => this.setState({paperless: false})}  />
                  Send to this mailing address:
              </label>
            </div>
            <div>
              <textarea rows="2" className="form-control" disabled={this.state.paperless}
                value={this.state.address}
                onChange={evt => this.setState({address: evt.target.value})}></textarea>
            </div>
          </div>
        </div>

        <div className="button-section form-group horizontal">
          <div className="col-md-9 col-md-offset-3" >
            <button type="button" className="btn btn-link privacy" data-toggle="modal" data-target="#privacy-modal">Privacy</button>
            <button type="button" className="pull-right btn btn-primary" onClick={() => this.submit()}
                    disabled={ this.state.submitting || !this.isMandatoryFieldsSpecified() }>
              { !this.state.submitting ? 'Submit' : 'Submitting...' }
            </button>
          </div>
        </div>

        <div className="button-section form-group horizontal">
          <div className="col-md-9 col-md-offset-3" >
            { this.renderSuccess() }
            { this.renderFailure() }
          </div>
        </div>

      </div>
    );
  }

  isMandatoryFieldsSpecified() {
    return this.state.guests[0].name.trim() !== '';
  }

  renderGuestSection(guest, index) {
    const emailField = <input type="email" className="form-control" id={`email-${index}`}
                          value={guest.email}
                          onChange={(evt) => this.onGuestChange('email', evt.target.value, index)} />;
    return (<div key={`guest-${index}`}>
      <div className="form-group horizontal">
        <label htmlFor={`fullname-${index}`} className="col-md-3 control-label">
          Name<span className="mandatory">*</span>:
        </label>
        <div className="col-md-9">
          <input type="text" className="form-control" id={`fullname-${index}`}
            value={guest.name}
            onChange={(evt) => this.onGuestChange('name', evt.target.value, index)} />
        </div>
      </div>

      <div className="form-group horizontal">
        <label htmlFor={`email-${index}`} className="col-md-3 control-label">Email:</label>
        <div className="col-md-9">
          { index == 0 ? emailField :
            <div className="input-group">
              { emailField }
              <div className="input-group-btn">
                <button className="btn btn-default" onClick={() => this.removeGuest(index)}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          }
        </div>
      </div>

    </div>);
  }

  renderSuccess() {
    if (!this.state.showSuccess) return;
    return <div className="sent-message bg-success">
      <span className="glyphicon glyphicon-ok" />
      { ' Your message has been sent!' }
      { this.state.attendance === 'yes' ? ' See you there!' : '' }
      { this.state.attendance === 'maybe' ? ' Let us know!' : '' }
      { this.state.attendance === 'no' ? " Sorry you can't make it :(" : '' }
    </div>
  }

  renderFailure() {
    if (!this.state.showFailure) return;
    return <div className="sent-message bg-danger">
      <span className="glyphicon glyphicon-remove" />
      { ' Oh dear.. an error has occurred! Please let Leon know on ' }
      <a href="mailto:amy.hearts.leon@gmail.com">amy.hearts.leon@gmail.com</a>
    </div>;
  }

  addGuest() {
    this.setState({
      guests: concat(this.state.guests, Object.assign({}, DEFAULT_GUEST) )
    });
  }

  removeGuest(index) {
    const guests = concat(this.state.guests);
    guests.splice(index, 1);
    this.setState({ guests });
  }

  onGuestChange(field, value, index) {
    const guests = concat(this.state.guests);
    guests[index][field] = value;
    this.setState({ guests });
  }

  onAttendanceChanged(value) {
    this.setState({ attendance: value });
  }

  submit() {
    this.setState({
      submitting: true,
      showSuccess: false,
      showFailure: false
    });
    console.log(this.state);
    const data = this.state;
    $.ajax({
        type: 'POST',
        url: 'rsvp.php',
        data: { data },
        success: response => this.onSuccess(response),
        error: err => this.onError(err)
    });
  }

  onSuccess(response) {
    console.log(response);
    this.setState({
      submitting: false,
      showSuccess: true
    });
  }

  onError(err) {
    console.log(err);
    this.setState({
      submitting: false,
      showFailure: true
    });
  }

}
