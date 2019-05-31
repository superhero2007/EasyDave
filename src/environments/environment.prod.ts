export const environment = {
  production: true
};

const apiRoot = 'https://kyc.balticbanking.eu/';


export const CONFIG = {
  api: {
    sessionCreate: apiRoot + 'api/v1/aml/session/create',
    sessionRemove: apiRoot + 'api/v1/aml/session/destroy',
    sessionRenew: apiRoot + 'api/v1/aml/session/renew',

    sessionWebAuthn: apiRoot + 'api/v1/aml/session/webAuthn',

    currentUser: apiRoot + 'api/v1/aml/session/current',
    workPlace: apiRoot + 'api/v1/aml/session/setworkplace',
    trx: apiRoot + 'api/aml/stack/',
    rulesList: apiRoot + 'api/v1/aml/rules',
    rules: apiRoot + 'api/v1/aml/rule',
    checkAml: apiRoot + 'api/v1/aml/testTransaction',
    userManagementList: apiRoot + 'api/v1/aml/employees',
    userManagementBase: apiRoot + 'api/v1/aml/employee',
    employeeActivate: apiRoot + 'api/v1/aml/employeeactivate/',
    employeeSetPassword: apiRoot + 'api/v1/aml/employeesetpassword/',
    employeeDeactivate: apiRoot + 'api/v1/aml/employeedeactivate/',
    employeePushCompany: apiRoot + 'api/v1/aml/employeepushcompany/',
    employeePullCompany: apiRoot + 'api/v1/aml/employeepullcompany/',
  },
  client: {
    productsFilter: {
      pending: ['PRWAIT'],
      active: ['PRCOMPLETE'],
      closed: ['PRTERMINATE', 'PRDONE'],
      all: [],
    },
    dateTimeFormats: {
      datePickerInput: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    },
    language: {
      context: {
        dynamic: 'BBS.BackOffice',
        classificators: 'BBS.Classificators',
        entities: 'BBS.Entities'
      },
      default: 'lt-LT',
      array: [
        'lt-LT',
        'en-GB',
      ],
    },
    currency: {
      default: 'EUR'
    },
    sessionTimeout: 90000000, // 900000, // 15 minutes in milliseconds
    sessionTimeoutDelay: 30000000, // 300000, // 5 minutes in milliseconds
    dayOpenedInterval: 900000,
  }
};
