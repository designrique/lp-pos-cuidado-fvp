---
title: Batch send transactional emails
subtitle: Send up to 1000 personalized email versions in a single API request
slug: docs/batch-send-transactional-emails
---

## Overview

Batch sending lets you send multiple personalized transactional emails in one API request. Instead of making 100 separate API calls, send up to 1000 message versions with different recipients, content, and variables in a single call.

<Note>
If you're new to transactional emails, see the [Send a transactional email](/docs/send-a-transactional-email) guide first.
</Note>

## Before you start

<Steps>
  ### Get your API key
  Retrieve your API key from your [Brevo account settings](https://my.brevo.com/account/settings). See the [Authentication guide](/docs/authentication-schemes) for details.
  
  ### Configure your sender
  Set up your sending domain and sender before sending emails. See [how to set up your senders](https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email) for instructions.
</Steps>

## Sending limits

<Info title="Bulk sending limits">
- Send up to 1000 email messages in one API call
- Execute the endpoint up to 6000 times per hour (100 times per minute)

This means you can send up to **6,000,000 email versions per hour**.
</Info>

## Choose your approach

Two approaches for batch sending:

| Approach | Use when |
|----------|----------|
| **Custom HTML** | You want to define HTML content directly in your API request |
| **Brevo template** | You want to design emails in the Brevo editor and reuse templates |

## Send with custom HTML

Define HTML content directly in your API request. Each message version can override the base HTML and recipients.

<Steps>
  ### Define base HTML
  Create a base HTML template that serves as the default for all versions:

  ```html
  <!DOCTYPE html>
  <html>
  <body>
    <h1>Order Confirmation</h1>
    <p>Thank you for your order.</p>
  </body>
  </html>
  ```

  ### Build your request
  Create the API request with multiple message versions. Each version can override recipients, subject, and HTML content:

  ```curl
  curl --request POST \
    --url https://api.brevo.com/v3/smtp/email \
    --header 'accept: application/json' \
    --header 'api-key: YOUR_API_KEY' \
    --header 'content-type: application/json' \
    --data '{
      "sender": {
        "email": "sender@brevo.com",
        "name": "Brevo"
      },
      "subject": "Default subject line",
      "htmlContent": "<!DOCTYPE html><html><body><h1>Order Confirmation</h1><p>Thank you for your order.</p></body></html>",
      "messageVersions": [
        {
          "to": [
            {
              "email": "bob@example.com",
              "name": "Bob Anderson"
            },
            {
              "email": "anne@example.com",
              "name": "Anne Smith"
            }
          ],
          "htmlContent": "<!DOCTYPE html><html><body><h1>Order Confirmation</h1><p>Thank you, Bob and Anne! Your order has been processed.</p></body></html>",
          "subject": "Your order is confirmed"
        },
        {
          "to": [
            {
              "email": "jim@example.com",
              "name": "Jim Stevens"
            }
          ]
        }
      ]
    }'
  ```

  <Warning>
  Do not pass an outer `to` parameter. Define all recipients inside each message version. If you include an outer `to` parameter, the request will fail.
  </Warning>

  ### Use dynamic variables
  Use the `params` object to personalize content. Define placeholders in your HTML using `{{params.variableName}}`:

  ```json
  {
    "sender": {
      "email": "sender@brevo.com",
      "name": "Brevo"
    },
    "subject": "Order {{params.orderNumber}} confirmed",
    "htmlContent": "<!DOCTYPE html><html><body><h1>Order Confirmation</h1><p>Order {{params.orderNumber}} is confirmed. Estimated delivery: {{params.deliveryDate}}.</p></body></html>",
    "messageVersions": [
      {
        "to": [
          {
            "email": "bob@example.com",
            "name": "Bob Anderson"
          }
        ],
        "params": {
          "orderNumber": "ORD-12345",
          "deliveryDate": "December 15, 2024"
        },
        "subject": "Order ORD-12345 confirmed"
      },
      {
        "to": [
          {
            "email": "anne@example.com",
            "name": "Anne Smith"
          }
        ],
        "params": {
          "orderNumber": "ORD-67890",
          "deliveryDate": "December 16, 2024"
        },
        "subject": "Order ORD-67890 confirmed"
      }
    ]
  }
  ```

  ### Verify success
  A successful response returns a `messageIds` array with one ID per message version:

  ```json
  {
    "messageIds": [
      "xxxxxxxxxxxxx.xxxxxxxxxx.1@smtp-relay.mailin.fr",
      "xxxxxxxxxxxxx.xxxxxxxxxx.2@smtp-relay.mailin.fr"
    ]
  }
  ```

  Use these IDs to:
  - Check message status in [transactional logs](https://app.brevo.com/transactional/email/logs)
  - Track delivery events via [webhooks](/docs/send-a-transactional-email#tracking-your-transactional-activity-through-webhooks)
</Steps>

### Variables you can override

Each message version can override these variables:

- `cc` - Carbon copy recipients
- `bcc` - Blind carbon copy recipients
- `replyTo` - Reply-to address
- `subject` - Email subject line
- `params` - Dynamic variables for personalization
- `htmlContent` - HTML content of the email

## Send with a Brevo template

Create a template in the Brevo editor, then reference it by ID in your API request. This approach separates design from code and makes templates reusable.

<Steps>
  ### Create a transactional template
  Navigate to **Templates** under the **Transactional** tab and click **New Template**.
  
  <Frame background="subtle">
    ![New Template Button](file:8c010f2b-8520-4ef5-808c-7cb911c0c7d1)
  </Frame>

  Define the template name and subject line. These serve as defaults that can be overridden in the API call.
  
  <Frame background="subtle">
    ![Template settings](https://files.readme.io/7180a21-Screenshot_2023-07-11_at_13.01.04.png)
  </Frame>

  Design your template and mark dynamic sections with placeholders. Use the format `{{params.variableName}}` for custom variables.
  
  <Frame background="subtle">
    ![Template design](https://files.readme.io/9f36744-Screenshot_2023-07-11_at_13.18.28.png)
  </Frame>
  
  <Frame background="subtle">
    ![Template placeholders](https://files.readme.io/6173e20-Screenshot_2023-07-11_at_13.31.13.png)
  </Frame>

  Click **Save and Activate** to save the template.
  
  <Frame background="subtle">
    ![Save and Activate](https://files.readme.io/7fd2b08-Screenshot_2023-07-11_at_13.38.50.png)
  </Frame>

  After saving, you'll be redirected to the templates list. Copy the template ID (e.g., **27**) - you'll need it for the API call.
  
  <Frame background="subtle">
    ![Template ID](https://files.readme.io/0000e36-Screenshot_2023-07-11_at_13.40.05.png)
  </Frame>

  <Info>
  Template placeholders using the `contact` object fetch values from your contact database. These cannot be overridden via the `params` object in the API call.
  </Info>

  ### Build your request
  Send the request with your template ID and override variables per message version:

  ```curl
  curl --request POST \
    --url https://api.brevo.com/v3/smtp/email \
    --header 'accept: application/json' \
    --header 'api-key: YOUR_API_KEY' \
    --header 'content-type: application/json' \
    --data '{
      "sender": {
        "email": "sender@brevo.com",
        "name": "Brevo"
      },
      "subject": "Default subject line",
      "templateId": 27,
      "params": {
        "greeting": "Hello",
        "headline": "Default headline"
      },
      "messageVersions": [
        {
          "to": [
            {
              "email": "bob@example.com",
              "name": "Bob Anderson"
            },
            {
              "email": "anne@example.com",
              "name": "Anne Smith"
            }
          ],
          "params": {
            "greeting": "Welcome onboard!",
            "headline": "Be Ready for Takeoff."
          },
          "subject": "We are happy to be working with you"
        },
        {
          "to": [
            {
              "email": "jim@example.com",
              "name": "Jim Stevens"
            },
            {
              "email": "mark@example.com",
              "name": "Mark Payton"
            },
            {
              "email": "andrea@example.com",
              "name": "Andrea Wallace"
            }
          ],
          "params": {
            "greeting": "Hello there",
            "headline": "Welcome to the team"
          }
        }
      ]
    }'
  ```

  <Warning>
  Do not pass an outer `to` parameter. Define all recipients inside each message version. If you include an outer `to` parameter, the request will fail.
  </Warning>

  ### Understand defaults and overrides
  Global values set outside `messageVersions` serve as defaults:

  - `subject` - Default subject line used if not overridden
  - `params` - Default variables used if not overridden

  Each message version can override these defaults. If a version doesn't specify a value, it uses the global default.

  ### Verify success
  A successful response returns a `messageIds` array with one ID per message version:

  ```json
  {
    "messageIds": [
      "xxxxxxxxxxxxx.xxxxxxxxxx.1@smtp-relay.mailin.fr",
      "xxxxxxxxxxxxx.xxxxxxxxxx.2@smtp-relay.mailin.fr"
    ]
  }
  ```

  Each message ID corresponds to one message version in your request. Use these IDs to:
  - Check message status in [transactional logs](https://app.brevo.com/transactional/email/logs)
  - Track delivery events via [webhooks](/docs/send-a-transactional-email#tracking-your-transactional-activity-through-webhooks)
</Steps>

### Variables you can override

Each message version can override these variables:

- `cc` - Carbon copy recipients
- `bcc` - Blind carbon copy recipients
- `replyTo` - Reply-to address
- `subject` - Email subject line
- `params` - Dynamic variables that render in the template placeholders
- `htmlContent` - HTML content (only if not using `templateId`)

<Info title="Template variables">
The `params` object defines custom transactional attributes that render inside the template. Example placeholders:

- `{{params.greeting}}` - Renders the greeting value
- `{{params.headline}}` - Renders the headline value

These must match the placeholders defined in your template.
</Info>

## Common patterns

### Send to multiple recipients with different content

Each message version can have different recipients and content:

```json
{
  "messageVersions": [
    {
      "to": [{"email": "customer1@example.com"}],
      "params": {"orderNumber": "ORD-001"}
    },
    {
      "to": [{"email": "customer2@example.com"}],
      "params": {"orderNumber": "ORD-002"}
    }
  ]
}
```

### Use defaults for some versions

Only override values when needed. Other versions use global defaults:

```json
{
  "subject": "Order confirmation",
  "params": {"greeting": "Thank you"},
  "messageVersions": [
    {
      "to": [{"email": "vip@example.com"}],
      "subject": "VIP Order confirmation",
      "params": {"greeting": "Thank you, valued customer"}
    },
    {
      "to": [{"email": "regular@example.com"}]
      // Uses default subject and params
    }
  ]
}
```

## Troubleshooting

### Error: Missing recipients

**Problem**: Request fails with recipient validation error.

**Solution**: Ensure all recipients are defined inside `messageVersions`. Remove any outer `to` parameter.

### Error: Template not found

**Problem**: Request fails with template ID error.

**Solution**: Verify the template ID exists and is activated in your Brevo account.

### Messages not received

**Solution**: 
1. Check the `messageIds` in the response to confirm the request was accepted
2. Verify sender domain is authenticated
3. Check spam folders
4. Review [transactional logs](https://app.brevo.com/transactional/email/logs) for delivery status

## Next steps

- Learn about [idempotency in batch emails](/docs/batch-email-idempotency)
- Track your emails with [transactional webhooks](/docs/send-a-transactional-email#tracking-your-transactional-activity-through-webhooks)
- Review [API limits and quotas](/docs/platform-quotas)
