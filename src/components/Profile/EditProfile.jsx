/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import Navbar from '../Layout/navBar';
import Alert from '../Layout/Alert';
import '../../assets/css/profile.css';
import avatar from '../../assets/images/avatar.png';
import cam from '../../assets/images/cam.png';
import {
  getCurrentProfile, updateProfile, following, followers,
} from '../../redux/actions/actionCreators/profile';

export class EditProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    phone: '',
    location: '',
    file: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedIn: '',
    fileImg: '',
  };

  componentDidMount() {
    const { getCurrentProfile, following, followers } = this.props;
    getCurrentProfile();
    following();
    followers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const { profile } = nextProps;
      profile.username = profile.username !== null ? profile.username : '';
      profile.firstName = profile.firstName !== null ? profile.firstName : '';
      profile.lastName = profile.lastName !== null ? profile.lastName : '';
      profile.bio = profile.bio !== null ? profile.bio : '';
      profile.phone = profile.phone !== null ? profile.phone : '';
      profile.location = profile.location !== null ? profile.location : '';
      profile.facebook = profile.facebook !== null ? profile.facebook : '';
      profile.twitter = profile.twitter !== null ? profile.twitter : '';
      profile.instagram = profile.instagram !== null ? profile.instagram : '';
      profile.linkedIn = profile.linkedIn !== null ? profile.linkedIn : '';
      profile.file = profile.image !== null ? profile.image : '';

      this.setState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        bio: profile.bio,
        phone: profile.phone,
        location: profile.location,
        facebook: profile.facebook,
        twitter: profile.twitter,
        instagram: profile.instagram,
        linkedIn: profile.linkedIn,
        file: profile.image,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

   handleFiles = (files) => {
     const data = files ? files.fileList[0] : '';
     this.setState({ file: files || '', fileImg: data });
   };

   onClick = (e) => {
     e.preventDefault();

     const { updateProfile, history } = this.props;
     const {
       firstName, lastName, username, bio, phone, location,
       facebook, twitter, instagram, linkedIn, fileImg,
     } = this.state;
     const profileData = {
       firstName,
       lastName,
       username,
       bio,
       location,
       phone,
       facebook,
       twitter,
       instagram,
       linkedIn,
     };
     if (fileImg !== '') {
       profileData.file = fileImg;
     }
     updateProfile(profileData, history);
   };

   render() {
     const {
       firstName, lastName, bio, phone, location,
       facebook, twitter, instagram, linkedIn, file, fileImg,
     } = this.state;
     const {
       totalFollowing, totalFollowers,
     } = this.props;
     const img = file === '' ? avatar : file;
     return (
       <Fragment>
         <Navbar />
         <div id="">
           <section id="main">
             <div className="widget page-heading">
               <h2>Edit Profile</h2>
             </div>
             <div className="multi-widget">
               <div className="widget user-profile-s1">
                 <div className="profile-img">
                   <img src={fileImg === '' ? img : file.base64} alt="" className="edit-img" />
                   <ReactFileReader handleFiles={this.handleFiles} base64>
                     <div className="change-image">
                       <img src={cam} alt="" />
                     </div>
                   </ReactFileReader>
                 </div>
                 <div className="numbers">
                   <div className="followers">
                     <label>{totalFollowers || '0'}</label>
                     <label>Followers</label>
                   </div>
                   <div className="following">
                     <label>{totalFollowing || '0'}</label>
                     <label>Following</label>
                   </div>
                 </div>
                 <div className="social">
                   <h3>Social</h3>
                   <table className="table">
                     <tbody className="social-list">
                       <tr>
                         <td className="icon facebook"><i className="fa fa-facebook" /></td>
                         <td><span><input name="facebook" value={facebook || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="icon twitter"><i className="fa fa-twitter" /></td>
                         <td><span><input name="twitter" value={twitter || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="icon instagram"><i className="fa fa-instagram" /></td>
                         <td><span><input name="instagram" value={instagram || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="icon linkedin"><i className="fa fa-linkedin" /></td>
                         <td><span><input name="linkedIn" value={linkedIn || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
               <div className="widget user-profile-s2">
                 <div className="basic-info">
                   <h3>Personal Info</h3>
                   <button type="submit" onClick={this.onClick} className="updateBtn1">Save</button>
                   <div className="danger-alert">
                     <Alert />
                   </div>
                   <table className="table">
                     <tbody>
                       <tr>
                         <td className="label-in">Firstname</td>
                         <td><span><input name="firstName" value={firstName || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="label-in">Lastname</td>
                         <td><span><input name="lastName" value={lastName || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="label-in">Mobile Phone</td>
                         <td><span><input name="phone" value={phone || ''} onChange={this.onChange} className="input-sm-form" /></span></td>
                       </tr>
                       <tr>
                         <td className="label-in">Location:</td>
                         <td><input type="text" name="location" value={location || ''} onChange={this.onChange} className="input-sm-form" /></td>
                       </tr>
                       <tr>
                         <td className="label-in">Bio: </td>
                         <td><textarea rows={5} cols={70} className="input-sm-form" name="bio" value={bio || ''} onChange={this.onChange} /></td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </section>
         </div>

       </Fragment>
     );
   }
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  totalFollowers: state.profile.followers,
  totalFollowing: state.profile.following,
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile, updateProfile, following, followers,
  },
)(EditProfile);
