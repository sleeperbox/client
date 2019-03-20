import { connect } from 'react-redux';
import Register from './form-user/register';
import Login from './form-user/login';
import Profile from './profile/index';
import { emailAction, kodeAction, passwordAction, tokenAction, tipeAction, usernameAction, lastnameAction, firstnameAction  } from './actions';

const mapStateToProps = state => state.form;
const mapDispatchToProps = { emailAction, kodeAction, passwordAction, tokenAction, tipeAction, usernameAction, firstnameAction, lastnameAction };

export default connect(mapStateToProps, mapDispatchToProps)(Register,Login,Profile);