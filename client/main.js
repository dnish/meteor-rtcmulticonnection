import {Template} from 'meteor/templating';

import './main.html';

import 'rtcmulticonnection-v3/RTCMultiConnection';
import adapter from 'webrtc-adapter/out/adapter';

Template.hello.viewmodel({

    peerId: null,
    callUser: null,


    call() {

        myConnection.connect(this.callUser());

    },

    onRendered() {

        window.adapter = adapter;
        myConnection = new RTCMultiConnection();

        myConnection.session = {
            audio: true,
            video: true,
            data: true
        };

        myConnection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

        

        myConnection.iceServers = [{urls:'stun:stun.l.google.com:19302'}];

        myConnection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/"; //Replace with your own socket server
        myConnection.connectSocket();

        //Getting own user id - don't be confused, this.peerId(value) is how we set reactive variables with ViewModel - use it instead of pure Blaze ;)

        this.peerId(myConnection.userid);






        //Now we set also some RTCMultiConnection events

        myConnection.onstream = function(e) {
            
            if (e.type == 'remote') {

                //Stream of partner

                $("#foreign").attr('src', window.URL.createObjectURL(e.stream));

            } else {

                //Own stream
                $("#ownvideo").attr('src', window.URL.createObjectURL(e.stream));
            }

        }

    }
});