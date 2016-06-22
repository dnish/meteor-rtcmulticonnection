
import { Template } from 'meteor/templating';

import './main.html';

import 'rtcmulticonnection-v3/RTCMultiConnection';


Template.hello.onCreated(function helloOnCreated() {



  myConnection = new RTCMultiConnection();
  myConnection.socketURL = "URL TO YOUR SOCKET SERVER";
  myConnection.connectSocket();



});


