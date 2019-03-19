import { connect } from 'react-redux';
import Register from './form-user/register';
import Login from './form-user/login';
import Profile from './profile/index';
import { emailAction, kodeAction, passwordAction, tokenAction, tipeAction  } from './actions';

const mapStateToProps = state => state.form;
const mapDispatchToProps = { emailAction, kodeAction, passwordAction, tokenAction, tipeAction };

export default connect(mapStateToProps, mapDispatchToProps)(Register,Login,Profile);