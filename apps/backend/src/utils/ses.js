import { SES } from '@aws-sdk/client-ses'

export async function sendEmail({ from = `${process.env.NAME_FROM} <${process.env.EMAIL_FROM}>`, format = 'html', to, subject, body }) {
  // JS SDK v3 does not support global configuration.
  // Codemod has attempted to pass values to each service client in this file.
  // You may need to update clients outside of this file, if they use global config.
  // AWS.config.update(
  //   { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION }
  // )

  const messageBody = format === 'html' ? { Html: { Charset: 'UTF-8', Data: body } } : { Text: { Charset: 'UTF-8', Data: body } }

  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Charset: 'UTF-8', Data: subject },
      Body: messageBody
    },
    Source: from
  }

  const ses = new SES({
    // The key apiVersion is no longer supported in v3, and can be removed.
    // @deprecated The client uses the "latest" apiVersion.
    // apiVersion: '2010-12-01',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
  })

  return ses.sendEmail(params)
}
