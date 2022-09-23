// Copyright 2022 Our Leg Up Pty Ltd. All Rights Reserved.

import { CreateAuthChallengeTriggerHandler } from 'aws-lambda';
import axios from 'axios';

export const handler: CreateAuthChallengeTriggerHandler = async event => {

    const options = {
        method: 'POST',
        url: 'https://api.ezid.io/email-link/send',
        headers: {'Content-Type': 'application/json'},
        data: {
          email: event.request.userAttributes.email,
          client_id: '9f26ecf30d0d270f5740936986af474a',
          client_secret: '7a3ab462611f9560b682a6b4baf255c1104952c139dfc07a078aa85c2ab501cc',
          expiry: '3600000',
          push_email: 'Yes',
          base_url_email_link: 'https://investor.ourlegup.com',
          callback_url: 'https://investor.ourlegup.com/eligibility-check',
          login_hint: event.request.userAttributes.email,
          claims: {'test-claim': 'read-only'}
        }
      };

    axios.request(options).then(function (response: { data: any; }) {
        console.log(response.data);
    }).catch(function (error: any) {
        console.error(error);
    });    

    // This is sent back to the client app
    event.response.publicChallengeParameters = { email: event.request.userAttributes.email };

    return event;
};
