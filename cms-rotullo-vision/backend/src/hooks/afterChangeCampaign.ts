import { CollectionAfterChangeHook } from 'payload/types';
const SibApiV3Sdk = require('sib-api-v3-sdk');

export const afterChangeCampaign: CollectionAfterChangeHook = async ({ doc, operation, previousDoc }) => {
    if (operation === 'create' || operation === 'update') {
        // Only trigger if sendNow is checked and was not checked before
        if (doc.sendNow && !previousDoc?.sendNow) {
            const defaultClient = SibApiV3Sdk.ApiClient.instance;
            const apiKey = defaultClient.authentications['api-key'];

            if (!process.env.BREVO_API_KEY) {
                console.error('BREVO_API_KEY is not defined in environment variables.');
                return;
            }

            apiKey.apiKey = process.env.BREVO_API_KEY;

            const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
            const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

            emailCampaigns.name = doc.name;
            emailCampaigns.subject = doc.subject;
            emailCampaigns.sender = { name: doc.senderName, email: doc.senderEmail };
            emailCampaigns.type = doc.type || 'classic';
            emailCampaigns.htmlContent = doc.htmlContent;
            emailCampaigns.recipients = { listIds: doc.listIds.map((item: any) => item.listId) };

            if (doc.scheduledAt) {
                emailCampaigns.scheduledAt = new Date(doc.scheduledAt).toISOString();
            }

            try {
                const data = await apiInstance.createEmailCampaign(emailCampaigns);
                console.log('Brevo API called successfully. Returned data: ' + JSON.stringify(data));
            } catch (error) {
                console.error('Error calling Brevo API:', error);
            }
        }
    }
}
