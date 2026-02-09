/*
 * Title: Environments
 * Description: Handle All Environments related things
 * Author: Jahid Rayhan
 * Date: 09/02/2026
 */

//module Scafolding
const environments = {};

environments.staging={
    'envName':'staging',
    'port':3000,
}

environments.production={
    'envName':'production',
    'port':5000,
}

//determine which environment passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

//export environment
module.exports = environmentToExport;
