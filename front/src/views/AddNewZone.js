import React, { Component } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Button, CheckBox, Overlay, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { addNewCheckpoint, getAllCheckpoints, dellCheckpoints } from '../redux/actions/AddNewZoneActions';
import { pickCoordinate } from '../redux/actions/mapActions';
import ModalMap from '../components/map/MapAddCoordinate';

class AddNewZone extends Component {
  state = {
    isVisible: false,
    name: '',
    description: '',
  };

  componentDidMount() {
    this.props.getAllCheckpoints(this.props.cookies);
  }

  open = () => {
    this.setState({
      isVisible: true,
    });
  };
  close = () => {
    this.setState({
      isVisible: false,
      name: '',
    });
    this.props.pickCoordinate('');
  };
  save = () => {
    if (this.state.name.length === 0) {
      ToastAndroid.showWithGravityAndOffset('Enter Checkpoint Name !', ToastAndroid.LONG, ToastAndroid.TOP, 20, 200);
    } else {
      this.props.addNewCheckpoint({
        cookies: this.props.cookies,
        latitude: this.props.pickedCoordinate.latitude,
        longitude: this.props.pickedCoordinate.longitude,
        name: this.state.name,
        description: this.state.description,
        familyId: this.props.user.Families[0].id,
      });
      this.close();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {!!this.props.checkpoints &&
            this.props.checkpoints.map((el, index) => {
              return (
                <View
                  key={index + el.name + el.description}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {/* <ListItem key={'sdfsdfsd'} title={'zczxcxzczxcxzc'} subtitle={'el.description'} bottomDivider />
                  <ListItem
                    key={index + el.name + el.description + 1}
                    title={el.name}
                    subtitle={el.description}
                    bottomDivider
                  /> */}
                  <TouchableOpacity
                    key={index + el.name + el.description}
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.pickLocation()}
                  >
                    <Text style={styles.loginTextH}>{el.name}</Text>
                    <Text style={styles.loginText}>{el.description}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={index + el.name + el.description + 1}
                    style={[styles.delButtonContainer]}
                    onPress={() => this.props.dellCheckpoints(this.props.cookies, el.id, this.props.checkpoints)}
                  >
                    <Text style={styles.delText}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          <Overlay
            style={{ zIndex: 5 }}
            isVisible={this.state.isVisible}
            // windowBackgroundColor="rgba(255, 255, 255, .5)"
            // overlayBackgroundColor="red"
            // width="auto"
            // height="auto"
          >
            <View style={{ height: 410 }}>
              <ModalMap></ModalMap>
            </View>
            <View style={styles.modalContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Checkpoint Name"
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Checkpoint Description"
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  onChangeText={description => this.setState({ description })}
                />
              </View>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.close()}>
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </View>
        <View style={{ position: 'absolute' }}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.open()}>
            <Text
              style={
                (styles.loginText,
                {
                  fontSize: 50,
                  fontWeight: '900',
                  color: 'white',
                })
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cookies: state.User.cookies,
    checkpoints: state.AddNewZone.checkpoints,
    pickedCoordinate: state.Map.pickedCoordinate,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCoordinate: coordinates => dispatch(pickCoordinate(coordinates)),
    addNewCheckpoint: (cookies, text) => dispatch(addNewCheckpoint(cookies, text)),
    getAllCheckpoints: cookies => dispatch(getAllCheckpoints(cookies)),
    dellCheckpoints: (cookies, id, arr) => dispatch(dellCheckpoints(cookies, id, arr)),
    // editInput: text => dispatch(editInput(text)),
    // saveTask: () => dispatch(saveTask()),
    // checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title,checkedBool, i, id, cookie)),
    // delTask: i => dispatch(delTask(i)),
    // getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewZone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 15,
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
  },
  loginTextH: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  loginText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  delText: {
    color: '#F96F6F',
    fontSize: 25,
    fontWeight: '900',
  },
  buttonContainer: {
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
    width: 250,
    borderRadius: 5,
  },
  delButtonContainer: {
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
    width: 45,
    borderRadius: 5,
    borderColor: '#F96F6F',
    borderWidth: 3,
    // backgroundColor: 'red',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  addButton: {
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F96F6F',
    position: 'absolute',
    zIndex: 2,
    marginTop: 800,
    marginLeft: 330,
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingBottom: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
});
