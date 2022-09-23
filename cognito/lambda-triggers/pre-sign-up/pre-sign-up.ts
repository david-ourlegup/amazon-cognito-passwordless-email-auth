// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

import { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async event => {
    event.response.autoConfirmUser = true;
    return event;
};
