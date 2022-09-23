// Copyright 2022 Our Leg Up Pty Ltd. All Rights Reserved.

import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import axios from 'axios';
import { Secret, decode, verify } from 'jsonwebtoken';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async event => {

    
    const options = {
        method: 'POST',
        url: 'https://api.ezid.io/email-link/verify',
        headers: {'Content-Type': 'application/json'},
        data: {
            client_id: '9f26ecf30d0d270f5740936986af474a',
            client_secret: '7a3ab462611f9560b682a6b4baf255c1104952c139dfc07a078aa85c2ab501cc',
            auth_code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzNlZmRiMTEtYTQ3ZS00MzU5LWI5NjYtM2VlZjdkODcwZWIzIiwiaWF0IjoxNjQ1NTA0NjQ1LCJleHAiOjE2NDU1MDgyNDV9.q8P3WOT2Kgeb7fazbVkP4YfWuNRnsIcpyP3z9_C3YjM'
        }
    };
    
    axios.request(options).then(function (response: { data: any; }) {
        console.log(response.data);
    }).catch(function (error: any) {
        console.error(error);
    });    

    const expectedAnswer = event.request.privateChallengeParameters!.secretLoginCode; 
    // Call EZiD - /verify
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};
