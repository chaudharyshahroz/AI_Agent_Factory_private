export function isRiskyAction(action: string) {
  return /refund|cancel order|change shipping|book appointment|send email|send whatsapp|crm deal|contract|legal advice|medical advice|financial advice/i.test(action);
}
